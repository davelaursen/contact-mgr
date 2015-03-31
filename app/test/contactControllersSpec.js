describe('ContactControllers', function() {

	beforeEach(module('contactMgr'));

	describe('ContactsCtrl', function() {
		var scope, $location,
			contacts = [{name:'first'},{name:'second'}];

		beforeEach(inject(function($controller, $rootScope, _$location_) {
			scope = $rootScope.$new();
			$location = _$location_;

			$controller('ContactsCtrl', {$scope: scope, $location: $location, contacts: contacts});
			scope.$digest();
		}));

		it('should set the passed in contacts to the scope', function() {
			expect(scope.contacts).toEqual(contacts);
		});

		it('should redirect us to the contact detail view when viewContact() is called', function() {
			spyOn($location, 'path');
			scope.viewContact(1);
			expect($location.path).toHaveBeenCalledWith('/contacts/view/1');
		});
	});

	describe('ContactViewCtrl', function() {
		var scope, $location,
			contact = {name:'single'};

		beforeEach(inject(function($controller, $rootScope, _$location_) {
			scope = $rootScope.$new();
			$location = _$location_;

			$controller('ContactViewCtrl', {$scope: scope, $location: $location, contact: contact});
			scope.$digest();
		}));

		it('should set the passed in contact to the scope', function() {
			expect(scope.contact).toEqual(contact);
		});

		it('should redirect us to the contacts list view when back() is called', function() {
			spyOn($location, 'path');
			scope.back();
			expect($location.path).toHaveBeenCalledWith('/contacts');
		});
	});
});