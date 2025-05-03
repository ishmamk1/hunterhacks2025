import React, { useState, useMemo } from 'react';
import daedalusImg from '../assets/daedalus.jpg';
import eastLibraryImg from '../assets/east_library.jpg';
import cafeteriaImg from '../assets/cafeteria.jpg';
import westLobbyImg from '../assets/west_lobby.jpg';
import east4thLobbyImg from '../assets/4fl_lobby.jpg';
import east6thLibraryImg from '../assets/6fl_library.jpg';
import dolcianiCenterImg from '../assets/dolciani.jpg';
import studentUnionImg from '../assets/student_union.jpg';
import LoadingSpinner from './LoadingSpinner';
import './Home.css';

import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
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

const FILTER_OPTIONS = [
  'Quiet',
  'Whiteboard',
  'Speaking Allowed',
  'Eating Allowed',
  'Silent Zone',
  'Group Work',
  'Tutoring Zone',
];

const ROOM_MAP = [
  {
    id: 'daedalus_lounge',
    name: 'Daedalus Lounge',
    floor: '3rd Floor',
    image: daedalusImg,
    filters: ['Whiteboard', 'Speaking Allowed', 'Group Work'],
  },
  {
    id: 'east_library',
    name: 'East Library',
    floor: '3rd Floor',
    image: eastLibraryImg,
    filters: ['Quiet', 'Silent Zone'],
  },
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    floor: '3rd Floor',
    image: cafeteriaImg,
    filters: ['Eating Allowed', 'Speaking Allowed'],
  },
  {
    id: 'west_lobby',
    name: 'West 3rd Floor Lobby',
    floor: '3rd Floor',
    image: westLobbyImg,
    filters: ['Group Work', 'Speaking Allowed'],
  },
  {
    id: 'east_4th_lobby',
    name: 'East 4th Floor Lobby',
    floor: '4th Floor',
    image: east4thLobbyImg,
    filters: ['Group Work', 'Whiteboard'],
  },
  {
    id: 'east_6th_library',
    name: 'East Library',
    floor: '6th Floor',
    image: east6thLibraryImg,
    filters: ['Speaking Allowed'],
  },
  {
    id: 'dolciani_center',
    name: 'Dolciani Center',
    floor: '7th Floor (East)',
    image: dolcianiCenterImg,
    filters: ['Tutoring Zone', 'Whiteboard'],
  },
  {
    id: 'student_union',
    name: 'Student Union',
    floor: '3rd Floor (Thomas Hunter)',
    image: studentUnionImg,
    filters: ['Group Work', 'Speaking Allowed', 'Eating Allowed'],
  }
];


  


const Home: React.FC = () => {
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredRooms = useMemo(() => {
    return ROOM_MAP.filter((room) => {
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.every((filter) => room.filters.includes(filter));
      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, selectedFilters]);

  const handleRoomClick = async (room: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5001/${room}`);
      const data = await response.json();
      setRoomData(data);
    } catch (error) {
      console.error('Error fetching room data:', error);
      setRoomData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setRoomData(null);

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilters: string[]
  ) => {
    setSelectedFilters(newFilters);
  };

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
          <>
            <TextField
              fullWidth
              label="Search rooms…"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                mb: 3,
                backgroundColor: '#f8f5ff',
                borderRadius: 2,
                input: { color: '#2e026d' },
                fieldset: { borderColor: '#9b5de5' },
                '&:hover fieldset': { borderColor: '#9b5de5' },
                '&.Mui-focused fieldset': { borderColor: '#5f259f' },
              }}
              autoComplete="off"
            />

            <ToggleButtonGroup
              value={selectedFilters}
              onChange={handleFilterChange}
              aria-label="room filters"
              sx={{
                flexWrap: 'wrap',
                gap: 1,
                mb: 4,
                justifyContent: 'center',
              }}
            >
              {FILTER_OPTIONS.map((filter) => (
                <ToggleButton
                  key={filter}
                  value={filter}
                  aria-label={filter}
                  sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    borderColor: '#9b5de5',
                    color: '#5f259f',
                    '&.Mui-selected': {
                      backgroundColor: '#e0d4fa',
                      color: '#5f259f',
                    },
                  }}
                >
                  {filter}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </>
        )}

    <div className="home-container">
      {roomData ? (
        <RoomInfoCard roomData={roomData} onBack={handleBack} />
      ) : (
        <RoomButtons
          rooms={filteredRooms}
          onRoomClick={handleRoomClick}
          searchTerm={searchTerm}
        />
      )}

      {loading && (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      )}
    </div>

      </Container>
    </Box>
  );
};

export default Home;

