var eventHub = (function() {

    let events = {};

    // 订阅
    function on(eventName, fn) {
        if(!(eventName in events)) {
            events[eventName] = [];
        }
        events[eventName].push(fn);
    }

    // 发布模式
    function emit(eventName, data) {
        let fnList = events[eventName];
        fnList.map(fn => {
            fn.call(null, data);
        })
    }

    return {
        emit: emit,
        on: on,
    };
})();

module.exports = eventHub;