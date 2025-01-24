import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
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
      <Typography>
        {fullPost.user} - added {dayjs(fullPost.datetime).format('MMMM D, YYYY hh:mm')}
      </Typography>
      </Box>
      <Typography variant='h4' style={{marginBottom: 4}}>
        {fullPost.postTitle}
      </Typography>
      {fullPost.postImage && (
        <Box
          component="img"
          sx={{
            width: '100%',
            maxHeight: 400,
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