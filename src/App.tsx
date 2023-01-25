import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes';
import { AuthProvider } from './provider/authProvider';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme();

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
