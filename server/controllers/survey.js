/*Diego Poblete #301158204, COMP 229, Section 008*/

const { render } = require('ejs');

let Survey = require('../models/survey');
let Question = require('../models/question');
let Option = require('../models/option');

// Survey list

module.exports.displaySurveyList = function(req, res, next) {
    let userId = req.user.id;

    Survey.find({userId: userId}, (err, surveyList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            res.render('createsurvey/list', {
                title: "Survey List",
                writer: req.user.displayName,
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
        survey: newSurvey,
        displayName: req.user ? req.user.displayName:''
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

    let questions = Object.keys(req.body.q).length;

    Survey.create(newSurvey, (err, survey) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            if (questions > 0) {
                for (let i = 0; i < questions; i++){
                    processQuestion(req, i, newSurvey._id);
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

processQuestion = function(req, questionNumber, sid) {
    let q = Question();

    let newQuestion = Question({
        _id: q._id,
        surveyId: sid,
        question: req.body.q[questionNumber],
        questionNumber: questionNumber
    });

    let options = Object.keys(req.body.o[questionNumber]).length;

    Question.create(newQuestion, (err, question) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
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
        option: req.body.o[questionNumber][optionNumber],
        optionNumber: optionNumber
    })

    Option.create(newOption, (err, option) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
    });
}