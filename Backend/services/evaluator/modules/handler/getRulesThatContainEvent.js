const httpRequest = require('shared').modules.internal_comm.http.request;
const { RULES } = require('shared').config.services;

exports.execute = async (message) => {
    try {
        const data = await httpRequest({}, 'get', `${RULES}/internal/rule/related/${message.event}`);
        message.rules = data.data.rules;
    } catch(e) {
        throw new Error(e.error)
    }
    return message;
}