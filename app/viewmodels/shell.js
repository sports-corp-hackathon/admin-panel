define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
    return {
        email: app.email,
        showHeader: false,
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Login', moduleId: 'viewmodels/login' },
                { route: 'games', moduleId: 'viewmodels/games', nav: true },
                { route: 'volunteers', moduleId: 'viewmodels/volunteers', nav:true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});