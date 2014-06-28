define(['plugins/http', 'durandal/app', 'knockout', 'viewModels/newVolunteer'], function(http, app, ko, NewVolunteer) {
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
                    self.volunteers.unshift(new volunteerObj("ben@ben.com", "volunteer"));
                }
            });
        }

        this.showHeader = true;
        this.title = 'Volunteers';

        this.newVolunteer = function(volunteer) {
            var vooolunteer = new NewVolunteer();
            vooolunteer.volunteer = volunteer || new volunteerObj("","volunteer");
            app.showDialog(vooolunteer).then(function(result) {
                if(result) {
                    console.dir(result);
                    //http.post(app.url+'event/'+app.event.id+'/games/', JSON.stringify(result)).then(function(response) {
                        self.volunteers.unshift(new volunteerObj(result.email, "volunteer"));
                    //});
                }
            });
        };

        getVolunteers();
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return ctor;
});