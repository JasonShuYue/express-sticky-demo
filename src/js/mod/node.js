require('sass/note.scss');

var Toast = require('./toast.js').Toast;
var eventHub = require('mod/eventHub');

function Note(opts) {
    this.initOpts(opts);
    this.createNote();
    this.bindEvent();
}

Note.prototype = {

    defaultOpts: {
        id: '',
        uid: '',
        $ct: $('#content').length > 0 ? $('#content') : $('body'),
        content: 'input here', // Note的内容
    },

    initOpts: function(opts) {
        // 等价于Object.assign({}, this.this.defaultOpts, opts || {})
        this.opts = $.extend({}, this.defaultOpts, opts || {});
        // 抽出id属性单独记录
        if(this.opts.id) {
            this.id = this.opts.id;
        }
    },

    createNote: function() {
      var template = '<div class="note">' +
            '<div class="note-head">' +
                '<span class="username"></span>' +
                '<span class="delete">&times;</span>' +
            '</div>' +
            '<div class="note-ct" contenteditable="true"></div>' +
          '</div>';
      this.$note = $(template);
      // 填充opts属性
      this.$note.find('.note-ct').text(this.opts.content);
      this.$note.find('.username').text(this.opts.username);

      // 把该note插入到note的容器中
      this.opts.$ct.append(this.$note);
      if(!this.id) {
          this.$note.css('bottom', '10px');
      }
    },

    // What is this? 定时发布「瀑布流」？
    setLayout: function(){
        var self = this;
        if(self.clk){
            clearTimeout(self.clk);
        }
        self.clk = setTimeout(function(){
            eventHub.emit('waterfall');
        },100);
    },

    bindEvent: function() {
        var self = this,
            $note = this.$note,
            $noteHead = $note.find('.note-head'),
            $noteCt = $note.find('.note-ct'),
            $delete = $note.find('.delete');


        // 绑定删除事件
        $delete.on('click', function() {
            self.delete();
        });

        // 由于contenteditable没有change事件，所以这里做了模拟通过
        // 判断元素内容变动，来执行save
        $noteCt.on('focus', function() {
            if($noteCt.html() === 'input here') {
                $noteCt.html('');
            }
            $noteCt.data('before', $noteCt.html());
        }).on('blur paste', function() {
            if($noteCt.data('before') !== $noteCt.html()) {
                $noteCt.data('before', $noteCt.html());
                self.setLayout();
                if(self.id) {
                    self.edit($noteCt.html());
                } else {
                    self.add($noteCt.html());
                }
            }
        });

        $noteHead.on('mousedown', function(e) {
            var evtX = e.pageX - $note.offset().left, //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
                evtY = e.pageY - $note.offset().top;
            $note.addClass('draggable').data('evtPos', {x: evtX, y: evtY});
        }).on('mouseup', function(){
            $note.removeClass('draggable').removeData('evtPos');
        });

        // 设置note移动
        $('body').on('mousemove', function(e){
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY-$('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
                left: e.pageX-$('.draggable').data('evtPos').x
            });
        });
    },


    edit: function (msg) {
        var self = this;
        $.post('/api/notes/edit',{
            id: this.id,
            note: msg
        }).done(function(ret){
            if(ret.status === 0){
                Toast('update success');
            }else{
                Toast(ret.errorMsg);
            }
        })
    },

    add: function (msg){
        var self = this;
        $.post('/api/notes/add', {note: msg})
            .done(function(ret){
                if(ret.status === 0){
                    Toast('add success');
                }else{
                    self.$note.remove();
                    eventHub.emit('waterfall')
                    Toast(ret.errorMsg);
                }
            });
        //todo
    },

    delete: function(){
        var self = this;
        $.post('/api/notes/delete', {id: this.id})
            .done(function(ret){
                if(ret.status === 0){
                    Toast('delete success');
                    self.$note.remove();
                    eventHub.emit('waterfall')
                }else{
                    Toast(ret.errorMsg);
                }
            });

    }

};

module.exports.Note = Note;