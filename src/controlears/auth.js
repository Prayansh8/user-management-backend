const { db } = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function signIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
    var ere = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!ere.test(email)) {
        return res.status(400).send({ detail: 'please fill email formate' });
    }

    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/;
    if (!re.test(password)) {
        return res.status(400).send({ detail: 'Minimum 6 and maximum 32 characters, at least one uppercase letter, one lowercase letter, one number and one special character:' });
    }

    const user = await db.user.findOne({ email: email });
    if (!user) {
        return res.status(404).send({ detail: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send({ detail: 'Invalid credentials' });
    }
    const token = jwt.sign(user, config.jwt.jwtSecretKey)
    return res.send({ detail: 'Login success', token: token });

}

async function signUp(req, res) {

    const password = req.body.password;
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    if(first_name === ""){
        return res.status(400).send({ detail: 'first_name are required' });
    }

    if(last_name === ""){
        return res.status(400).send({ detail: 'last_name are required' });
    }
    
    var ere = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!ere.test(email)) {
        return res.status(400).send({ detail: 'Please fill the email in email format' });
    }

    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/;
    if (!re.test(password)) {
        return res.status(400).send({ detail: 'password should Minimum 6 and maximum 32 characters, at least one uppercase letter, one lowercase letter, one number and one special character: are required' });
    }

    const existingUser = await db.user.findOne({email: email});

    if(existingUser){
        return res.status(400).send({ detail: 'User email exist' });
    }

    const passHash = await bcrypt.hash(password, 10);

    const userData = {
        firstName: first_name,
        lastName: last_name,
        email: email,
        gender: req.body.gender,
        password: passHash,
    }
    const user = await db.user(userData);
    user.save()
    return res.status(201).send(user);
}

module.exports = {
    signIn,
    signUp
}