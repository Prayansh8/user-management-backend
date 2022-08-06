require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    baseUrI: process.env.BASE_URI || 'http://localhost',
    db: {
        uri: process.env.DB_URI || 'mongodb://localhost:27017/mydb',
    },
    jwt: {
        jwtSecretKey: process.env.JWT_SECRET_KEY || 'gfg_jwt_secret_key',
        tokenHeaderKey: process.env.TOKEN_HEADER_KEY || 'gfg_token_header_key',
    },
}; 

module.exports = config;
