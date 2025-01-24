import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectOnePost, selectPostsLoading } from '../../store/slices/postsSlice.ts';
import { useEffect } from 'react';
import { getPostById } from '../../store/thunks/postsThunk.ts';
import Loader from '../UI/Loader.tsx';
import FullPostItem from './FullPostItem.tsx';
import { getAllPostComments } from '../../store/thunks/commentsThunk.ts';

const FullPost = () => {
  const {postId} = useParams();
  const dispatch = useAppDispatch();
  const fullPost = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    if(!postId) {
      console.error("Post not found!");
      return
    }
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  if(!fullPost) return null

  return (
    <>
      {loading ? <Loader open={loading}/>
        :
        <FullPostItem key={fullPost._id} fullPost={fullPost} />
      }
    </>
  );
};

export default FullPost;