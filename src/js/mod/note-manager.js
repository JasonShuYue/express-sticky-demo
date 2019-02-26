var Toast = require('./toast').Toast;
var Note = require('./node').Note;

var eventHub = require('mod/eventHub');


var NoteManager = (function() {

    function load() {
        $.get('/api/notes')
            .done(function(ret){
                if(ret.status == 0){
                    $.each(ret.data, function(idx, article) {
                        new Note({
                            id: article.id,
                            content: article.content,
                            username: article.username
                        });
                    });
                    eventHub.fire('waterfall');
                }else{
                    Toast(ret.errorMsg);
                }
            })
            .fail(function(){
                Toast('网络异常');
            });


    }

    function add() {
        new Note();
    }
    return {
        load: load,
        add: add
    };
})();

module.exports.NoteManager = NoteManager;