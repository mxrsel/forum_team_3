import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectPostsItem, selectPostsLoading } from '../../store/slices/postsSlice.ts';
import { getAllPosts } from '../../store/thunks/postsThunk.ts';
import PostsItem from './PostsItem.tsx';
import Grid from '@mui/material/Grid2';
import Loader from '../UI/Loader.tsx';
import { Typography } from '@mui/material';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPostsItem);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch]);

  return (
    <Grid>
      {loading ? (
        <Loader open={loading}/>
      ) : (
        <>
        {posts.length === 0 && !loading ? (
          <Typography variant='h1'>No Posts yet</Typography>
          ) : (
            <>
              {posts.map((post) => (
                <PostsItem key={post._id} post={post}/>
              ))}
            </>
          )}
        </>
      )
        })
    </Grid>

  );
};

export default Posts;