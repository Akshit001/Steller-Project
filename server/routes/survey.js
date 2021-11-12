/*Bohyun Kim, #301131832, COMP 229, Section 008*/

var express = require('express');
var router = express.Router();

let surveyController = require('../controllers/survey');

/* GET home page. */
router.get('/', surveyController.surveyList);

router.get('/add', function(req, res, next) {
  res.render('createsurvey/add_edit', { title: 'Survey' });
});


module.exports = router;
