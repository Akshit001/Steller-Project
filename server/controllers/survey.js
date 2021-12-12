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

module.exports.deleteSurvey = function(req, res, next) {
    let id = req.params.id;

    JSON.parse(JSON.stringify(getQuestions(id))).forEach((question) => {
        Option.remove({questionId: question._id}, (err) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
        });
        Question.remove({id: question._id}, (err) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
        });
    })
    
    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-list');
        }
    });
}

module.exports.displaySurveyAdd = function(req, res, next) {
    let newSurvey = Survey();

    res.render('createsurvey/add_edit', {
        title: 'Create a new survey',
        survey: newSurvey,
        questions: [],
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

    let questions = req.body.q ? Object.keys(req.body.q).length : 0;

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
                    try {
                        processQuestion(req, i, newSurvey._id);
                    }
                    finally {
                        questions++;
                    }
                }
            }
            res.redirect('/survey-list');
        }
    });
}

module.exports.displaySurveyEdit = function(req, res, next) {
    let id = req.params.id;
    var questionList = {};
    var optionList = {};

    Survey.findById(id, (err, surveyToDisplay) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Get questions and options

            if (getQuestions(id) != null) {
                questionList = JSON.parse(JSON.stringify(getQuestions(id))).forEach((q) => {
                    optionList.push(getOptions(q._id));
                });
            }

            res.render('createsurvey/add_edit', {
                title: 'Edit Survey', 
                survey: surveyToDisplay,
                questions: questionList,
                options: optionList
            })
        }
    });
}

module.exports.saveSurveyEdit = function(req, res, next) {
    let id = req.params.id;

    let updatedSurvey = Survey({
        _id: req.body.id,
        userId: req.user.id,
        title: req.body.surveyTitle,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // CREATE

            res.redirect('/survey-list');
        }
    });
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
            questionList.sort((a, b) => a.questionNumber - b.questionNumber);
            console.log(questionList);
            return questionList;
        }
    });
}

processQuestion = function(req, questionNumber, sid) {
    let qid = req.body.q[questionNumber][0].length > 0 ? req.body.q[questionNumber][0] : Question()._id;

    let theQuestion = Question({
        _id: qid,
        surveyId: sid,
        question: req.body.q[questionNumber][1],
        questionNumber: questionNumber
    });

    let options = req.body.o[questionNumber] ? Object.keys(req.body.o[questionNumber]).length : 0;

    if (req.body.q[questionNumber][0].length > 0) {
        Question.updateOne({_id: qid}, (err, question) => {
            if (err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                if (options > 0) {
                    for (let i = 0; i < options; i++){
                        try{
                            processOption(req, questionNumber, q._id, i);
                        }
                        finally {
                            options += 1;
                        }
                    }
                }
            }
        });
    }
    else {
        Question.create(theQuestion, (err, question) => {
            if (err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                if (options > 0) {
                    for (let i = 0; i < options; i++){
                        try{
                            processOption(req, questionNumber, q._id, i);
                        }
                        finally {
                            options += 1;
                        }
                    }
                }
            }
        });
    }
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
    let oid = req.body.o[questionNumber][optionNumber][0].length > 0 ? req.body.o[questionNumber][optionNumber][0] : Option()._id;

    let theOption = Option({
        _id: oid,
        questionId: qid,
        option: req.body.o[questionNumber][optionNumber][1],
        optionNumber: optionNumber
    })

    if (req.body.o[questionNumber][optionNumber][0].length > 0) {
        Option.replaceOne(theOption, (err, option) => {
            if (err)
            {
                console.log(err);
                res.end(err);
            }
        });
    }
    else{
        Option.create(theOption, (err, option) => {
            if (err)
            {
                console.log(err);
                res.end(err);
            }
        });
    }
}

// Survey statistics

module.exports.displayStatistics = function(req, res, next) {

}

// Answer survey

module.exports.displaySurveyAnswer = function(req, res, next) {
    let id = req.params.id;
    var questionList = {};
    var optionList = {};

    Survey.findById(id, (err, surveyToDisplay) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Get questions and options

            if (getQuestions(id) != null) {
                questionList = JSON.parse(JSON.stringify(getQuestions(id))).forEach((q) => {
                    optionList.push(getOptions(q._id));
                });
            }

            res.render('answersurvey/answer', {
                title: 'Answer Survey', 
                survey: surveyToDisplay,
                questions: questionList,
                options: optionList
            })
        }
    });
}


module.exports.processAnswer = function(req, res, next) {
    
}