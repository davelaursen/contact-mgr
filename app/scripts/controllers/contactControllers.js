(function() {
    'use strict';

    /**
    * @ngDoc module
    * @name contactMgr.contactControllers
    *
    * @description
    * A collection of controllers for contact views.
    */
    angular.module('contactMgr.contactControllers', [])

    /**
    * @ngDoc controller
    * @name contactMgr.contactControllers.ContactsCtrl
    *
    * @description
    * A controller for a view displaying a list of contacts.
    */
    .controller('ContactsCtrl', ['$scope', '$location', 'contacts', function($scope, $location, contacts) {
        $scope.contacts = contacts;

        // loads the contact view for the specified contact
        $scope.viewContact = function(contactId) {
            $location.path('/contacts/view/' + contactId);
        };
    }])

    /**
    * @ngDoc controller
    * @name contactMgr.contactControllers.ContactViewCtrl
    *
    * @description
    * A controller for a view displaying the details of a single controller.
    */
    .controller('ContactViewCtrl', ['$scope', '$location', 'contact', function($scope, $location, contact) {
        $scope.contact = contact;

        // returns to the contacts list view
        $scope.back = function() {
            $location.path('/contacts');
        };
    }]);
})();