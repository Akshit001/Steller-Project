/*Diego Poblete #301158204, COMP 229, Section 008*/

let mongoose = require('mongoose');

let sAnswerModel = mongoose.Schema(
  {
    surveyId: String,
    answerDate: Date
  },
  {
    collection: 'surveyAnswer'
  }
);

module.exports = mongoose.model('SurveyAnswer', sAnswerModel);
