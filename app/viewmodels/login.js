define(['plugins/http', 'durandal/app', 'knockout'], function(http, app, ko) {
    var ctor = function () {
		if(app.email) {
			window.location = "#games";
		}
        this.title = 'Login';
        this.verifyLogin = function(formElement) {
            var email = ko.observable(formElement.email.value);
            var password = ko.observable(formElement.password.value);
            // http.post(app.url+'account/login', JSON.stringify({ "email": email, "password": password, "type": "admin" })).then(function(response) {
            //     if(response) {
            //         app.email = email;
            //         window.location = "#games";
            //     }
            // });
			app.email = email;
            window.location = "#games";
        };
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return ctor;
});