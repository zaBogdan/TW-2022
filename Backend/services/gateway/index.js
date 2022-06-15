const mongoose = require('mongoose');
const {log, debug} = require('shared').utils.logging;

const zappucinno = require('zappucinno');
const { bodyParser, cors } = require('zappucinno/middlewares');
const setup = require('./configs/setup');

const router = require('./router');
const models = require('./models');
const { config } = require('./middleware');

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
    origin: setup.corsOrigins,
}));

app.use(bodyParser.json);

app.use((req, res, next) => {
    req.db = models;
});
app.use('/', router());

const exposedPort = setup?.PORT  || process.env.PORT  || 3000;

app.listen(exposedPort, () => {
    log(`Listening on port ${exposedPort}`)
})