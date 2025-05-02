import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Hunter College
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3,
        mt: 4 
      }}>
        <Button 
          variant="contained" 
          size="large"
          sx={{ fontSize: '1.2rem', py: 2 }}
        >
          Daedalus Lounge
        </Button>
        
        <Button 
          variant="contained" 
          size="large"
          sx={{ fontSize: '1.2rem', py: 2 }}
        >
          West 3rd
        </Button>
        
        <Button 
          variant="contained" 
          size="large"
          sx={{ fontSize: '1.2rem', py: 2 }}
        >
          East Library
        </Button>
      </Box>
    </Container>
  );
};

export default Home;