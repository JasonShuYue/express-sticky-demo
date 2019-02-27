var express = require('express');

var Note = require('../model/note');
var router = express.Router();

/* GET api listing. */
router.get('/notes', function(req, res, next) {
    // Note.findAll({
    //   raw: true
    // }).then(function(notes) {
    //   console.log('!!!!!!!!!!_------------------')
    //   console.log(notes)
    //   res.send({
    //     status: 0,
    //     data: notes
    //   })
    // })

    var opts = {raw: true}
    if(req.session && req.session.user){
      opts.where = {uid:req.session.user.id }
    }

    Note.findAll(opts).then(function(notes) {
      console.log('---------------------------------------------------')
      console.log(notes)
      res.send({status: 0, data: notes});
    }).catch(function(){
      res.send({ status: 1,errorMsg: '数据库异常'});
    });
});

router.post('/notes/add', function(req, res, next) {
  var note = req.body.note;
  var user = req.session.user;
  console.log('user!!!!!!!!!!!!!!!!!', user)
  if(user) {
    Note.create({content: note, uid: user.id}).then(function() {
      res.send({status: 0})
    }).catch(function(error) {
      res.send({
        status: 1,
        errorMsg: '数据库出错'
      })
    })
  } else {
    res.send({
      status: 1,
      errorMsg: '请先登录'
    })
  }

});

router.post('/notes/edit', function(req, res, next) {
  var note = req.body.note;
  var id = req.body.id;
  var user = req.session.user;
  Note.update(
      {
        content: note,
        uid: user.id
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
  var user = req.session.user;
  Note.destroy({
    where: {id: id, uid: user.id}
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
