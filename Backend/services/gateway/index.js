const mongoose = require('mongoose');
const {log} = require('shared').utils.logging;
const corsList = require('shared').config.cors;

const zappucinno = require('zappucinno');
const { bodyParser, cors } = require('zappucinno/middlewares');
const setup = require('./configs/setup');

const router = require('./router');
const { config, JWTAuth } = require('./middleware');
const app = zappucinno();

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true,
}).then(conn => {
    log('Successfully connected to Mongo')
}).catch(e => {
    throw e;
})

app.use(cors({
    origin: corsList,
}));

app.use(JWTAuth);
app.use('/', router());

const exposedPort = setup?.PORT  || process.env.PORT  || 3000;

app.listen(exposedPort, () => {
    log(`Listening on port ${exposedPort}`)
})