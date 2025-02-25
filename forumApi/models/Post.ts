import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postContent: String,
  postImage: String,
  datetime: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;