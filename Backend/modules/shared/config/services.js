const basePath = 'http://127.0.0.1'

// Dude why in the world messenger works on 3103??? :/

const development =  {
    GATEWAY: `${basePath}:3000`,
    AUTHENTICATION: `${basePath}:3100`,
    DOMAIN: `${basePath}:3101`,
    EVENT: `${basePath}:3102`,
    USER: `${basePath}:3104`,
    DOMAIN_USER: `${basePath}:3105`,
    ACHIEVEMENTS: `${basePath}:3106`,
    RANKS: `${basePath}:3107`,
    RULES: `${basePath}:3108`,
}

const production = {
    GATEWAY: 'http://Gateway:3000',
    AUTHENTICATION: 'http://Authentication:3100',
    DOMAIN: 'http://Domains:3101',
    EVENT: 'http://Events:3102',
    USER: 'http://User:3104',
    DOMAIN_USER: 'http://DomainUser:3105',
    ACHIEVEMENTS: 'http://Achievements:3106',
    RANKS: `http://Ranks:3107`,
    RULES: 'http://Rules:3108',
}

module.exports = (process.env.NODE_ENV === 'prod' ? production : development);