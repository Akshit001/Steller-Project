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