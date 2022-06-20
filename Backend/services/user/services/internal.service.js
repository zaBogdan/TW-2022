const { debug } = require('shared').utils.logging;
const { v4: uuid } = require('uuid');
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { userSchema } = require('../validation');

exports.findProfileBy = async (req) => {
    const searchObj = {}
    if(req.body.name !== undefined) {
        searchObj.username = req.body.name;
    }

    const profile = await req.db.User.findOne(searchObj, {
        __v: 0
    });

    if(profile === null) {
        throw new StatusCodeException('User doesn\'t have a profile setted up yet.', 404);
    }

    return profile;
}
