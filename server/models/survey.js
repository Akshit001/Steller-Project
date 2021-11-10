let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
  title: String,
  question1: String,
  question2: String,
  question3: String,
  description: String,
  writer: String,
  isactive: Boolean,
},
{
  collection: "Survey"
});

module.exports = mongoose.model('Survey', surveyModel);

