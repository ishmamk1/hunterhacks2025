import React, { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import daedalusImg from '../assets/cs_lounge.jpeg';
import eastLibraryImg from '../assets/east_library.jpg';
import cafeteriaImg from '../assets/cafeteria.jpg';
import westLobbyImg from '../assets/west_lobby.jpg';
import east4thLobbyImg from '../assets/4fl_lobby.jpg';
import east6thLibraryImg from '../assets/6fl_library.jpg';
import dolcianiCenterImg from '../assets/dolciani.jpg';
import studentUnionImg from '../assets/student_union.jpg';
import logo from '../assets/logo-01.png';
import LoadingSpinner from './LoadingSpinner';
import './Home.css';

import {
  Box,
  Container,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  InputAdornment,
} from '@mui/material';
import RoomButtons from './RoomButton';
import RoomInfoCard from './RoomInfoCard';
import SearchIcon from '@mui/icons-material/Search';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChairIcon from '@mui/icons-material/Chair';
import SchoolIcon from '@mui/icons-material/School';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

interface RoomData {
  name: string;
  capacity?: number;
  current_occupancy?: number;
  status?: string;
  image?: string;
}

const SearchTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.1)',
      },
      '&.Mui-focused': {
        boxShadow: '0 4px 30px rgba(155, 93, 229, 0.15)',
      },
    },
  }));

  const FilterChip = styled(Chip)(({ theme }) => ({
    borderRadius: '20px',
    padding: '20px 10px',
    backgroundColor: 'rgba(155, 93, 229, 0.1)',
    border: '2px solid transparent',
    color: '#5f259f',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(155, 93, 229, 0.15)',
      transform: 'translateY(-2px)',
    },
    '&.Mui-selected': {
      backgroundColor: '#9b5de5',
      color: '#ffffff',
      borderColor: '#7b47b3',
      boxShadow: '0 4px 12px rgba(155, 93, 229, 0.2)',
    },
    '& .MuiChip-icon': {
      color: 'inherit',
    },
  }));

  const FILTER_CONFIG = [
    { label: 'Quiet', icon: <AccessTimeIcon />, color: '#4A90E2' },
    { label: 'Whiteboard', icon: <ChairIcon />, color: '#50E3C2' },
    { label: 'Speaking Allowed', icon: <VolumeUpIcon />, color: '#F5A623' },
    { label: 'Eating Allowed', icon: <RestaurantIcon />, color: '#E74C3C' },
    { label: 'Silent Zone', icon: <VolumeOffIcon />, color: '#9B59B6' },
    { label: 'Group Work', icon: <GroupIcon />, color: '#2ECC71' },
    { label: 'Tutoring Zone', icon: <SchoolIcon />, color: '#E67E22' },
  ];

const ROOM_MAP = [
  {
    id: 'daedalus_lounge',
    name: 'Computer Science Lounge',
    floor: '10th Floor',
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
    filters: ['Eating Allowed', 'Speaking Allowed', 'Group Work'],
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
    name: 'East 4th Floor Library',
    floor: '4th Floor',
    image: east4thLobbyImg,
    filters: ['Group Work', 'Whiteboard', 'Speaking Allowed'],
  },
  {
    id: 'east_6th_library',
    name: 'East Library',
    floor: '6th Floor',
    image: east6thLibraryImg,
    filters: ['Speaking Allowed', 'Group Work', 'Whiteboard', 'Eating Allowed'],
  },
  {
    id: 'dolciani_center',
    name: 'Dolciani Center',
    floor: '7th Floor (East)',
    image: dolcianiCenterImg,
    filters: ['Tutoring Zone', 'Whiteboard', 'Group Work'],
  },
  {
    id: 'student_union',
    name: 'Student Union',
    floor: '3rd Floor (Thomas Hunter)',
    image: studentUnionImg,
    filters: ['Group Work', 'Speaking Allowed', 'Eating Allowed'],
  },
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
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f0ff 50%, #e8e0ff 100%)',
      minHeight: '100vh',
      py: 8,
      margin: 0,
      padding: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'auto',
    }}
  >
    <br>
    </br>
    <br>
    </br>
    <br></br>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center',
            mb: 6,
          }}
        >
          <img 
            src={logo} 
            alt="ReadTheRoom Logo" 
            style={{ 
              height: 100,
              marginBottom: '2rem',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }} 
          />

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #2e026d 0%, #9b5de5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.02em',
            }}
          >
            ReadTheRoom
          </Typography>

          {!roomData && (
            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
              <SearchTextField
                fullWidth
                placeholder="Search for rooms..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#9b5de5' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 4 }}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                  mb: 4,
                }}
              >
                {FILTER_CONFIG.map((filter) => (
                  <FilterChip
                    key={filter.label}
                    label={filter.label}
                    icon={filter.icon}
                    onClick={() => {
                      const newFilters = selectedFilters.includes(filter.label)
                        ? selectedFilters.filter(f => f !== filter.label)
                        : [...selectedFilters, filter.label];
                      setSelectedFilters(newFilters);
                    }}
                    className={selectedFilters.includes(filter.label) ? 'Mui-selected' : ''}
                  />
                ))}
              </Box>
            </Box>
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
        </Box>
      </Container>
    </Box>
  );
};


export default Home;
