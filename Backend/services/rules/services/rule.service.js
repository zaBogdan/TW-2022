const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { rankSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;

exports.getRuleById = async (req) => {
    return null;
}

exports.getRulesForDomain = async (req) => {
    return null;
}

exports.addRuleToDomain = async (req) => {
    return null;
}

exports.updateRuleById = async (req) => {
    return null;
}
