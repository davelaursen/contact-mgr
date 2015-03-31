(function() {
	'use strict';

	describe('CoreDirectives', function() {

		beforeEach(module('contactMgr'));
		beforeEach(module('template-module'));

		describe('cmPagination', function() {
			var scope, element, i, items = [];

			for (i=1; i<=23; i++) {
				items.push({name:"" + i});
			}

			beforeEach(inject(function($rootScope, $compile) {
				scope = $rootScope.$new();
				scope.currentPage = 1;
				scope.itemsPerPage = '5';
				scope.items = items;
				var template = '<cm-pagination current-page="currentPage" items-per-page="itemsPerPage" items="items"></cm-pagination>';

				element = $compile(template)(scope);
				scope.$digest();
			}));
			
			it('should have a "pagination" css class', function() {
				expect(element.hasClass('pagination')).toBe(true);
			});

			it('should have 7 li elements', function() {
				var els = element.find('li');
				expect(els.length).toBe(7);
				expect(els.eq(0).text().trim()).toBe('« Prev');
				expect(els.eq(3).text().trim()).toBe('3');
				expect(els.eq(6).text().trim()).toBe('Next »');
			});

			it('should disable the "prev" link if current page is 1', function() {
				scope.currentPage = 1;
				scope.$digest();
				expect(element.find('li').eq(0).hasClass('disabled')).toBe(true);
			});

			it('should disable the "next" link if current page is the last one', function() {
				scope.currentPage = 5;
				scope.$digest();
				expect(element.find('li').eq(6).hasClass('disabled')).toBe(true);
			});

			it('should change the current page if the "prev" link is clicked', function() {
				scope.currentPage = 3;
				scope.$digest();
				element.find('li').eq(0).find('a').triggerHandler('click');
				expect(scope.currentPage).toBe(2);
			});

			it('should change the current page if the "next" link is clicked', function() {
				scope.currentPage = 3;
				scope.$digest();
				element.find('li').eq(6).find('a').triggerHandler('click');
				expect(scope.currentPage).toBe(4);
			});

			it('should not change the current page if the "prev" link is clicked when on the first page', function() {
				scope.currentPage = 1;
				scope.$digest();
				element.find('li').eq(0).find('a').triggerHandler('click');
				expect(scope.currentPage).toBe(1);
			});

			it('does not change the current page if the "next" link is clicked when on the last page', function() {
				scope.currentPage = 5;
				scope.$digest();
				element.find('li').eq(6).find('a').triggerHandler('click');
				expect(scope.currentPage).toBe(5);
			});

			it('should change the number of pages if items array is changed', function() {
				scope.items = items.slice(0, 12);
				scope.$digest();
				expect(element.find('li').length).toBe(5);
				scope.items = items;
				scope.$digest();
			});

			it('should change the number of pages if itemsPerPage is changed', function() {
				scope.itemsPerPage = "3";
				scope.$digest();
				expect(element.find('li').length).toBe(10);
			});
		});
	});
})();