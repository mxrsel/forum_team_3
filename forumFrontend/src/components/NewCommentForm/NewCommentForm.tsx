import { Box, IconButton, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { selectSending } from '../../store/slices/newCommentSlice.ts';

import { selectPost } from '../../store/slices/commentSlice';
import { Posts } from '../../typed';
import { sendComment } from '../../store/thunks/newCommentThunk.ts';
import SendIcon from '@mui/icons-material/Send';

interface Data {
  text: string;
}

interface Error {
  [key: string]: string | undefined;
}

const initialData: Data = {
  text: '',
};

const NewCommentForm = () => {
  const dispatch = useAppDispatch();

  const sending = useAppSelector(selectSending);
  const post: Posts = useAppSelector(selectPost);

  const [data, setData] = useState<Data>(initialData);

  const [error, setError] = useState<Error>({});

  const getFieldError = (fieldName: string) => {
    try {
      return error[fieldName];
    } catch {
      return undefined;
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === 'text') {
      setError((error) => ({ ...error, title: undefined }));
    }

    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!data.text) {
      setError((error) => ({ ...error, title: 'Text is required.' }));

      return;
    }

    try {
      await dispatch(
        sendComment({
          post: post._id,
          commentText: data.text,
        })
      ).unwrap();

      setData(initialData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box maxWidth="sm" p={2}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Text"
          name="text"
          required
          multiline
          minRows={2}
          value={data.text}
          onChange={handleChange}
          error={!!getFieldError('text')}
          helperText={getFieldError('text')}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  type="submit"
                  aria-label="comment"
                  loading={sending}
                >
                  <SendIcon />
                </IconButton>
              ),
            },
          }}
        />
      </form>
    </Box>
  );
};

export default NewCommentForm;
