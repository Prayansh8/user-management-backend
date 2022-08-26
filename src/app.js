const express = require('express');
const { connectToServer } = require('./utils/db');
const { signIn, signUp } = require('./controlears/auth');
const { getUsers, getUser, updateUser, deleteUser } = require('./controlears/users');
const { checkToken } = require('./middlewares');
const app = express();
const { port, baseUrI } = require('./config');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

connectToServer(() => {
    console.log('connected to DB');
});

var cors = require("cors");
app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.post("/api/sign-in", signIn);
app.post("/api/sign-up", signUp);
app.get("/api/test-token", checkToken, (req, res) => {
    return res.send({ 'detail': 'Token working' });
})

app.get("/api/users", checkToken, getUsers);
app.get("/api/users/:id", checkToken, getUser);
app.patch("/api/users/:id", checkToken, updateUser);
app.delete("/api/users/:id", checkToken, deleteUser);

app.listen(port, () => console.log(`Example app listening on port ${baseUrI}:${port}`));
