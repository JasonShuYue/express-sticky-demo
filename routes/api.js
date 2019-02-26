var express = require('express');
var router = express.Router();

/* GET api listing. */
router.get('/notes', function(req, res, next) {
  res.send({
    status: 0,
    data: [
      {id: 1, content: '123'},
      {id: 2, content: '1321'}
    ]
  })

});

router.post('/notes/add', function(req, res, next) {
  var note = req.body.note;
});

router.post('/notes/edit', function(req, res, next) {
  var note = req.body.note;
  console.log('edit!!!!!!')
});

router.post('/notes/delete', function(req, res, next) {

});

module.exports = router;
