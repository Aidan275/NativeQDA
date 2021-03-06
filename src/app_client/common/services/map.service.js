/**
* @author Aidan Andrews
* @email aa275@uowmail.edu.au
* @ngdoc service
* @name services.service:mapService
* @description Service used for making requests to the
* server to handle map functions.
*/


(function () {

	'use strict';

	angular
	.module('services')
	.service('mapService', mapService);

	/* @ngInject */
	function mapService ($http, authService, exception) {
		return {
			putLink 	: putLink,
			getLinks	: getLinks,
			deleteLink 	: deleteLink
		};

		///////////////////////////

		function putLink(link){
			return $http.put('/api/map/link', link, {
				headers: {
					Authorization: 'Bearer ' + authService.getToken()
				}
			}).then(putLinkComplete)
			.catch(putLinkFailed);

			function putLinkComplete(data) { return data.data; }
			function putLinkFailed(e) { return exception.catcher('Failed saving the marker link.')(e); }
		};

		function getLinks(){
			return $http.get('/api/map/link', {
				headers: {
					Authorization: 'Bearer ' + authService.getToken()
				}
			}).then(getLinksComplete)
			.catch(getLinksFailed);

			function getLinksComplete(data) { return data.data; }
			function getLinksFailed(e) { return exception.catcher('Failed getting the marker links.')(e); }
		};

		function deleteLink(id){
			return $http.delete('/api/map/link/' + id, {
				headers: {
					Authorization: 'Bearer ' + authService.getToken()
				}
			}).then(deleteLinkComplete)
			.catch(deleteLinkFailed);

			function deleteLinkComplete(data) { return data.data; }
			function deleteLinkFailed(e) { return exception.catcher('Failed deleting the marker link.')(e); }
		};
	}

})();