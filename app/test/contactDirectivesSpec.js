(function() {
	'use strict';

	describe('ContactDirectives', function() {

		beforeEach(module('contactMgr'));
		beforeEach(module('template-module'));

		describe('cmContactList', function() {
			var scope, $compile, element, template, onSelected;
			var contacts = [
			    {
			    	"id": 1,
			        "email": "fermentum.convallis.ligula@Donecdignissim.ca",
			        "first_name": "Maryam",
			        "last_name": "Graham",
			        "phone": "1-872-750-1127",
			        "state": "CA"
			    },
			    {
			    	"id": 2,
			        "email": "lacus@imperdieteratnonummy.ca",
			        "first_name": "Paloma",
			        "last_name": "Weeks",
			        "phone": "1-746-482-4391",
			        "state": "VT"
			    },
			    {
			    	"id": 3,
			        "email": "eros@euismod.org",
			        "first_name": "Stacy",
			        "last_name": "Guerrero",
			        "phone": "1-455-159-1000",
			        "state": "CA"
			    },
			    {
			    	"id": 4,
			        "email": "lacus.Ut@vulputateullamcorpermagna.edu",
			        "first_name": "Lacey",
			        "last_name": "Collier",
			        "phone": "1-819-948-1563",
			        "state": "PA"
			    }
			];

			beforeEach(inject(function($rootScope, _$compile_) {
				scope = $rootScope.$new();
				$compile = _$compile_;

				onSelected = jasmine.createSpy();
				scope.contacts = contacts;
				scope.viewContact = onSelected;
				template = '<cm-contact-list contacts="contacts" on-selected="viewContact"></cm-contact-list>';

				element = $compile(template)(scope);
				scope.$digest();
			}));

			it('should have a child div with a "contact-filters" class', function() {
				var el = element.find('div').eq(0);
				expect(el.hasClass('contact-filters')).toBe(true);
			});

			it('should have a child ul with a "contact-list" class', function() {
				var el = element.find('ul').eq(0);
				expect(el.hasClass('contact-list')).toBe(true);
			});

			it('should have a child div with a "pagination" class', function() {
				var els = element.find('div');
				var el = els.eq(els.length-1);
				expect(el.hasClass('pagination')).toBe(true);
			});

			it('should have 5 li elements in the contacts list', function() {
				var els = element.find('ul').eq(0).find('li');
				expect(els.length).toBe(5);
			});

			it('should reduce the number li elements if the "search by name" field is populated', function() {
				var el = element.find('input').eq(0);
				el.val('g');
				el.triggerHandler('change');
				var els = element.find('ul').eq(0).find('li');
				expect(els.length).toBe(3);
			});

			it('should have 4 options in the "filter by state" dropdown', function() {
				var els = element.find('select').eq(0).find('option');
				expect(els.length).toBe(4);
			});

			it('should reduce the number li elements if the "filter by state" dropdown option is changed', function() {
				var el = element.find('select').eq(0);
				el.find('option').eq(1).attr('selected', true);
				el.triggerHandler('change');
				var els = element.find('ul').eq(0).find('li');
				expect(els.length).toBe(3);
			});

			it('should change the number of li elements if the "items per page" dropdown option is changed', function() {
				var i, j, len, item, c, moreContacts = [];
				for (i=0, len=contacts.length*6; i<len; i++) {
					j = i % 4;
					c = contacts[j];
					item = { id: i, email: c.email, first_name: c.first_name, last_name: c.last_name, phone: c.phone, state: c.state };
					moreContacts.push(item);
				}
				scope.contacts = moreContacts;
				element = $compile(template)(scope);
				scope.$digest();
				
				var els = element.find('ul').eq(0).find('li');
				expect(els.length).toBe(11);

				var el = element.find('select').eq(1);
				el.find('option').eq(1).attr('selected', true);
				el.triggerHandler('change');
				els = element.find('ul').eq(0).find('li');
				expect(els.length).toBe(21);
			});

			it('should call the onSelected function when a contact is clicked', function() {
				var el = element.find('ul').eq(0).find('li').eq(1);
				el.find('a').triggerHandler('click');
				expect(onSelected).toHaveBeenCalledWith(4);
			});
		});

		describe('cmContactDetails', function() {
			var scope, element;
			var contact = {
		    	"id": 1,
		        "address": "P.O. Box 197, 7318 Nascetur St.",
		        "city": "Fresno",
		        "email": "fermentum.convallis.ligula@Donecdignissim.ca",
		        "first_name": "Maryam",
		        "join_date": "06/20/2015",
		        "last_name": "Graham",
		        "phone": "1-872-750-1127",
		        "state": "CA",
		        "zip": "94787"
		    };

			beforeEach(inject(function($rootScope, $compile) {
				scope = $rootScope.$new();

				scope.contact = contact;
				var template = '<cm-contact-details contact="contact"></cm-contact-details>';

				element = $compile(template)(scope);
				scope.$digest();
			}));

			it('should contain the contact name within an h2 element', function() {
				var name = element.find('h2').text();
				expect(name).toBe(contact.first_name + ' ' + contact.last_name);
			});

			it('should contain 5 elements with the "view-element" class (one for each piece of info displayed)', function() {
				var els = element[0].querySelectorAll('.view-element');
				expect(els.length).toBe(5);
			});

			it('output should include the full name, email, phone, address, and join date', function() {
				var text = element.text();
				expect(text.indexOf(contact.first_name + ' ' + contact.last_name)).toBeGreaterThan(-1);
				expect(text.indexOf(contact.email)).toBeGreaterThan(-1);
				expect(text.indexOf(contact.phone)).toBeGreaterThan(-1);
				expect(text.indexOf(contact.address)).toBeGreaterThan(-1);
				expect(text.indexOf(contact.city + ', ' + contact.state + ' ' + contact.zip)).toBeGreaterThan(-1);
				expect(text.indexOf(contact.join_date)).toBeGreaterThan(-1);
			});
		});
	});
})();