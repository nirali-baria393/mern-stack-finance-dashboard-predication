import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './scenes/navbar';
import Dashboard from './scenes/dashboard';
import Predictions from './scenes/predications';
import Login from './scenes/login/Login';
import SignUp from './scenes/signup/Signup';
function App() {
  const theme = useMemo(() => createTheme(themeSettings), [themeSettings]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/predications" element={<Predictions/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
