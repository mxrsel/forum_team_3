import React from 'react';
import { Comment } from '../../typed';
import Grid from '@mui/material/Grid2';
import { Avatar, Box, Divider, Paper, Typography } from '@mui/material';

interface Props {
  comments: Comment
}

const CommentsItem: React.FC<Props> = ({comments}) => {

  return (
    <Grid container justifyContent="center">
      <Grid size={12}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              {comments.user.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {comments.user}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body1" color="text.primary">
            {comments.commentText}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CommentsItem;