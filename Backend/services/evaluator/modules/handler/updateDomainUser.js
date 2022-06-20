const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN_USER } = require('shared').config.services;

exports.execute = async (message) => {
    const data = await httpRequest({}, 'put', `${DOMAIN_USER}/internal/domain/user/${message.domainId}/${message.listener.listenerId}`, {
        ...message.listener
    });

    if(data.success === false) {
        throw new Error('Failed to update user');
    }

    return message;
}