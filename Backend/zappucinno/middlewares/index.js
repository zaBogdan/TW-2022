const router = require('./Router');
const bodyParser = require('./BodyParser');
const cors = require('./cors');
const requestParser = require('./requestParser');

module.exports = {
    cors,
    router,
    bodyParser,
    requestParser
}