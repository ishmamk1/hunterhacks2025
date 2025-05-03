import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from '@mui/material';

interface Room {
  id: string;
  name: string;
  floor: string;
  image?: string; // ✅ Add image to Room interface
}

interface RoomButtonsProps {
  rooms: Room[];
  onRoomClick: (roomId: string) => void;
  searchTerm: string;
}

const RoomButtons: React.FC<RoomButtonsProps> = ({
  rooms,
  onRoomClick,
  searchTerm,
}) => {
  const getRandomStatus = () => (Math.random() > 0.5 ? 'Open' : 'Closed');

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 4,
        mt: 4,
      }}
    >
      {rooms.map((room) => {
        const status = getRandomStatus();
        const isOpen = status === 'Open';

        return (
          <Card
            key={room.id}
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(155, 93, 229, 0.15)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.03)',
              },
              cursor: 'pointer',
              background: 'linear-gradient(180deg, #f8f5ff 0%, #ffffff 100%)',
            }}
            onClick={() => onRoomClick(room.id)}
          >
            <CardMedia
              component="img"
              height="160"
              image={
                room.image ||
                'https://source.unsplash.com/featured/?room,study,library'
              } // ✅ Use specific image or fallback
              alt={`${room.name} thumbnail`}
              sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: '#2e026d' }}
              >
                {room.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {room.floor}
              </Typography>
              <Chip
                label={status}
                color={isOpen ? 'success' : 'error'}
                sx={{ mt: 1, fontWeight: 500 }}
              />
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default RoomButtons;
