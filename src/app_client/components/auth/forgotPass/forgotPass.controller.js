/**
* @author Aidan Andrews <aa275@uowmail.edu.au>
* @ngdoc controller
* @name auth.controller:forgotPassCtrl
* @description Controller for the forgot password page.
*/

(function () {
	
	'use strict';

	angular
	.module('auth')
	.controller('forgotPassCtrl', forgotPassCtrl);

	/* @ngInject */
	function forgotPassCtrl(authentication, logger) {
		var vm = this;
		
		vm.pageId = "forgot-password-css";

		// Bindable Functions
		vm.onSubmit = onSubmit;

		// Bindable Data
		vm.email = "";
		vm.reset = false;
		vm.pageHeader = {
			title: 'Forgot Password'
		};

    	///////////////////////////

    	function onSubmit() {
    		if (!vm.email) {
    			logger.error('All fields required, please try again', '', 'Error')
    			return false;
    		} else {
    			generateResetToken();
    		}
    	};

    	function generateResetToken() {
    		authentication.forgotPassword({email: vm.email})
    		.then(function(response) {
    			logger.success('A link to reset your password has been sent to ' + vm.email, '', 'Success');
    			vm.reset = true;
    		})
    	}

    }

})();