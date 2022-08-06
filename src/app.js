const express = require('express');
const { connectToServer } = require('./utils/db');
const { signIn, signUp } = require('./controlears/auth');
const { checkToken } = require('./middlewares');
const app = express();
const { port, baseUrI } = require('./config');

connectToServer(() => {
    console.log('connected to DB');
});

var cors = require("cors");
app.use(express.json());

app.use(cors());

app.post("/api/sign-in", signIn);
app.post("/api/sign-up", signUp);
app.get("/api/test-token", checkToken, (req, res) => {
    console.log(req.user);
    return res.send({ 'detail': 'Token working' });
})

app.listen(port, () => console.log(`Example app listening on port ${baseUrI}:${port}`));
