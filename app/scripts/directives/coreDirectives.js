'use strict';

/**
* @ngDoc module
* @name contactMgr.coreDirectives
*
* @description
* A collection of generic directives.
*/
angular.module('contactMgr.coreDirectives', [])

/**
* @ngDoc directive
* @name contactMgr.coreDirectives.cmPagination
*
* @description
* A directive that provides a pagination widget for assisting with paging a collection.
*/
.directive('cmPagination', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/pagination.html',
        replace: true,
        scope: {
            currentPage: '=',
            itemsPerPage: '=',
            items: '='
        },
        link: function(scope) {
            // if items-per-page is not specified, use default value of 10
            if (!scope.itemsPerPage) {
                scope.itemsPerPage = 10;
            }
            scope.pageCount = 1;

            // returns an array of page numbers for the current page count
            scope.range = function () {
                var start, end, ret, i;

                start = 0;
                end = scope.pageCount;
                ret = Array(start);
                for (i = start; i < end; i++) {
                    ret[i] = i + 1;
                }
                return ret;
            };

            // sets the current page to the selected value
            scope.setPage = function() {
                scope.currentPage = this.n;
            };

            // sets the current page to the previous one
            scope.prevPage = function() {
                var p = scope.currentPage;
                if (p > 1) {
                    scope.currentPage = p - 1;
                }
            };

            // sets the current page to the next one
            scope.nextPage = function() {
                var p = scope.currentPage;
                if (p < scope.pageCount) {
                    scope.currentPage = p + 1;
                }
            };

            // watches for changes to the current page, items-per-page, or the items collection and updates
            // the pagination widget accordingly
            scope.$watchCollection('[currentPage, itemsPerPage, items]', function() {
                scope.pageCount = Math.ceil(scope.items.length / parseInt(scope.itemsPerPage, 10));
                if (scope.currentPage > scope.pageCount) {
                    scope.currentPage = scope.pageCount;
                }
            });
        }
    };
});