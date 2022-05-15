process.env.__ZAPPUCINNO_DEBUG__ = true;
const zappucinno = require('./zappucinno');
const router = require('./router');

const app = zappucinno();

app.use((req,res, next) => {
    console.log('middleware 1');
})

app.use((req,res, next) => {
    console.log('middleware 2');
})

app.use((req,res, next) => {
    console.log('middleware 3');
})

app.use((req,res, next) => {
    console.log('middleware 4');
})

console.log('Middleware router: ',router)
app.use('/', router());


app.listen(3000, () => {
    console.log('[Gamify] Listening on port 3000');
})