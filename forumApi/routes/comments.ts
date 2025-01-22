import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post';
import Comment from '../models/Comment';
import * as Types from '../types'
import auth, { Req } from '../middleware/auth';

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req: Req, res) => {
  try {
    const {post, commentText} = req.body;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(post)) {
      res.status(400).send({success: false, message: 'Post id is invalid'});
      return;
    }

    if (!commentText) {
      res.status(400).send({success: false, message: 'CommentText is required'});
      return;
    }

    if (!user) {
      res.status(400).send({success: false, message: 'User not authenticated!'});
      return;
    }

    const postExists = await Post.findById(post);

    if (!postExists) {
      res.status(404).send({success: false, message: 'Post does not exist!'});
      return;
    }

    const comment = new Comment({
      user: user._id,
      post: post,
      commentText: commentText,
    });

    await comment.save();

    res.status(200).send({success: true, comment: comment});

  } catch (e) {
    res.status(500).send({success: false, message: 'Server error:'});
    return;
  }
})

commentsRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({success: false, message: 'Post id is invalid'});
      return;
    }

    const post = await Post.findById(id)

    if (!post) {
      res.status(404).send({success: false, message: 'Post not found!'});
      return;
    }

    const getComments = await Comment.find({post: id})
      .populate<{ user: { username: string } }>({
        path: 'user',
        select: 'username',
      })

    if (getComments.length === 0) {
      res.status(404).send({success: false, message: 'Comments not found!'});
      return;
    }

    const comments: Types.Comment[] = getComments.map((comment) => ({
      _id: comment._id.toString(),
      user: comment.user.username,
      post: comment.post.toString(),
      commentText: comment.commentText as string,
    }));

    res.status(200).send({success: true, comments: comments});

  } catch (e) {
    res.status(500).send({success: false, message: 'Server error'});
    next(e);
  }
});

commentsRouter.put('/:id', auth, async (req: Req, res, next) => {
  try {
    const {id} = req.params;
    const {commentText} = req.body;
    const user = req.user;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send({success: false, message: 'Comment id is invalid'});
      return;
    }

    if (!user) {
      res.status(400).send({success: false, message: 'User not authenticated!'});
      return;
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(404).send({success: false, message: 'Comment not found!'});
      return;
    }

    if (!comment.user.equals(user._id)) {
      res.status(400).send({ success: false, message: 'This post does not belong to you' });
      return;
    }

    comment.commentText = commentText;
    await comment.save();

    res.status(200).send({success: true, comment});
  } catch (e) {
    res.status(500).send({success: false, message: 'Server error'});
    next(e);
  }
});

commentsRouter.delete('/:id', auth, async (req: Req, res, next) => {
  try {
      const {id} = req.params;
      const user = req.user;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send({success: false, message: 'Comment id is invalid'});
      return;
    }

    if (!user) {
      res.status(400).send({success: false, message: 'User not authenticated!'});
      return;
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(404).send({success: false, message: 'Comment not found!'});
      return;
    }

    if (!comment.user.equals(user._id)) {
      res.status(400).send({ success: false, message: 'This post does not belong to you' });
      return;
    }

    await Comment.findByIdAndDelete(id);
    res.status(200).send({success: true, message: 'Comment deleted successfully'});
  } catch (e) {
    res.status(500).send({success: false, message: 'Server error'});
    next(e);
  }
});

export default commentsRouter;