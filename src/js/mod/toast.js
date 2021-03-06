require('sass/toast.scss')


function toast(msg, time) {
    this.msg = msg;
    this.dissmissTime = time || 1000; // ms
    this.createToast();
    this.showToast();
}

toast.prototype = {
    createToast: function() {
        let template = '<div class="toast">' + this.msg + '</div>';
        this.$toast = $(template);
        $('body').append(this.$toast);
    },
    showToast: function() {
        let self = this;
        this.$toast.fadeIn(300, function() {
            setTimeout(function() {
                self.$toast.fadeOut(300, function() {
                    self.$toast.remove();
                })
            }, self.dissmissTime);
        })
    }
}

function Toast(msg, time) {
    return new toast(msg, time);
}

module.exports.Toast = Toast;