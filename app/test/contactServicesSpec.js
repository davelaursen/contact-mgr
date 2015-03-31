describe('ContactServices', function() {
	var multiRes = { data: [{name:'first'},{name:'second'}] };
	var singleRes = { data: {name:'only'} };
	var errorRes = { data: null };
	var mockContact = {
		success: true,
		getMany: function(success, error) {
			if (this.success) {
				success(multiRes);
			} else {
				error(errorRes);
			}
		},
		getOne: function(id, success, error) {
			if (this.success) {
				success(singleRes);
			} else {
				error(errorRes);
			}
		}
	};

	beforeEach(module('contactMgr'));

	describe('ContactFactory', function() {
		var Contact, $httpBackend, config;

		beforeEach(inject(function(_Contact_, _$httpBackend_, _config_) {
			Contact = _Contact_;
			$httpBackend = _$httpBackend_;
			config = _config_;
		}));

		describe('getMany', function() {
			it('should make a call to get all contacts', function() {
				var url, data;
				url = (config.contactDataServer || '') + config.contactDataResource;
				data = [{name:'first'},{name:'second'}];
				$httpBackend.expectGET(url).respond(multiRes.data);
				Contact.getMany(function(res) {
					expect(res.data.length).toBe(2);
					expect(res.data[0].name).toBe(multiRes.data[0].name);
				});
				$httpBackend.flush();
			});
		});

		describe('getOne', function() {
			it('should make a call to get a single contact', function() {
				var url, data;
				url = (config.contactDataServer || '') + config.contactDataResource;
				data = {name:'first'};
				$httpBackend.expectGET(url + '/1').respond(singleRes.data);
				Contact.getOne(1, function(res) {
					expect(res.data.name).toBe(singleRes.data.name);
				});
				$httpBackend.flush();
			});
		});
	});

	describe('MultiContactLoader', function() {
		var MultiContactLoader, Contact, $rootScope;

		beforeEach(function() {
			module('contactMgr.contactServices', function($provide) {
				$provide.value('Contact', mockContact);
			});
		});

		beforeEach(inject(function(_MultiContactLoader_, _Contact_, _$rootScope_) {
			MultiContactLoader = _MultiContactLoader_;
			Contact = _Contact_;
			$rootScope = _$rootScope_;
		}));

		it('should return a promise containing the data if call was successful', function() {
			Contact.success = true;
			var promise = MultiContactLoader();
			promise.then(function(data) {
				expect(data.length).toBe(2);
				expect(data[0].name).toBe('first');
			});
			$rootScope.$digest();
		});

		it('should return a promise containing an error message if the call failed', function() {
			Contact.success = false;
			var promise = MultiContactLoader();
			promise.then(function(){}, function(data) {
				expect(data).toBe('Unable to fetch contacts');
			});
			$rootScope.$digest();
		});
	});

	describe('ContactLoader', function() {
		var ContactLoader, Contact, $rootScope;

		beforeEach(function() {
			module('contactMgr.contactServices', function($provide) {
				$provide.value('Contact', mockContact);
			});
		});

		beforeEach(inject(function(_ContactLoader_, _Contact_, _$rootScope_) {
			ContactLoader = _ContactLoader_;
			Contact = _Contact_;
			$rootScope = _$rootScope_;
		}));

		it('should return a promise containing the data if call was successful', function() {
			Contact.success = true;
			var promise = ContactLoader(1);
			promise.then(function(data) {
				expect(data.name).toBe(singleRes.data.name);
			});
			$rootScope.$digest();
		});

		it('should return a promise containing an error message if the call failed', function() {
			Contact.success = false;
			var promise = ContactLoader(1);
			promise.then(function(){}, function(data) {
				expect(data).toBe('Unable to fetch contact 1');
			});
			$rootScope.$digest();
		});
	});
});