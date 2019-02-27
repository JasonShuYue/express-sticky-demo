var express = require('express');

var Note = require('../model/note');
var router = express.Router();

/* GET api listing. */
router.get('/notes', function(req, res, next) {
  console.log('/notes')
  console.log(Note)
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
  Note.findAll({
    raw: true
  }).then(function(notes) {
    res.send({
      status: 0,
      data: notes
    })
  })

});

router.post('/notes/add', function(req, res, next) {
  var note = req.body.note;
  Note.create({content: note}).then(function() {
    res.send({status: 0})
  }).catch(function(error) {
    res.send({
      status: 1,
      errorMsg: '数据库出错'
    })
  })
});

router.post('/notes/edit', function(req, res, next) {
  var note = req.body.note;
  var id = req.body.id;
  Note.update(
      {
        content: note
      },
      {
        where: { id: id}
      }).then(function() {
        console.log(arguments)
        res.send({status: 0})
  }).catch(function() {
    res.send({
      status: 1,
      errorMsg: '数据库出错'
    })
  })
});

router.post('/notes/delete', function(req, res, next) {
  var id = req.body.note;
  Note.destroy({
    where: {id: id}
  }).then(function() {
    res.send({ status: 0})
  }).catch(function() {
    res.send({
      status: 1,
      errorMsg: '数据库出错'
    })
  })
});

module.exports = router;
