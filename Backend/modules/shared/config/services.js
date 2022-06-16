const basePath = 'http://127.0.0.1'

const development =  {
    GATEWAY: `${basePath}:3000`,
    AUTHENTICATION: `${basePath}:3100`,
}

const production = {
    GATEWAY: 'http://Gateway:3000',
    AUTHENTICATION: 'http://Authentication:3100',
}
module.exports = (process.env.NODE_ENV === 'prod' ? production : development);