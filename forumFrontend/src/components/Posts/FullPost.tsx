import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectOnePost, selectPostsLoading } from '../../store/slices/postsSlice.ts';
import { useEffect } from 'react';
import { getPostById } from '../../store/thunks/postsThunk.ts';
import Loader from '../UI/Loader.tsx';
import FullPostItem from './FullPostItem.tsx';
import { getAllPostComments } from '../../store/thunks/commentsThunk.ts';
import { Typography } from '@mui/material';
import { selectorComments } from '../../store/slices/commentsSlice.ts';
import CommentsItem from '../Comments/CommentsItem.tsx';

const FullPost = () => {
  const {postId} = useParams();
  const dispatch = useAppDispatch();
  const fullPost = useAppSelector(selectOnePost);
  const comments = useAppSelector(selectorComments);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    if(!postId) {
      console.error("Post not found!");
      return
    }
    dispatch(getPostById(postId));
    dispatch(getAllPostComments(postId));
  }, [dispatch, postId]);

  if(!fullPost) return null

  return (
    <>
      {loading ? <Loader open={loading}/>
        :
        (
          <>
        <FullPostItem key={fullPost._id} fullPost={fullPost} />
          <Typography variant='h4'>
            Comments:
          </Typography>
            {comments.map((comment) => (
              <CommentsItem key={comment._id} comments={comment}/>
            ))}
          </>
        )
      }
    </>
  );
};

export default FullPost;