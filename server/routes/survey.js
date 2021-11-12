/*Bohyun Kim, #301131832, COMP 229, Section 008*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createsurvey/list', { title: 'Survey' });
});

router.get('/add', function(req, res, next) {
  res.render('createsurvey/add_edit', { title: 'Survey' });
});


module.exports = router;
