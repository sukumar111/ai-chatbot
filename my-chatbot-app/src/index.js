import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Import Material UI CircularProgress
import Box from '@mui/material/Box'; // Box for positioning the loader

const root = ReactDOM.createRoot(document.getElementById('root'));

function Root() {
  const [clientId, setClientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Fetch clientId from Spring Boot API
    axios.get('http://localhost:8080/api/client-id')
      .then((response) => {
        setClientId(response.data.clientId); // Set the clientId to state
      })
      .catch((error) => {
        console.error('Error fetching client ID:', error);
      });

    // Set timeout to stop showing loading after 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 5 seconds
    }, 2000);

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Show Material UI CircularProgress as a loading indicator for 5 seconds
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full screen height
        }}
      >
        <CircularProgress /> {/* Material UI Circular Loader */}
      </Box>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId || 'default-client-id'}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
}

root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
