import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Divider, Typography } from '@mui/material';
import { Posts } from '../../typed';
import dayjs from 'dayjs';

interface Props {
  fullPost: Posts;
}

const apiURL = 'http://localhost:8000'


const FullPostItem: React.FC<Props> = ({fullPost}) => {
  return (
    <Grid container direction='column'>
      <Box>
        <Typography variant="overline" color="text.secondary" sx={{ marginBottom: 1 }}>
          {dayjs(fullPost.datetime).format('MMMM D, YYYY hh:mm')} by {fullPost.user}
        </Typography>
      </Box>
      <Divider sx={{ mb: 1, mt: 1 }} />
      <Typography variant='h4' style={{marginBottom: 4}} textAlign="center">
        {fullPost.postTitle}
      </Typography>
      {fullPost.postImage && (
        <Box
          component="img"
          sx={{
            width: '100%',
            maxHeight: 250,
            objectFit: 'contain',
            borderRadius: 2
          }}
          src={`${apiURL}/public/${fullPost.postImage}`}
          alt={fullPost.user}
        />
      )}
<Box>
      <Typography variant='body1' style={{marginTop: 3}}>
        {fullPost.postContent}
      </Typography>
</Box>
    </Grid>
  );
};

export default FullPostItem;