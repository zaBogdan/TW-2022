exports.timeToString = function(date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}