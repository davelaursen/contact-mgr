(function() {
	'use strict';

	/**
	* @ngDoc module
	* @name contactMgr.configuration
	*
	* @description
	* Contains configuration values for use throughout the application.
	*/
	angular.module('contactMgr.configuration', [])

	.constant('config', {
		contactDataServer: null,
	    contactDataResource: '/data'
	});
})();