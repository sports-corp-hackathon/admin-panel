define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        email: app.email,
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Login', moduleId: 'viewmodels/login', showNav: false },
                { route: 'games', moduleId: 'viewmodels/games', nav: true, showNav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});