import React, { useState } from 'react';
import { Box, Button, Container, Typography, Card, CardContent } from '@mui/material';

interface RoomData {
    name: string;
    capacity?: number;
    current_occupancy?: number;
    status?: string;
    image?: string;
  }

  const Home: React.FC = () => {
    const [roomData, setRoomData] = useState<RoomData | null>(null);
  
    const handleRoomClick = async (room: string) => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/${room}`);
        const data = await response.json();
        
        console.log('Received image data:', data.image?.slice(0, 100));
        
        setRoomData(data);
      } catch (error) {
        console.error('Error fetching room data:', error);
        setRoomData(null);
      }
    };

  const handleBack = () => {
    setRoomData(null);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Hunter College
      </Typography>
      
      {roomData ? (
        <Card sx={{ mt: 4, p: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {roomData.name}
            </Typography>
            {roomData.image && (
              <Box sx={{ my: 2 }}>
                <img 
                  src={roomData.image} // The image should already be in data:image/jpeg;base64 format
                  alt={`${roomData.name} view`}
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    borderRadius: '4px',
                    marginBottom: '1rem'
                  }} 
                  onError={(e) => {
                    console.error('Error loading image');
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.style.display = 'none';
                  }}
                />
              </Box>
            )}
            {roomData.capacity && (
              <Typography variant="body1">
                Capacity: {roomData.capacity}
              </Typography>
            )}
            {roomData.current_occupancy !== undefined && (
              <Typography variant="body1">
                Current Occupancy: {roomData.current_occupancy}
              </Typography>
            )}
            {roomData.status && (
              <Typography variant="body1">
                Status: {roomData.status}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleBack}
            >
              Back to Rooms
            </Button>
          </CardContent>
        </Card>
      ) : (
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
            onClick={() => handleRoomClick('daedalus_lounge')}
          >
            Daedalus Lounge
          </Button>
          
          <Button 
            variant="contained" 
            size="large"
            sx={{ fontSize: '1.2rem', py: 2 }}
            onClick={() => handleRoomClick('west_lobby')}
          >
            West 3rd
          </Button>
          
          <Button 
            variant="contained" 
            size="large"
            sx={{ fontSize: '1.2rem', py: 2 }}
            onClick={() => handleRoomClick('east_library')}
          >
            East Library
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home;