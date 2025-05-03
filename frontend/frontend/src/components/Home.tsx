import React, { useState, useMemo } from 'react';
import daedalusImg from '../assets/dae.png';
import eastLibraryImg from '../assets/east.png';
import westLobbyImg from '../assets/west.png';

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
import RoomInfoCard from './RoomInfoCard';

interface RoomData {
  name: string;
  capacity?: number;
  current_occupancy?: number;
  status?: string;
  image?: string;
}

const ROOM_MAP = [
    {
      id: 'daedalus_lounge',
      name: 'Daedalus Lounge',
      floor: '3rd Floor',
      image: daedalusImg,
    },
    {
      id: 'east_library',
      name: 'East Library',
      floor: '3rd Floor',
      image: daedalusImg,
    },
    {
      id: 'cafeteria',
      name: 'Cafeteria',
      floor: '3rd Floor',
      image: daedalusImg,
    },
    {
      id: 'west_lobby',
      name: 'West 3rd Floor Lobby',
      floor: '3rd Floor',
      image: daedalusImg,
    },
    {
      id: 'east_4th_lobby',
      name: 'East 4th Floor Lobby',
      floor: '4th Floor',
      image: daedalusImg,
    },
    {
      id: 'east_6th_library',
      name: 'East Library',
      floor: '6th Floor',
      image: daedalusImg,
    },
    {
      id: 'dolciani_center',
      name: 'Dolciani Center',
      floor: '7th Floor (East)',
      image: daedalusImg,
    },
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
          <RoomInfoCard roomData={roomData} onBack={handleBack} />
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
