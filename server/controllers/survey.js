/*Diego Poblete #301158204, COMP 229, Section 008*/

const { render } = require('ejs');

let Survey = require('../models/survey');
let Question = require('../models/question');
let Option = require('../models/option');



module.exports.surveyList = function(req, res, next) {
    Survey.find((err, surveyList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            res.render('createsurvey/list', {
                title: "Survey List",
                surveys: surveyList,
                displayName: req.user ? req.user.displayName:''
            });
        }
    });
}

// Survey object

module.exports.displaySurveyAdd = function(req, res, next) {
    let newSurvey = Survey();

    res.render('createsurvey/add_edit', {
        title: 'Create a new survey',
        survey: newSurvey
    });
}

module.exports.saveSurveyAdd = function(req, res, next) {

    let newSurvey = Survey({
        _id: req.body.id,
        userId: req.user.id,
        title: req.body.surveyTitle,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description
    });

    let questions = req.body.q;

    Survey.create(newSurvey, (err, survey) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(survey);
            if (questions > 0) {
                for (let i = 0; i < questions; i++){
                    processQuestion(req, i);
                }
            }
            res.redirect('/survey-list');
        }
    });
}

module.exports.displaySurveyEdit = function(req, res, next) {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Get questions and options

            res.render('createsurvey/add_edit', {
                title: 'Edit Survey', 
                survey: surveyToEdit,
                questions: questionList
            })
        }
    });
}

module.exports.saveSurveyEdit = function(req, res, next) {

}

// Question object

getQuestions = function(sid) {
    Question.find({surveyId: sid}, (err, questionList) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            return questionList;
        }
    });
}

processQuestion = function(req, questionNumber) {
    let q = Question();

    let newQuestion = Question({
        _id: q._id,
        surveyId: req.body.id,
        question: req.body.questions[questionNumber - 1],
        questionNumber: questionNumber
    });

    let options = req.body.o[questionNumber - 1];

    Question.create(newQuestion, (err, question) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(question);
            if (options > 0) {
                for (let i = 0; i < options; i++){
                    processOption(req, questionNumber, q._id, i);
                }
            }
        }
    });
}

// Option object

getOptions = function(qid) {
    Option.find({questionId: qid}, (err, OptionList) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            return {qid, OptionList}
        }
    });
}

processOption = function (req, questionNumber, qid, optionNumber) {
    let o = Option();

    let newOption = Option({
        _id: o._id,
        questionId: qid,
        option: req.body.options[questionNumber - 1][optionNumber - 1],
        optionNumber: optionNumber
    })

    Option.create(newOption, (err, option) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(option);
        }
    });
}