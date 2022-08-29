const { db } = require('../models/db');

const createPost = (req, res) => {
    if (!req.user) {
        return res.status(401).send({ "detail": "unauthorized" });
    }
    const name = req.body.name;
    const content = req.body.content;
    const image = req.body.image;

    const postData = {
        name: name,
        content: content,
        image: image,
        createdBy: req.user.id,
    }
    const post = db.post(postData);
    post.save();
    return res.status(201).send(post);
}

const getPosts = async (req, res) => {
    const data = await db.post.find({})
    return res.status(201).send(data);
}

const getPost = async (req, res) => {

    const userId = req.params.id;
    let userData = null;
    try {
        postData = await db.post.findById(userId);
    } catch (error) {
        console.error(`Failed to get user, error: ${error.message}`);
    }
    if (!postData) {
        return res.status(404).send({ detail: 'User not found' });
    }
    return res.send(postData);
}

const updatePost = async (req, res) => {
    if (!req.user) {
        return res.status(401).send({ "detail": "unauthorized" });
    }
    const postId = req.params.id;
    const postData = req.body;
    let post = null;
    try {
        post = await db.post.findById(postId);
    } catch (error) {
        console.error(`Failed to get post, error: ${error.message}`);
    }
    if (!post && post.userId != req.user.id) {
        return res.status(404).send({ detail: 'Post not found' });
    }

    await db.post.updateOne(post, postData);
    post = await db.post.findById(userId);
    return res.send(post);
}

const deletePost = async (req, res) => {
    const postId = req.params.id;
    let post = await db.post.findById(postId);
    if (!post && post.userId != req.user.id) {
        return res.status(404).send({ detail: 'Post not found' });
    }
    await db.post.findByIdAndDelete(postId);
    return res.send({detail: 'Post deleted'});
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
}