/*jshint newcap: false */

(function() {
    'use strict';

    /**
    * @ngDoc overview
    * @name contactMgr
    *
    * @description
    * An application that provides the ability to search through a collection of contacts and view individual contact details.
    */
    angular.module('contactMgr', [
        'ngRoute',
        'contactMgr.configuration',
        'contactMgr.contactServices',
        'contactMgr.contactControllers',
        'contactMgr.coreDirectives',
        'contactMgr.contactDirectives'
    ])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/contacts', {
                controller: 'ContactsCtrl',
                templateUrl: 'views/contacts.html',
                resolve: {
                    contacts: function(MultiContactLoader) {
                        return MultiContactLoader();
                    }
                }
            })
            .when('/contacts/view/:contactId', {
                controller: 'ContactViewCtrl',
                templateUrl: 'views/contactView.html',
                resolve: {
                    contact: function(ContactLoader, $route) {
                        return ContactLoader($route.current.params.contactId);
                    }
                }
            })

            .otherwise({redirectTo:'/contacts'});
    }]);
})();