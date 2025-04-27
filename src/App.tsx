import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

// Import store and components
import { store } from './redux/store';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';

// Create theme (customize as needed)
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Aggiungi qui altre route quando implementi le relative pagine */}
              {/* 
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/artists/:id" element={<ArtistDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/commissions" element={<CommissionsPage />} />
              */}
            </Routes>
          </MainLayout>
        </Router>
        <ToastContainer position="bottom-right" />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
