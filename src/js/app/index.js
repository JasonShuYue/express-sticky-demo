require('sass/index.scss')

var NoteManager = require('mod/note-manager.js').NoteManager;
var eventHub = require('mod/eventHub');
var WaterFall = require('mod/waterfall');


NoteManager.load();


$('.add-note').on('click', function() {
    NoteManager.add();
})


eventHub.on('waterfall', function(){
    WaterFall.init($('#content'));
})