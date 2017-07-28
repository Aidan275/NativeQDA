(function () {

	'use strict';

	angular
	.module('nativeQDAApp')
	.service('surveyService', surveyService);

	/* @ngInject */
	function surveyService ($http, authentication, exception) {
		return {
			saveSurvey			: saveSurvey,
			readSurvey			: readSurvey,
			listSurveys 		: listSurveys,
			deleteSurvey 		: deleteSurvey,
			saveSurveyResponse 	: saveSurveyResponse,
			readSurveyResponses : readSurveyResponses
		};

		function saveSurvey(survey){
			return $http.post('/api/survey/save', survey, {
				headers: {
					Authorization: 'Bearer '+ authentication.getToken()
				}
			}).then(saveSurveyComplete)
			.catch(saveSurveyFailed);

			function saveSurveyComplete(data) { return data; }
			function saveSurveyFailed(e) { return exception.catcher('Failed saving survey.')(e); }
		};

		function readSurvey(accessID){
			// Encode the id for the API URL incase it includes reserved characters (e.g '+', '&')
			var encodedID = encodeURIComponent(accessID);
			return $http.get('/api/survey/read?accessID=' + encodedID, {
				headers: {
					Authorization: 'Bearer '+ authentication.getToken()
				}
			}).then(readSurveyComplete)
			.catch(readSurveyFailed);

			function readSurveyComplete(data) { return data; }
			function readSurveyFailed(e) { return exception.catcher('Failed reading survey.')(e); }
		};

		function listSurveys(){
			return $http.get('/api/survey/list', {
				headers: {
					Authorization: 'Bearer '+ authentication.getToken()
				}
			}).then(listSurveysComplete)
			.catch(listSurveysFailed);

			function listSurveysComplete(data) { return data; }
			function listSurveysFailed(e) { return exception.catcher('Failed listing surveys.')(e); }
		};

		function deleteSurvey(id) {
			// Encode the key for the API URL incase it includes reserved characters (e.g '+', '&')
			var encodedID = encodeURIComponent(id);
			return $http.delete('/api/survey/delete?id=' + encodedID, {
				headers: {
					Authorization: 'Bearer '+ authentication.getToken()
				}
			}).then(deleteSurveyComplete)
			.catch(deleteSurveyFailed);

			function deleteSurveyComplete(data) { return data; }
			function deleteSurveyFailed(e) { return exception.catcher('Failed deleting survey.')(e); }
		}

		function saveSurveyResponse(response){
			return $http.post('/api/survey/response/save', response, {
				headers: {
					Authorization: 'Bearer '+ authentication.getToken()
				}
			}).then(saveSurveyResponseComplete)
			.catch(saveSurveyResponseFailed);

			function saveSurveyResponseComplete(data) { return data; }
			function saveSurveyResponseFailed(e) { return exception.catcher('Failed saving survey response.')(e); }
		}; 

		function readSurveyResponses(accessID){
			// Encode the id for the API URL incase it includes reserved characters (e.g '+', '&')
			var encodedID = encodeURIComponent(accessID);
			return $http.get('/api/survey/responses/read?accessID=' + encodedID, {
				headers: {
					Authorization: 'Bearer '+ authentication.getToken()
				}
			}).then(readSurveyComplete)
			.catch(readSurveyFailed);

			function readSurveyComplete(data) { return data; }
			function readSurveyFailed(e) { return exception.catcher('Failed reading survey response.')(e); }
		};



	}

})();