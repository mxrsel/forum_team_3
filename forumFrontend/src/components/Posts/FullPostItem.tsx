import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
import { Posts } from '../../typed';

interface Props {
  fullPost: Posts;
}

const apiURL = 'http://localhost:8000'


const FullPostItem: React.FC<Props> = ({fullPost}) => {
  return (
    <Grid container direction='column' style={{alignItems: 'center'}}>
      <Box>
      <Typography>
        {fullPost.user} - added {fullPost.datetime}
      </Typography>
      </Box>
      {fullPost.postImage && (
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          src={`${apiURL}/public/${fullPost.postImage}`}
          alt={fullPost.user}
        />
      )}
<Box>
      <Typography>
        {fullPost.postTitle}
      </Typography>
      <Typography>
        {fullPost.postContent}
      </Typography>
</Box>
    </Grid>
  );
};

export default FullPostItem;