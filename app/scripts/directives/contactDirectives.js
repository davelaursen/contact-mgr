(function() {
    'use strict';

	/**
	* @ngDoc module
	* @name contactMgr.contactDirectives
	*
	* @description
	* A collection of contact-related directives.
	*/
	angular.module('contactMgr.contactDirectives', [])

	/**
	* @ngDoc directive
	* @name contactMgr.contactDirectives.cmContactList
	*
	* @description
	* A directive that displays a filterable list of contacts.
	*/
	.directive('cmContactList', ['$location', function($location) {
		return {
			restrict: 'E',
			templateUrl: 'views/contactList.html',
			replace: true,
			scope: {
				contacts: '=',
				onSelected: '&'
			},
			link: function(scope) {
			    // sort contacts
			    scope.contacts.sort(function(a,b) {
			        var x = a.last_name.toLowerCase(), y = b.last_name.toLowerCase();
			        return x < y ? -1 : (x > y ? 1 : 0);
			    });

			    // initialize scope variables
			    scope.nameFilteredContacts = scope.contacts;
			    scope.filteredContacts = scope.contacts;
			    scope.pagedContacts = [];
			    scope.itemsPerPage = 10;
			    scope.currentPage = 1;

			    // a function that applies the contact filters to the collection
			    scope.filter = function() {
			        var arr,
			            state = scope.filterState,
			            text = scope.filterText;

			        if (!text) {
			            scope.nameFilteredContacts = scope.contacts;
			        } else {
			            text = text.toLowerCase();
			            scope.nameFilteredContacts = scope.contacts.filter(function(item) {
			                return (item.first_name.toLowerCase().indexOf(text) > -1 || item.last_name.toLowerCase().indexOf(text) > -1);
			            });
			        }

			        if (!state) {
			            scope.filteredContacts = scope.nameFilteredContacts;
			        } else {
			            scope.filteredContacts = scope.nameFilteredContacts.filter(function(item) {
			                return (item.state === state);
			            });
			        }
			        scope.currentPage = 1;
			    };

			    // watches for changes to the current page, the contacts collection, or the items-per-page dropdown
			    // and updates the displayed list of contacts accordingly
			    scope.$watchCollection('[currentPage, filteredContacts, itemsPerPage]', function() {
			        var start, end, i, len, s, arr, states = [];
			        
			        start = (scope.currentPage - 1) * scope.itemsPerPage;
			        end = start + parseInt(scope.itemsPerPage, 10);
			        scope.pagedContacts = scope.filteredContacts.slice(start, end);

			        // need to extract states from either full contact list or if filtering by name then only the contacts
			        // that match the name filter
			        arr = scope.filterText ? scope.nameFilteredContacts : scope.contacts;
			        for (i=0, len=arr.length; i < len; i++) {
			            s = arr[i].state;
			            if (states.indexOf(s) < 0) {
			                states.push(s);
			            }
			        }
			        states.sort();
			        scope.states = states;
			    });
			}
		};
	}])

	/**
	* @ngDoc directive
	* @name contactMgr.contactDirectives.cmContactDetails
	*
	* @description
	* A directive that displays details of a single contact.
	*/
	.directive('cmContactDetails', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/contactDetails.html',
			replace: true,
			scope: {
				contact: '='
			}
		};
	});
})();