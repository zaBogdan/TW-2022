const zappucinno = require('./zappucinno');
const { bodyParser, cors } = require('./zappucinno/middlewares');
const router = require('./router');

const app = zappucinno();

const models = {}; // TODO: Add mongoose models;

app.use(cors({
    origin: ['localhost:3000'],
}));

app.use(bodyParser.json);

app.use((req, rest, next) => {
    req.db = models;
    next();
});

app.use('/', router());

const exposedPort = process.env.PORT || 3000;

app.listen(exposedPort, () => {
    console.log('[Gamify] Listening on port 3000');
})