const basePath = 'http://127.0.0.1'

const development =  {
    GATEWAY: `${basePath}:3000`,
    AUTHENTICATION: `${basePath}:3100`,
    DOMAIN: `${basePath}:3101`,
    EVENT: `${basePath}:3102`,
    USER: `${basePath}:3103`,
}

const production = {
    GATEWAY: 'http://Gateway:3000',
    AUTHENTICATION: 'http://Authentication:3100',
    DOMAIN: 'http://Domains:3101',
    EVENT: 'http://Events:3102',
    USER: 'http://User:3103',
}

module.exports = (process.env.NODE_ENV === 'prod' ? production : development);