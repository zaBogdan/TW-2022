const { debug } = require('shared').utils.logging;
const { v4: uuid } = require('uuid');
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { userSchema } = require('../validation');

exports.getProfileById = async (req) => {
    const profileId = req.params.id
    const searchKey = profileId.length === 24 ? '_id' : 'userId';

    const searchObj = {}
    searchObj[searchKey] = profileId;

    const profile = await req.db.User.findOne(searchObj, {
        __v: 0
    });

    if(profile === null) {
        throw new StatusCodeException('User doesn\'t have a profile setted up yet.', 404);
    }

    return profile;
}
exports.getCurrentProfile = async (req) => {
    const userId = req.locals.token.userId;

    const profile = await req.db.User.findOne({
        userId
    }, {
        __v: 0
    })

    if(profile === null) {
        throw new StatusCodeException('Your profile isn\'t currently active. Try to create one', 404);
    }

    return profile;
}

exports.createNewProfile = async (req) => {
    await userSchema.createProfile.validateAsync(req.body);
    const { firstName, lastName, username, dateOfBirth } = req.body;
    
    const userId = req.locals.token.userId;

    const profileExists = await req.db.User.findOne({
        $or: [
            { userId },
            { username },
        ]
    })

    if(profileExists !== null) {

        if(profileExists.userId === userId) {
            throw new StatusCodeException('You\'ve already configured a profile. Try to update it.', 409);
        } else {
            throw new StatusCodeException('This username is currently in use. Try to be more creative.', 409);
        }
    }

    const profile = new req.db.User({
        userId,
        firstName,
        lastName,
        username,
        dateOfBirth
    })

    await profile.save();

    return profile;
}

exports.updateCurrentProfile = async (req) => {
    await userSchema.updateProfile.validateAsync(req.body);
    const { firstName, lastName, dateOfBirth } = req.body;
    
    const userId = req.locals.token.userId;

    const profile = await req.db.User.findOne({
        userId
    })

    if(profile === null) {
        throw new StatusCodeException('Your profile isn\'t currently active. Try to create one', 404);
    }

    profile.firstName = firstName ?? profile.firstName;
    profile.lastName = lastName ?? profile.lastName;
    profile.dateOfBirth = dateOfBirth ?? profile.dateOfBirth;

    await profile.save();


    return profile;
}