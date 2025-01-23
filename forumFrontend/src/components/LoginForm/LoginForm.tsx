import React, { useState } from 'react';
import { RegisterMutation } from '../../typed';
import { Alert, Avatar, Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Person2Icon from '@mui/icons-material/Person2';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { selectLoginError, selectLoginLoading } from '../../store/slices/userSlice.ts';
import { login } from '../../store/thunks/userThunk.ts';

const initialState = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginError = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);
  const [form, setForm] = useState<RegisterMutation>(initialState);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({...prevState, [name]: value}));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(form)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Person2Icon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {loginError !== null && !loginError.success && (
            <Alert severity={"error"} sx={{mt: 3, width: '100%', justifyContent: 'center'}}>
              {loginError.message.password ? loginError.message.password : loginError.message.username}
            </Alert>
        )}

        <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
          <Grid container direction={'column'} size={12} spacing={2}>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={form.username}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={form.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            loading={loginLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Grid container justifyContent="center">
            <Grid>
              <Link variant="body2" component={NavLink} to='/register'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;