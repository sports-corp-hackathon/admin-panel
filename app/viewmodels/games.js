define(['plugins/http', 'durandal/app', 'knockout', 'viewmodels/newGame'], function(http, app, ko, NewGame) {
    var ctor = function () {
        var self = this;

        function gameObj(eventId, name, image, rules, scoreType) {
            this.eventId = eventId;
            this.name = name; // str
            this.image = image; // url
            this.rules = rules; // str
            this.scoreType = scoreType; // str
        }

        self.games = ko.observableArray([]);
        function getGames() {
            // http.get(app.url+'event/78f9075c-f81c-42fe-9d50-63e666b5450d/games').then(function(response) {
            //     for(var i = 0; i < response.items.length; i++) {
            //         self.games.push(new gameObj("NAME", response.items[i].media.m, "HDLSFHSD", "sdfhjksdhfdjs"));
            //     }
            // });
            http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'breakfast', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function(response) {
                for(var i = 0; i < response.items.length; i++) {
                    self.games.unshift(new gameObj(app.event.id, "game name", response.items[i].media.m, "rules", "timed"));
                }
            });
        }

        this.showHeader = true;
        this.title = 'Games';
        this.addingGame = ko.observable(false);

        this.imgSrc = function() {
            var randomNum1 = Math.round((Math.random()*100+300)/10)*10;
            var randomNum2 = Math.round((Math.random()*100+200)/10)*10;
            return "http://placesheen.com/"+randomNum1+"/"+randomNum2;
        };

        this.newItem = function(game) {
            var gaaame = new NewGame();
            gaaame.game = game || new gameObj(app.event.id, "", "", "", "timed");
            app.showDialog(gaaame).then(function(result) {
                if(result) {
                    console.dir(result);
                    //http.post(app.url+'event/'+app.event.id+'/games/', JSON.stringify(result)).then(function(response) {
                        self.games.unshift(new gameObj(result.eventId, result.name, "", result.rules, result.scoreType));
                    //});
                }
            });
        };
        getGames();
    };

    return ctor;
});