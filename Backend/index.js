const mongoose = require('mongoose');

const zappucinno = require('./zappucinno');
const { bodyParser, cors } = require('./zappucinno/middlewares');

const router = require('./router');
const models = require('./models');
const { config } = require('./middleware');

const app = zappucinno();

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true,
}).then(conn => {
    console.log('[Gamify] Successfully connected to Mongo');
}).catch(e => {
    throw e;
})

app.use(cors({
    origin: ['localhost:3000'],
}));

app.use(bodyParser.json);

app.use((req, rest, next) => {
    req.db = models;
});

app.use('/', router());
app.use((req, res, next) => {
    console.log('Hai sa pl')
    return res.status(200).json({
        success: false,
        message: "Hai sa mearga si asta"
    });
});

const exposedPort = process.env.PORT || 3000;

app.listen(exposedPort, () => {
    console.log('[Gamify] Listening on port 3000');
})