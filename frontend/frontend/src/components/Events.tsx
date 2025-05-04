import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import RoomButtons from './RoomButton';
import logo from '../assets/logo-01.png';

import AIClub from '../assets/events_img/club.png';
import Finals from '../assets/events_img/finalexams.jpg';
import GameDev from '../assets/events_img/gamedev.jpg';

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  image?: string;
}

const mockEvents: Event[] = [
  {
    id: 'event_001',
    title: 'AI Club Kickoff',
    location: 'Room 1001, East Building',
    date: 'May 10, 2025',
    description: 'Learn about AI, meet other techies, and grab some pizza!',
    image: AIClub,
  },
  {
    id: 'event_002',
    title: 'Game Dev Jam',
    location: 'Library 6th Floor',
    date: 'May 12, 2025',
    description: 'Make a game in 48 hours — solo or squad!',
    image: Finals,
  },
  {
    id: 'event_003',
    title: 'Finals Study Bash',
    location: 'Student Union',
    date: 'May 15, 2025',
    description: 'Caffeine + quiet + community = finals survival.',
    image: GameDev,
  },
  {
    id: 'event_001',
    title: 'AI Club Kickoff',
    location: 'Room 1001, East Building',
    date: 'May 10, 2025',
    description: 'Learn about AI, meet other techies, and grab some pizza!',
    image: AIClub,
  },
  {
    id: 'event_002',
    title: 'Game Dev Jam',
    location: 'Library 6th Floor',
    date: 'May 12, 2025',
    description: 'Make a game in 48 hours — solo or squad!',
    image: Finals,
  },
  {
    id: 'event_003',
    title: 'Finals Study Bash',
    location: 'Student Union',
    date: 'May 15, 2025',
    description: 'Caffeine + quiet + community = finals survival.',
    image: GameDev,
  },
  {
    id: 'event_001',
    title: 'AI Club Kickoff',
    location: 'Room 1001, East Building',
    date: 'May 10, 2025',
    description: 'Learn about AI, meet other techies, and grab some pizza!',
    image: AIClub,
  },
  {
    id: 'event_002',
    title: 'Game Dev Jam',
    location: 'Library 6th Floor',
    date: 'May 12, 2025',
    description: 'Make a game in 48 hours — solo or squad!',
    image: Finals,
  },
  {
    id: 'event_003',
    title: 'Finals Study Bash',
    location: 'Student Union',
    date: 'May 15, 2025',
    description: 'Caffeine + quiet + community = finals survival.',
    image: GameDev,
  },
];

const EventsPage: React.FC = () => {
  const [loading, setLoading] = useState(false); // Set to true if fetching
  const [searchTerm, setSearchTerm] = useState('');

  const eventAsRooms = mockEvents.map((event) => ({
    id: event.id,
    name: event.title,
    floor: `${event.date} — ${event.location}`,
    image: event.image,
  }));

  const handleEventClick = (eventId: string) => {
    alert(`Clicked on event: ${eventId}`);
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
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <img src={logo} alt="ReadTheRoom Logo" style={{ height: 80 }} />
        </Box>

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
          Campus Events
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <RoomButtons
            rooms={eventAsRooms}
            onRoomClick={handleEventClick}
            searchTerm={searchTerm}
          />
        )}
      </Container>
    </Box>
  );
};

export default EventsPage;
