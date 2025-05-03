import React from 'react';
import { Box, Container, GlobalStyles } from '@mui/material';
import Navbar from './components/NavBar';
import Home from './components/Home';
import BusyChart from './components/Busy';
import './App.css';

function App() {
  return (
    <>
      {/* Apply global styles to prevent horizontal overscroll and match background */}
      <GlobalStyles
        styles={{
          'html, body, #root': {
            margin: 0,
            padding: 0,
            overscrollBehaviorX: 'none',
            overflowX: 'hidden',
            background: 'linear-gradient(180deg, #ffffff 0%, #f5f0ff 100%)',
          },
        }}
      />

      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            px: { xs: 2, md: 4 },
            pt: 4,
            pb: 4,
          }}
        >
          <Navbar />
          <Home />
          <BusyChart locationName="daedalus_lounge" />
        </Container>
      </Box>
    </>
  );
}

export default App;
