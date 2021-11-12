/*Diego Poblete #301158204, COMP 229, Section 008*/

let mongoose = require('mongoose');

let surveyModel = mongoose.Schema(
  {
    title: String,
    writerName: String,   // will be used to show the writer in the survey list
    // Should be replaced with userId when authentication is added
    startDate: Date,
    endDate: Date,  
  },
  {
    collection: 'survey'
  }
);

module.exports = mongoose.model('Survey', surveyModel);

