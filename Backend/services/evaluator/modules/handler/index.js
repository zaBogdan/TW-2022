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
        // updateDomainUser,
        getRulesThatContainEvent,
        evaluateRules,
        addLatestMessage
    ];

    message.processingMessage = 'Success';

    console.log('To execute chain', message)

    try {
        for(const cmd of chain) {
            message = await cmd.execute(message);
        }
    } catch(e) {
        console.error('Erorr', e);
        message.processingMessage = e.message;
        await addLatestMessage.execute(message);
    }
    console.log('Final message is: ', message);
}