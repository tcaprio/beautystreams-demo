(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/status/:status', {
                    templateUrl: '/Scripts/sabio/editorial/templates/index.html',
                    controller: 'editorialIndexController',
                    controllerAs: 'index'
                })
                .when('/create', {                    
                    templateUrl: '/Scripts/sabio/editorial/templates/attributes.html',
                    controller: 'editorialAttributesController',
                    controllerAs: 'attributesCtrl'
                })
                .when('/editorial/:editorialId/attributes', {
                    templateUrl: '/Scripts/sabio/editorial/templates/attributes.html',
                    controller: 'editorialAttributesController',
                    controllerAs: 'attributesCtrl',
                    delay: function ($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 1000);
                        return delay.promise;
                    }
                })
                .when('/editorial/:editorialId/content', {
                    templateUrl: '/Scripts/sabio/editorial/templates/content.html',
                    controller: 'editorialContentController',
                    controllerAs: 'contentCtrl'
                })

                .when('/editorial/:editorialId/content/preview', {
                    templateUrl: '/Scripts/sabio/editorial/templates/contentPreview.html',
                    controller: 'editorialContentPreviewController',
                    controllerAs: 'contentPreviewCtrl'
                })
                .otherwise({ redirectTo: '/status/live' });;

            $locationProvider.html5Mode(false);
        }]);

})();