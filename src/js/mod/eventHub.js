function eventHub() {

    let events = {};

    function emit(eventName, fn) {
        if(!(eventName in events)) {
            events[eventName] = [];
        }
        events[eventName].push(fn);
    }

    function on(eventName, data) {
        let fnList = events[eventName];
        fnList.map(fn => {
            fn.call(null, data);
        })
    }

    return {
        emit: emit,
        on: on
    };
}

module.exports = eventHub;