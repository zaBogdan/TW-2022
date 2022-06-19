const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { rankSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;

