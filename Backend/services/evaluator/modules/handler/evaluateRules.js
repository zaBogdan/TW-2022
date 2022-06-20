
const evaluateRule = async (rule, user) => {
    console.log(rule, user);
    const type = (rule.match === 'all' ? '&&' : '||');
}
exports.execute = async (message) => {
    for(const rule of message.rules) {
        await evaluateRule(rule, message.listener);
    }
    return message;
}