/**
* @author Aidan Andrews
* @email aa275@uowmail.edu.au
* @ngdoc service 
* @name services.service:analysisService
* @description This is an angular service used for making requests to the 
* server to perform and read analyses.
*/

(function () {

	'use strict';

	angular
	.module('services')
	.service('analysisService', analysisService);

	/* @ngInject */
	function analysisService ($http, authService, exception) {
		return {
			watsonAnalysis			: watsonAnalysis,
			saveWatsonAnalysis 		: saveWatsonAnalysis,
			readWatsonAnalysis 		: readWatsonAnalysis,
			readWatsonCategories 	: readWatsonCategories,
			listWatsonAnalysis 		: listWatsonAnalysis,
			deleteWatsonAnalysis 	: deleteWatsonAnalysis,
			watsonTextAnalysis		: watsonTextAnalysis
		};

		///////////////////////////

		/**
		* @ngdoc function
		* @name watsonAnalysis
		* @methodOf services.service:analysisService
		* @description Makes a POST request to the back-end to perform and save a Watson analysis.
		* @param {Object} data An object consisting of:
		*
		* url: url to the file to be analysed (text file on S3)  
		* name: name of the analysis given by user  
		* description: description of the analysis given by user  
		* createdBy: user's name  
		* sourceDataKeys: array of the S3 keys used   
		* @returns {Object} The analysis object
		*/
		function watsonAnalysis(data){
			return $http.post('/api/analysis/watson', data, {
				headers: {
					Authorization: 'Bearer ' + authService.getToken()
				}
			}).then(watsonAnalysisComplete)
			.catch(watsonAnalysisFailed);

			function watsonAnalysisComplete(data) { return data.data; }
			function watsonAnalysisFailed(e) { return exception.catcher('Failed Watson analysis.')(e); }
		};

		/**
		* @ngdoc function
		* @name watsonTextAnalysis
		* @methodOf services.service:analysisService
		* @description Makes a POST request to the back-end to perform and save a Watson analysis.
		* @param {Object} data An object consisting of:
		*
		* text: string to be analysed  
		* name: name of the analysis given by user  
		* description: description of the analysis given by user  
		* createdBy: user's name  
		* sourceDataKeys: array of the S3 keys used   
		* @returns {Object} The analysis object
		*/
		function watsonTextAnalysis(data){
			return $http.post('/api/analysis/watsonText', data, {
				headers: {
					Authorization: 'Bearer ' + authService.getToken()
				}
			}).then(watsonTextAnalysisComplete)
			.catch(watsonTextAnalysisFailed);

			function watsonTextAnalysisComplete(data) { return data.data; }
			function watsonTextAnalysisFailed(e) { return exception.catcher('Failed Watson analysis.')(e); }
		};

		/**
		* @ngdoc function
		* @name saveWatsonAnalysis
		* @methodOf services.service:analysisService
		* @description **DEPRECATED** - Analysis is now saved directly to the database after being performed
		*/
		function saveWatsonAnalysis(data){
			return $http.post('/api/analysis/watson/save', data, {
				headers: {
					Authorization: 'Bearer ' + authService.getToken()
				}
			}).then(saveWatsonAnalysisComplete)
			.catch(saveWatsonAnalysisFailed);

			function saveWatsonAnalysisComplete(data) { return data.data; }
			function saveWatsonAnalysisFailed(e) { return exception.catcher('Failed saving the analysis.')(e); }
		};

		/**
		* @ngdoc function
		* @name readWatsonAnalysis
		* @methodOf services.service:analysisService
		* @description Makes a GET request to the back-end to get one specified Watson analysis object.
		* @param {String} analysisId The ObjectId for the analysis object
		*/
		function readWatsonAnalysis(analysisId) {
			return $http.get('/api/analysis/watson/read/' + analysisId, {
				headers: {
					Authorization: 'Bearer '+ authService.getToken()
				}
			}).then(readWatsonAnalysisComplete)
			.catch(readWatsonAnalysisFailed);

			function readWatsonAnalysisComplete(data) { return data.data; }
			function readWatsonAnalysisFailed(e) { return exception.catcher('Failed reading the analysis.')(e); }
		}

		/**
		* @ngdoc function
		* @name readWatsonCategories
		* @methodOf services.service:analysisService
		* @description Makes a GET request to the back-end to get the category results of the specified Watson analysis object.
		* @param {String} analysisId The ObjectId for the analysis object
		*/
		function readWatsonCategories(analysisId) {
			return $http.get('/api/analysis/watson/read/' + analysisId + '/categories', {
				headers: {
					Authorization: 'Bearer '+ authService.getToken()
				}
			}).then(readWatsonCategoriesComplete)
			.catch(readWatsonCategoriesFailed);

			function readWatsonCategoriesComplete(data) { return data.data; }
			function readWatsonCategoriesFailed(e) { return exception.catcher('Failed reading the categories results.')(e); }
		}

		/**
		* @ngdoc function
		* @name listWatsonAnalysis
		* @methodOf services.service:analysisService
		* @description Makes a GET request to the back-end to get all the Watson analysis objects.
		* @returns {Array} An array of the analysis objects
		*/
		function listWatsonAnalysis() {
			return $http.get('/api/analysis/watson/list', {
				headers: {
					Authorization: 'Bearer '+ authService.getToken()
				}
			}).then(listWatsonAnalysisComplete)
			.catch(listWatsonAnalysisFailed);

			function listWatsonAnalysisComplete(data) { return data.data; }
			function listWatsonAnalysisFailed(e) { return exception.catcher('Failed listing the analyses.')(e); }
		}

		/**
		* @ngdoc function
		* @name deleteWatsonAnalysis
		* @methodOf services.service:analysisService
		* @description Makes a DELETE request to the back-end to delete the specified Watson analysis object.
		* @param {String} analysisId The ObjectId for the analysis object
		*/
		function deleteWatsonAnalysis(analysisId) {
			return $http.delete('/api/analysis/watson/' + analysisId, {
				headers: {
					Authorization: 'Bearer '+ authService.getToken()
				}
			}).then(deleteWatsonAnalysisComplete)
			.catch(deleteWatsonAnalysisFailed);

			function deleteWatsonAnalysisComplete(data) { return data.data; }
			function deleteWatsonAnalysisFailed(e) { return exception.catcher('Failed deleting the analysis.')(e); }
		}

	}

})();