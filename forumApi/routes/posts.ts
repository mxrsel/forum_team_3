import express from 'express';
import { imagesUpload } from '../multer';
import Post from '../models/Post';
import mongoose from 'mongoose';
import auth, { Req } from '../middleware/auth';
import * as Types from '../types';

const postsRouter = express.Router();

postsRouter.post('/', auth, imagesUpload.single('images'), async (req: Req, res, next) => {
  try {
    const {postTitle, postContent} = req.body;
    const user = req.user;

    if (!postTitle) {
      res.status(400).send({success: false, message: 'Title is required'});
      return;
    }

    if (!user) {
      res.status(400).send({success: false, message: 'User not authenticated!'});
      return;
    }

    const post = await Post.create({
      user: user._id,
      postTitle,
      postContent,
      postImage: req.file ? req.file.filename : null,
    });

    res.status(200).send({success: true, post: post});

  } catch (e) {
    res.status(500).send({success: false, message: 'Server error'});
    next(e);
  }
});

postsRouter.get('/', async (req, res, next) => {
  try {
    const getPosts = await Post.find()
      .populate<{ user: { username: string } }>({
        path: 'user',
        select: 'username'
      });

    if (!getPosts) {
      res.status(404).send({success: false, message: 'Posts not found'});
      return;
    }

    const posts: Types.Post[] = getPosts.map((post) => ({
      _id: post._id.toString(),
      user: post.user.username.toString(),
      postTitle: post.postTitle.toString(),
      postContent: post.postContent as string,
      postImage: post.postImage as string,
      datetime: post.datetime.toISOString(),
    }));

    res.status(200).send({success: true, posts: posts.reverse()});
  } catch (e) {
    res.status(500).send({success: false, message: 'Server error'});
    next(e);
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({success: false, message: 'Invalid ID format'});
      return;
    }

    const getPost = await Post.findById(id)
      .populate<{ user: { username: string } }>('user', 'username');

    if (!getPost) {
      res.status(404).send({success: false, message: 'Post not found'});
      return;
    }

    const post: Types.Post = {
      _id: getPost._id.toString(),
      user: getPost.user.username.toString(),
      postTitle: getPost.postTitle.toString(),
      postContent: getPost.postContent as string,
      postImage: getPost.postImage as string,
      datetime: getPost.datetime.toISOString(),
    }

    res.status(200).send({success: true, post: post});
  } catch (e) {
    res.status(500).send({success: false, message: 'Server error'});
    next(e);
  }
});

postsRouter.put('/:id', auth, imagesUpload.single('images'), async (req: Req, res, next) => {
  try {
    const {id} = req.params;
    const {postTitle, postContent} = req.body;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({success: false, message: 'Post id is invalid'});
      return;
    }

    if (!postTitle) {
      res.status(400).send({success: false, message: 'Title is required'});
      return;
    }

    if (!user) {
      res.status(400).send({success: false, message: 'User not authenticated!'});
      return;
    }

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).send({success: false, message: 'Post not found'});
      return;
    }

    if (!post.user.equals(user._id)) {
      res.status(400).send({success: false, message: 'This post does not belong to you'});
      return;
    }

    post.postTitle = postTitle;
    post.postContent = postContent;
    post.postImage = req.file ? req.file.filename : null;

    await post.save();
    res.status(200).send({success: true, post: post});

  } catch (e) {
    res.status(500).send({success: false, message: 'Server error'});
    next(e);
  }
});

postsRouter.delete('/:id', auth, async (req: Req, res, next) => {
  try {
    const {id} = req.params;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({success: false, message: 'Post id is invalid'});
      return;
    }

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).send({success: false, message: 'Post not found'});
      return;
    }

    if (!user) {
      res.status(400).send({success: false, message: 'User not authenticated!'});
      return;
    }

    if (!post.user.equals(user._id)) {
      res.status(400).send({success: false, message: 'This post does not belong to you'});
      return;
    }

    await Post.findByIdAndDelete(id);
    res.status(200).send({success: true, message: 'Post deleted successfully'});

  } catch (e) {
    res.status(500).send({success: false, message: 'Server error'});
    next(e);
  }
});

export default postsRouter;