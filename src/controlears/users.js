const { db } = require('../models/db');

async function getUsers(req, res) {
    const data = await db.user.find({}, { "firstName": 1, "lastName": 1, "email": 1, "gender": 1 });
    return res.send(data);
}

const getUser = async (req, res) => {
    const userId = req.params.id;
    let userData = null;
    try {
        userData = await db.user.findById(userId, { "firstName": 1, "lastName": 1, "email": 1, "gender": 1 });
    } catch (error) {
        console.error(`Failed to get user, error: ${error.message}`);
    }
    if (!userData) {
        return res.status(404).send({ detail: 'User not found' });
    }
    return res.send(userData);
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    if(req.user.id != userId){
        return res.status(401).send({"detail": "unauthorized"});
    }
    const updatedUser = req.body;
    let user = null;
    try {
        user = await db.user.findById(userId);
    } catch (error) {
        console.error(`Failed to get user, error: ${error.message}`);
    }
    if (!user) {
        return res.status(404).send({ detail: 'User not found' });
    }
    await db.user.updateOne(user, updatedUser);
    user = await db.user.findById(userId);
    return res.send(user);
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    if(req.user.id != userId){
        return res.status(401).send({"detail": "unauthorized"});
    }
    user = await db.user.findByIdAndDelete(userId);
    return res.send("user deleted")
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}