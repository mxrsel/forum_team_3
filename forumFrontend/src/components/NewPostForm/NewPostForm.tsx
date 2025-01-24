import { Button, Stack, TextField } from '@mui/material';
import FileInput from '../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { CloudUpload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { selectSending } from '../../store/slices/newPostSlice';
import { sendPost } from '../../store/thunks/newPostThunk';
import { selectUser } from '../../store/slices/userSlice.ts';

interface Data {
  title: string;
  description: string;
  image: File | null;
}

interface Error {
  [key: string]: string | undefined;
}

const initialData: Data = {
  title: '',
  description: '',
  image: null,
};

const NewPostForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const sending = useAppSelector(selectSending);

  const [data, setData] = useState<Data>(initialData);

  const [error, setError] = useState<Error>({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const getFieldError = (fieldName: string) => {
    try {
      return error[fieldName];
    } catch {
      return undefined;
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === 'title') {
      setError((error) => ({ ...error, title: undefined }));
    }

    if (e.target.name === 'description' || e.target.name === 'image') {
      setError((error) => ({ ...error, description: undefined }));
      setError((error) => ({ ...error, image: undefined }));
    }

    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setError((error) => ({ ...error, description: undefined }));
      setError((error) => ({ ...error, image: undefined }));

      const file = e.target.files[0];
      setData((data) => ({ ...data, [e.target.name]: file }));
    }
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    let exiting = false;

    if (!data.title) {
      setError((error) => ({ ...error, title: 'Title is required.' }));

      exiting = true;
    }

    if (!data.description && !data.image) {
      setError((error) => ({
        ...error,
        description: 'Description, or image, or both are required.',
        image: 'Description, or image, or both are required.',
      }));

      exiting = true;
    }

    if (exiting) {
      return;
    }

    await dispatch(
      sendPost({
        postTitle: data.title,
        postContent: data.description ? data.description : null,
        images: data.image ? data.image : null,
      })
    );

    setData(initialData);

    navigate('/posts');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={2}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          required
          value={data.title}
          onChange={handleChange}
          error={!!getFieldError('title')}
          helperText={getFieldError('title')}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={6}
          value={data.description}
          onChange={handleChange}
          error={!!getFieldError('description')}
          helperText={getFieldError('description')}
        />
        <FileInput
          fullWidth
          label="Image"
          name="image"
          buttonText="Choose file"
          buttonProps={{ startIcon: <CloudUpload /> }}
          onChange={handleFileInputChange}
          error={!!getFieldError('image')}
          helperText={getFieldError('description')}
        />
        <Button type="submit" loading={sending}>
          Create post
        </Button>
      </Stack>
    </form>
  );
};

export default NewPostForm;
