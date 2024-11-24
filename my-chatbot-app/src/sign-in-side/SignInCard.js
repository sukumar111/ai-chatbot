import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, SitemarkIcon } from './CustomIcons';
import { useGoogleLogin } from '@react-oauth/google'; 
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useEffect } from 'react';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
    setSuccessSnackbarOpen(false);
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
    navigate('/chatbot');
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginError,
  });

  const handleLinkedInSignIn = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/oauth/linkedin');
      const oauthUrl = await response.text();
      window.location.href = oauthUrl;
    } catch (error) {
      console.error('Error fetching LinkedIn OAuth URL:', error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    if (!code) {
      navigate('/signin');
    } else {
      console.log('LinkedIn Authorization Code:', code);
      navigate('/chatbot');
    }
  }, [location, navigate]);

  const validateInputs = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateInputs()) return;
  
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
  
      const contentType = response.headers.get("content-type");
  
      if (!response.ok) {
        const result = contentType && contentType.includes("application/json")
          ? await response.json()
          : { status: await response.text() };
  
        throw new Error(result.status || "Login failed");
      }
  
      const result = contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();
  
      // Store the email in sessionStorage for later use in Chatbot component
      sessionStorage.setItem("userEmail", result.email);
      console.log('User logged in successfully:', result);
  
      // Display success message
      const successMessage = result.status || "Login successful. Redirecting...";
      setSnackbarMessage(successMessage);
      setSuccessSnackbarOpen(true);
  
      // Delay navigation to show success message briefly
      setTimeout(() => {
        navigate('/chatbot');
      }, 1000); // 1-second delay
  
    } catch (error) {
      const errorMessage = error.message;
      console.error('Error:', errorMessage);
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            sx={{ ariaLabel: 'email' }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: 'baseline' }}>
              Reset your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained">     
          Sign in
        </Button>

        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
            <Link component="span" variant="body2">
              Sign up
            </Link>
          </RouterLink>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => googleLogin()}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleLinkedInSignIn}
          startIcon={<LinkedInIcon />}
        >
          Sign in with LinkedIn
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert severity="error" onClose={handleSnackbarClose} elevation={6} variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert severity="success" onClose={handleSnackbarClose} elevation={6} variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Card>
  );
}
