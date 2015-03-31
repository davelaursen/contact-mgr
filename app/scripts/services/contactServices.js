(function() {
    'use strict';

    /**
    * @ngDoc module
    * @name contactMgr.contactServices
    *
    * @description
    * A collection of services for retrieving Contact data.
    */
    angular.module('contactMgr.contactServices', [])

    /**
    * @ngDoc factory
    * @name contactMgr.contactServices.Contact
    *
    * @description
    * A service for retrieving Contact data from a web service.
    */
    .factory('Contact', ['$http', 'config', function ContactFactory($http, config) {
        var server = config.contactDataServer || '',
            resource = config.contactDataResource,
            baseUrl = server + resource;
        return {
            getMany: function(success, error) {
                return $http.get(baseUrl).then(success, error);
            },
            getOne: function(contactId, success, error) {
                return $http.get(baseUrl + '/' + contactId).then(success, error);
            }
        };
    }])

    /**
    * @ngDoc factory
    * @name contactMgr.contactServices.Contact
    *
    * @description
    * A service for retrieving a promise of an array of Contacts.
    */
    .factory('MultiContactLoader', ['$q', 'Contact', function MultiContactLoaderFactory($q, Contact) {
        return function() {
            var delay = $q.defer();
            Contact.getMany(
                function(response) {
                    delay.resolve(response.data);
                },
                function() {
                    delay.reject('Unable to fetch contacts');
                }
            );
            return delay.promise;
        };
    }])

    /**
    * @ngDoc factory
    * @name contactMgr.contactServices.Contact
    *
    * @description
    * A service for retrieving a promise of a single Contact.
    */
    .factory('ContactLoader', ['$q', 'Contact', function ContactLoaderFactory($q, Contact) {
        return function(contactId) {
            var delay = $q.defer();
            Contact.getOne(contactId,
                function(response) {
                    delay.resolve(response.data);
                },
                function() {
                    delay.reject('Unable to fetch contact ' + contactId);
                }
            );
            return delay.promise;
        };
    }]);
})();