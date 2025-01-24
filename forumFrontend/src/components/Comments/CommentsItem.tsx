import React from 'react';
import { Comment } from '../../typed';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardHeader } from '@mui/material';

interface Props {
  comments: Comment
}

const CommentsItem: React.FC<Props> = ({comments}) => {
  return (
    <Grid>
      <Card>
        <CardHeader>
          {comments.user}
        </CardHeader>
        <CardContent>
          {comments.commentText}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CommentsItem;