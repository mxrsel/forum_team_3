import React from 'react';
import { Posts } from '../../typed';
import DescriptionIcon from '@mui/icons-material/Description';
import Grid from '@mui/material/Grid2';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';

interface PostItemProps {
  post: Posts
}

const apiURL = 'http://localhost:8000'


const PostsItem: React.FC<PostItemProps> = ({post}) => {

  return (
    <Grid size={12}>
      <NavLink to={`/products/${post._id}`} style={{ textDecoration: 'none' }}>
        <Card sx={{ display: 'flex', flexDirection: 'row', maxWidth: 800, margin: 'auto', borderRadius: 2, boxShadow: 3 }}>
          {post.postImage ? (
            <CardMedia
              component="img"
              image={`${apiURL}/public/${post.postImage}`}
              alt={post.postTitle || 'Post image'}
              sx={{ width: 170, height: 170, objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                width: 170,
                height: 170,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.300',
                color: 'grey.700',
              }}
            >
              <DescriptionIcon sx={{ fontSize: 50 }} />
            </Box>
          )}
          <CardContent sx={{ display: 'flex',flexDirection: 'column', padding: 1, marginLeft: 3}}>
            <Typography variant="overline" color="text.secondary" sx={{ marginBottom: 1 }}>
              {dayjs(post.datetime).format('MMMM D, YYYY hh:mm')} by {post.user}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold'}}>
              {post.postTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{marginBottom: 1 }}>
              {post.postContent}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{marginTop: 'auto'}}>
              Comments: {post.commentCount}
            </Typography>
          </CardContent>
        </Card>
      </NavLink>
    </Grid>
  );
};

export default PostsItem;