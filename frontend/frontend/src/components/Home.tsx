import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import RoomButtons from './RoomButton';

interface RoomData {
  name: string;
  capacity?: number;
  current_occupancy?: number;
  status?: string;
  image?: string;
}

const ROOM_MAP = [
  { id: 'daedalus_lounge', name: 'Daedalus Lounge', floor: '3rd Floor' },
  { id: 'east_library', name: 'East Library', floor: '2nd Floor' },
  { id: 'west_lobby', name: 'West 3rd Floor Lobby', floor: '3rd Floor' },
];

const Home: React.FC = () => {
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = useMemo(
    () =>
      ROOM_MAP.filter((room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const handleRoomClick = async (room: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/${room}`);
      const data = await response.json();
      setRoomData(data);
    } catch (error) {
      console.error('Error fetching room data:', error);
      setRoomData(null);
    }
  };

  const handleBack = () => setRoomData(null);

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f5f0ff 100%)',
        minHeight: '100vh',
        py: 8,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#2e026d',
            mb: 4,
          }}
        >
          Welcome to Hunter College
        </Typography>

        {!roomData && (
          <TextField
            fullWidth
            label="Search rooms…"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 4,
              backgroundColor: '#f8f5ff',
              borderRadius: 2,
              input: { color: '#2e026d' },
              fieldset: { borderColor: '#9b5de5' },
              '&:hover fieldset': { borderColor: '#9b5de5' },
              '&.Mui-focused fieldset': { borderColor: '#5f259f' },
            }}
            autoComplete="off"
          />
        )}

        {roomData ? (
          <Card
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: '#ffffff',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(155, 93, 229, 0.1)',
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: '#5f259f', mb: 2 }}
              >
                {roomData.name}
              </Typography>
              {roomData.image && (
                <Box sx={{ my: 2 }}>
                  <img
                    src={roomData.image}
                    alt={`${roomData.name} view`}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      boxShadow: '0 4px 12px rgba(155, 93, 229, 0.15)',
                    }}
                    onError={(e) => {
                      console.error('Error loading image');
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </Box>
              )}
              {roomData.capacity != null && (
                <Typography variant="body1" sx={{ color: '#333', mb: 1 }}>
                  Capacity: {roomData.capacity}
                </Typography>
              )}
              {roomData.current_occupancy != null && (
                <Typography variant="body1" sx={{ color: '#333', mb: 1 }}>
                  Current Occupancy: {roomData.current_occupancy}
                </Typography>
              )}
              {roomData.status && (
                <Typography variant="body1" sx={{ color: '#333', mb: 2 }}>
                  Status: {roomData.status}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleBack}
                sx={{
                  mt: 2,
                  background: 'linear-gradient(45deg, #9b5de5 20%, #ffffff 80%)',
                  color: '#2e026d',
                  boxShadow: '0 4px 10px rgba(155, 93, 229, 0.2)',
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #8c40d6 20%, #f2edff 80%)',
                  },
                }}
              >
                Back to Rooms
              </Button>
            </CardContent>
          </Card>
        ) : (
          <RoomButtons
            rooms={filteredRooms}
            onRoomClick={handleRoomClick}
            searchTerm={searchTerm}
          />
        )}
      </Container>
    </Box>
  );
};

export default Home;
