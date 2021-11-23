/*Diego Poblete #301158204, COMP 229, Section 008*/

let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema(
  {
    title: String,
    userId: String,
    startDate: Date,
    endDate: Date,
    description: String  
  },
  {
    collection: 'survey'
  }
);

module.exports = mongoose.model('Survey', surveyModel);

