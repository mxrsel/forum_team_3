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
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { selectorComments, selectorCommentsLoading } from '../../store/slices/commentsSlice.ts';
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
  const commentsLoading = useAppSelector(selectorCommentsLoading);

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
            <Divider sx={{ mb: 1, mt: 1 }} />
            <Typography variant="h5" gutterBottom textAlign="center">
              Comments:
            </Typography>
            <Stack mx="auto" maxWidth={800} gap={1} alignItems="stretch">
              {commentsLoading ? (
                <Loader open={commentsLoading} />
              ) : (!comments || comments.length === 0) ? (
                <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                  No comments yet
                </Typography>
              ) : (
                comments.map((comment) => (
                  <CommentsItem key={comment._id} comments={comment} />
                ))
              )}
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
