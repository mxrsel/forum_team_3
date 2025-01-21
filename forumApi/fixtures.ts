import mongoose from 'mongoose';
import config from './config';
import Post from './models/Post';
import User from './models/User';
import { randomUUID } from 'node:crypto';
import Comment from './models/Comment';

const run = async() => {
  await mongoose.connect(config.mongoDbPath);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch(e) {
    console.log('Collections were not presents, skipping drop');
  }

   const [John, Maria, Anna, Jake, ] = await User.create(
    {
      username: 'John',
      password: '123456',
      token: randomUUID(),
    },
     {
       username: 'Maria',
       password: '77777',
       token: randomUUID(),
     },
     {
       username: 'Anna',
       password: '8888',
       token: randomUUID(),
     },
     {
       username: 'Jake',
       password: '2222',
       token: randomUUID(),
     },

  );

  const [SquidGame, Receipt] = await Post.create(
    {
      user: John._id,
      postTitle: 'What do you think about new season of Squid Game?',
      postContent: 'In my opinion this season is so interesting',
      postImage: 'fixtures/John.png',
      datetime: new Date().toDateString()
    },
    {
      user: Maria._id,
      postTitle: 'Can you give me some ideas for present for my friend ',
      postContent: 'Want to surprise her',
      postImage: 'fixtures/Maria.png',
      datetime: new Date().toDateString()
    }
  );

  await Comment.create(
    {
      user: John._id,
      post: Receipt._id,
      commentText: 'If you want to surprise your friend listen call of your soul and choose',
    },
    {
      user: Anna._id,
      post: Receipt._id,
      commentText: 'Great smell perfume',
    },
    {
      user: Maria._id,
      post: SquidGame._id,
      commentText: 'Of course the ending was so unexpected',
    },
    {
      user: Jake._id,
      post: SquidGame._id,
      commentText: 'For me first season is better',
    },
  )
}

