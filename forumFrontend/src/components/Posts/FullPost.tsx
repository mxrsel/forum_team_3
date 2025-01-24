import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectOnePost,
  selectPostsLoading,
} from '../../store/slices/postsSlice.ts';
import { useEffect } from 'react';
import { getPostById } from '../../store/thunks/postsThunk.ts';
import Loader from '../UI/Loader.tsx';
import FullPostItem from './FullPostItem.tsx';
import { getAllPostComments } from '../../store/thunks/commentsThunk.ts';
import { Box, Container, Stack, Typography } from '@mui/material';
import { selectorComments } from '../../store/slices/commentsSlice.ts';
import CommentsItem from '../Comments/CommentsItem.tsx';
import { selectUser } from '../../store/slices/userSlice.ts';
import NewCommentForm from '../NewCommentForm/NewCommentForm.tsx';

const FullPost = () => {
  const user = useAppSelector(selectUser);
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const fullPost = useAppSelector(selectOnePost);
  const comments = useAppSelector(selectorComments);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    if (!postId) {
      console.error('Post not found!');
      return;
    }
    dispatch(getPostById(postId));
    dispatch(getAllPostComments(postId));
  }, [dispatch, postId]);

  if (!fullPost) return null;

  return (
    <>
      <Container maxWidth="md">
        {loading ? (
          <Loader open={loading} />
        ) : (
          <>
            <FullPostItem key={fullPost._id} fullPost={fullPost} />
            <Typography variant="h4" gutterBottom>
              Comments:
            </Typography>
            <Stack mx="auto" maxWidth={800} gap={1} alignItems="stretch">
              {comments.map((comment) => (
                <CommentsItem key={comment._id} comments={comment} />
              ))}
            </Stack>
            {user && (
              <Box mx="auto" mt={2} maxWidth={800}>
                <NewCommentForm />
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default FullPost;
