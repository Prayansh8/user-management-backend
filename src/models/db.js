const { usermodel } = require('./user');
const { postmodel } = require('./post');

const db = {
    user: usermodel,
    post : postmodel,
};

module.exports = {
    db,
}
