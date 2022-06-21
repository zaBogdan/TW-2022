const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN_USER } = require('shared').config.services;

exports.execute = async (message) => {

    const data = await httpRequest({}, 'get', `${DOMAIN_USER}/internal/domain/user/${message.domainId}/${message.listenerId}`);

    message.listener = data.data.domainUser
    return message
}