/*Diego Poblete #301158204, COMP 229, Section 008*/

let mongoose = require('mongoose');

let qAnswerModel = mongoose.Schema(
    {
        sAnswerId: String,
        questionId: String,
        optionId: String
    },
    {
        collection: "questionAnswer"
    }
);

module.exports = mongoose.model('QuestionAnswer', qAnswerModel);