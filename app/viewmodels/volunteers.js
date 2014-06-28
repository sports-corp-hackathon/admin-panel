define(['plugins/http', 'durandal/app', 'knockout'], function(http, app, ko) {
    var ctor = function () {
        var self = this;

        function volunteerObj(email, type) {
            this.email = email; // str
            this.type = type; // str
        }

        self.volunteers = ko.observableArray([]);
        function getVolunteers() {
            http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'volunteer', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function(response) {
                for(var i = 0; i < response.items.length; i++) {
                    self.volunteers.push(new volunteerObj("ben@ben.com", "volunteer"));
                }
            });
        }

        this.showHeader = true;
        this.title = 'Volunteers';

        getVolunteers();
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return ctor;
});