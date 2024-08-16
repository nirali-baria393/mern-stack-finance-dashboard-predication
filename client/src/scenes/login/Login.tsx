import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { tokens } from '@/theme';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign up

  const theme = useTheme();

  const handleLogin = () => {
    // Handle login logic
    console.log('Login:', { email, password });
  };

  const handleSignUp = () => {
    // Handle sign up logic
    console.log('Sign Up:', { email, password });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor={theme.palette.background.default}
    >
      <Box
        bgcolor={tokens.background.light}
        p={4}
        borderRadius={2}
        boxShadow={3}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          color={theme.palette.primary.light}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          InputLabelProps={{
            style: { color: theme.palette.grey[300] },
          }}
          InputProps={{
            style: { color: theme.palette.grey[100] },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.light,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.light,
              },
            },
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
          InputLabelProps={{
            style: { color: theme.palette.grey[300] },
          }}
          InputProps={{
            style: { color: theme.palette.grey[100] },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.light,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.light,
              },
            },
          }}
        />

        {isSignUp && (
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            margin="normal"
            fullWidth
            InputLabelProps={{
              style: { color: theme.palette.grey[300] },
            }}
            InputProps={{
              style: { color: theme.palette.grey[100] },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.light,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.light,
                },
              },
            }}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={isSignUp ? handleSignUp : handleLogin}
          style={{ marginTop: '20px' }}
          sx={{
            background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
            color: theme.palette.grey[100],
            '&:hover': {
              background: `linear-gradient(90deg, ${theme.palette.secondary.light} 0%, ${theme.palette.tertiary.light} 100%)`,
            },
          }}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>

        <Button
          variant="text"
          color="primary"
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ marginTop: '10px' }}
          sx={{ color: theme.palette.primary.light }}
        >
          {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
