
const evaluateRule = async (rule, user) => {
    console.log(rule, user);
}
exports.execute = async (message) => {
    for(const rule of message.rules) {
        await evaluateRule(rule, message.user);
    }
    return message;
}