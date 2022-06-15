const { debug } = require('shared').utils.logging;
const { v4: uuid } = require('uuid');
const { Password } = require('../modules');
const StatusCodeException = require('shared').exceptions.StatusCodeException;

exports.handleEmailRegister = async (req) => {
    const { email, password, type } = req.body;
    const emailExists = await req.db.Auth.findOne({ email })

    if(emailExists !== null) {
        throw new StatusCodeException('Email already exists', 500);
    }
    const user = new req.db.Auth({
        userId: uuid().replace(/-/gi, ''),
        type:  1, // TODO: This must be changed in future when we'll support OAuth
        email: email,
        password: await Password.generate(password)
    })

    await user.save()

    return email;
}