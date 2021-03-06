var mongoose = require( 'mongoose' );

var surveyResponseSchema = new mongoose.Schema({
	responseJSON: {
		type: String,
		required: true
	},
	responseId: {
		type: String,
		required: true, //Doesn't actually work in the update response
	},
	ipAddress: {
		type: String
	},
	dateCreated: {
		type: Date,
		"default": Date.now
	},
	lastModified: {
		type: Date,
		"default": Date.now
	},
	completed: { //If the survey is done and submitted or saved, to be completed later
		type: Boolean,
		"default": false
	},
	fullName: {
		type: String,
		required: true
	},
	email: {			// Not sure if all these fields should be included here or at all... 
		type: String
	},
	age: {
		type: Number
	},
	gender: {
		type: String
	},
	coords: {	/* Location of survey participant */
		type: { 
			type: String,
			default:'Point' 
		}, 
		coordinates: { /* Standard GPS/Map coords */
			type: [Number]
		}
	},
});

var surveySchema = new mongoose.Schema({
	surveyJSON: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	accessId: {
		type: String,
		required: true
	},
	dateCreated: {
		type: Date,
		"default": Date.now
	},
	lastModified: {
		type: Date,
		"default": Date.now
	},
	createdBy: {
		type: String,
		required: true
	},
	numResponses: {
		type: Number,
		"default": 0
	},
	responses: [surveyResponseSchema]
});

mongoose.model('Survey', surveySchema);
mongoose.model('SurveyResponse', surveyResponseSchema);