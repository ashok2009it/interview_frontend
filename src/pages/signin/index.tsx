import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { signIn, SignInBody, SignInResponse } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/authProvider';
import useLoader from '../../hooks/useLoader';
import { useSnackbar } from '../../hooks/useSnackbar';
import { getAPIErrorMessage } from '../../helpers/helper';
import Loader from '../../components/Loader/loader';
import SnackbarComponent from '../../components/Snackbar/Snackbar';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';

const SignIn = () => {
  const [validateOnChange, setValidateOnChange] = useState<boolean>(false);
  const auth = useAuth();
  const { isShowing, showLoader, hideLoader } = useLoader();
  const { isActive, message, type, openSnackBar, handleClose } = useSnackbar();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be valid')
      .required('Email is required'),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])(?=.{8,})/,
        'Min 8 character and one Uppercase, Lowercase, Number and Special Character'
      ),
  });

  const formik: FormikProps<SignInBody> = useFormik<SignInBody>({
    initialValues: initialValues,
    validationSchema: SignInSchema,
    validateOnChange: validateOnChange,
    validateOnBlur: validateOnChange,
    onSubmit: (values) => {
      void LoginUser(values);
    },
  });

  const LoginUser = async (loginBody: SignInBody) => {
    showLoader();
    try {
      const loginResponse: SignInResponse = await signIn(loginBody);
      if (loginResponse.success) {
        openSnackBar(loginResponse.message);
        await auth.signin(loginResponse.token, () => {
          navigate('/dashboard');
        });
      } else {
        hideLoader();
        openSnackBar(loginResponse.message, 5000, 'error');
      }
    } catch (err) {
      hideLoader();
      openSnackBar(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getAPIErrorMessage(err as any),
        5000,
        'error'
      );
    }
  };

  const handleFormikSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidateOnChange(true);
    formik.handleSubmit(e);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const change = (name: string, e: SyntheticEvent) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Loader isShowing={isShowing} hide={hideLoader} allowHide={false} />
      <SnackbarComponent
        isActive={isActive}
        message={message}
        type={type}
        handleClose={handleClose}
      />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form
          autoComplete='off'
          onSubmit={(e) => {
            handleFormikSubmit(e);
          }}
        >
          <Box sx={{ mt: 1 }}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              type={'email'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Email
                      className={`${
                        formik.values.email ? 'text-black' : 'text-gray-primary'
                      }`}
                    />
                  </InputAdornment>
                ),
              }}
              placeholder='E-mail'
              name='email'
              value={formik.values.email}
              onChange={change.bind(null, 'email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock
                      className={
                        formik.values.email ? 'text-black' : 'text-gray-primary'
                      }
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? (
                        <VisibilityOff
                          className={
                            formik.values.email
                              ? 'text-black'
                              : 'text-gray-primary'
                          }
                        />
                      ) : (
                        <Visibility
                          className={
                            formik.values.email
                              ? 'text-black'
                              : 'text-gray-primary'
                          }
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder='Password'
              name='password'
              onChange={change.bind(null, 'password')}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              type={'submit'}
              fullWidth
              variant='contained'
              disabled={!(formik.dirty && formik.isValid)}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        sx={{ mt: 8, mb: 4 }}
      >
        {'Copyright © '}
        <Link color='inherit' target={'_blank'} href='https://google.com/'>
          Interview
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
};

export default SignIn;
