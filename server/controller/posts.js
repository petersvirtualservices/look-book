const e = require("express");
const mongoose = require("mongoose");
const expressHandler = require("express-async-handler");
const PostMessage = require("../models/postMessage");

const getPosts = expressHandler(async (req, res) => {
  try {
    const postMessages = await PostMessage.find().sort({ createdAt: "asc" });

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const getPost = expressHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const postMessage = await PostMessage.findById(id);

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const createPost = expressHandler(async (req, res) => {
  const {creator,  title, message, age, selectedFile, tags } = req.body;

  const newPostMessage = new PostMessage({
    title,
    message,
    age,
    selectedFile,
    creator,
    tags,
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const updatePost = expressHandler(async (req, res) => {
  const { id } = req.params;
  const { title, message, age, creator, selectedFile, tags } = req.body;

  const updatedPost = {
    creator,
    title,
    age,
    message,
    tags,
    selectedFile,
    _id: id,
  };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
});

const deletePost = expressHandler(async (req, res) => {
  const { id } = req.params;

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});

const likePost = expressHandler(async (req, res) => {
  const { id } = req.params;

  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
});

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
