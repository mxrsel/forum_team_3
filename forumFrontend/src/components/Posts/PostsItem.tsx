import React from 'react';
import { Posts } from '../../typed';
import NoImage from '../../assets/NoImage.png';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardMedia } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface PostItemProps {
  post: Posts
}

const apiURL = 'http://localhost:8000;'


const PostsItem: React.FC<PostItemProps> = ({post}) => {
  let postImage = NoImage;

  if (post.postImage) {
    postImage = `${apiURL}/public/${post.postImage}`;
  }


  return (
    <Grid style={{alignItems: 'center'}}>
      <NavLink to={`/posts/${post._id}`}>
        <Card>
          <CardContent>
            <CardMedia
              style={{ height: '400px', alignItems: 'center'}}
              component='img'
              image={postImage}
              title={post.user}
            />
           {post.datetime} by {post.user}
          </CardContent>
        </Card>
      </NavLink>
    </Grid>
  );
};

export default PostsItem