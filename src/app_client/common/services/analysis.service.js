(function () {

	'use strict';

	angular
	.module('nativeQDAApp')
	.service('analysisService', analysisService);

	analysisService.$inject = ['$http', 'authentication', 'exception'];
	function analysisService ($http, authentication, exception) {
		return {
			aylienConceptAnalysis	: aylienConceptAnalysis,
			watsonAnalysis			: watsonAnalysis,
			watsonFileConversion 	: watsonFileConversion
		};

		///////////////////////////

		function aylienConceptAnalysis(data){
			return $http.post('/api/analysis/aylien/concept', data, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			}).then(conceptAnalysisComplete)
			.catch(conceptAnalysisFailed);

			function conceptAnalysisComplete(data) { return data; }
			function conceptAnalysisFailed(e) { return exception.catcher('XHR Failed for aylien concept analysis')(e); }
		};

		function watsonAnalysis(data){
			return $http.post('/api/analysis/watson', data, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			}).then(watsonAnalysisComplete)
			.catch(watsonAnalysisFailed);

			function watsonAnalysisComplete(data) { return data; }
			function watsonAnalysisFailed(e) { return exception.catcher('XHR Failed for watson analysis')(e); }
		};

		function watsonFileConversion(data){
			console.log(data);
			return $http.post('/api/file-conversion/watson', data, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			}).then(watsonFileConversionComplete)
			.catch(watsonFileConversionFailed);

			function watsonFileConversionComplete(data) { return data; }
			function watsonFileConversionFailed(e) { return exception.catcher('XHR Failed for watson file conversion')(e); }
		};
	   
	}

})();