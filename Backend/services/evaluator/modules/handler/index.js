const { debug } = require("shared").utils.logging;

const retrieveUser = require('./retrieveUser');
const addEventToUser = require('./addEventToUser');
const updateDomainUser = require('./updateDomainUser');
const evaluateRules = require('./evaluateRules');
const addLatestMessage = require('./addLatestMessage');
const getRulesThatContainEvent = require('./getRulesThatContainEvent');

exports.executeChain = async (message) => {
    const chain = [
        retrieveUser,
        addEventToUser,
        updateDomainUser,
        getRulesThatContainEvent,
        evaluateRules,
        updateDomainUser,
    ];

    message.processingMessage = 'Success';

    debug('To execute chain', message)

    try {
        for(const cmd of chain) {
            message = await cmd.execute(message);
        }
    } catch(e) {
        console.error('Erorr', e);
        message.processingMessage = e.message;
        await addLatestMessage.execute(message);
    }
    delete message.rules;
    debug('Final message is: ', message);
}