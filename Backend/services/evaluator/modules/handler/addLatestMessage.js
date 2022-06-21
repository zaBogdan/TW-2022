const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN_USER } = require('shared').config.services;
const { log } = require("shared").utils.logging;

exports.execute = async (message) => {
    if(message.processingMessage === undefined) {
        log('[!] Failed to set message for domain user.');
        return message;
    }
    const data = await httpRequest({}, 'put', `${DOMAIN_USER}/internal/domain/user/${message.domainId}/${message.listenerId}`, {
        latestMessage: message.processingMessage
    });

    if(data.success === false) {
        throw new Error('Failed to update user');
    }

    return message;
}