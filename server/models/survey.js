let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
  title: String,
  writerId: String,   // will be used to show the writer in the survey list
  startDate : Date,
  endDate: Date,

  question1: String,
  question2: String,
  question3: String,
  description: String,
  isactive: Boolean,

  QuestionObject1: 
  { 
      Question : String, 
      Options: [String], 
  },    
  QuestionObject2: 
  { 
      Question : String, 
      Options: [String],
  },
  QuestionObject3:   
  { 
      Question : String, 
      Options: [String], 
  },    
  QuestionObject3:   
  { 
      Question : String, 
      Options: [String], 
  }    
},
{
  collection: 'Surveys'
});

module.exports = mongoose.model('Survey', surveyModel);

