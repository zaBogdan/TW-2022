const { timeToString } = require('./time');

const log = function(str, ...args) {
    console.log(timeToString(new Date()),"[Gameify]",str, ...args); 
}

exports.log = log;

exports.debug = function(str, ...args) {
    if(process.env.DEBUG) {
        log(str, ...args);
    }
}