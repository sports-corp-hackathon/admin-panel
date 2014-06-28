define(['plugins/http', 'durandal/app', 'knockout'], function(http, app, ko) {
    var ctor = function () {
        var self = this;

        function gameObj(name, image, rules, information) {
            this.name = name; // str
            this.image = image; // url
            this.rules = rules; // str
            this.information = information; // str
        }

        self.games = ko.observableArray([]);
        function getGames() {
            http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'female', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function(response) {
                for(var i = 0; i < response.items.length; i++) {
                    self.games.push(new gameObj("NAME", response.items[i].media.m, "HDLSFHSD", "sdfhjksdhfdjs"));
                }
            });
        }

        this.title = 'Games';
        this.header = app.event + ' / ' + this.title;
        this.description = 'Blah, Blah, Blah...games are great!';

        this.imgSrc = function() {
            var randomNum1 = Math.round((Math.random()*100+300)/10)*10;
            var randomNum2 = Math.round((Math.random()*100+200)/10)*10;
            return "http://placesheen.com/"+randomNum1+"/"+randomNum2;
        };

        getGames();
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return ctor;
});