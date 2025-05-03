import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import BusyChart from './Busy'; // Adjust this path based on your folder structure

interface RoomData {
  name: string;
  capacity?: number;
  current_occupancy?: number;
  status?: string;
  image?: string;
}

interface RoomInfoCardProps {
  roomData: RoomData;
  onBack: () => void;
}

const RoomInfoCard: React.FC<RoomInfoCardProps> = ({ roomData, onBack }) => {
  return (
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
          sx={{ color: '#5f259f', mb: 2, fontWeight: 'bold' }}
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
                borderRadius: '12px',
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

        <Box sx={{ mb: 2 }}>
          {roomData.capacity != null && (
            <Typography variant="body1" sx={{ color: '#333', mb: 0.5 }}>
              <strong>Capacity:</strong> {roomData.capacity}
            </Typography>
          )}

          {roomData.current_occupancy != null && (
            <Typography variant="body1" sx={{ color: '#333', mb: 0.5 }}>
              <strong>Current Occupancy:</strong> {roomData.current_occupancy}
            </Typography>
          )}

          {roomData.status && (
            <Typography variant="body1" sx={{ color: '#333' }}>
              <strong>Status:</strong> {roomData.status}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <BusyChart locationName={roomData.name} />
        </Box>

        <Button
          variant="contained"
          onClick={onBack}
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
  );
};

export default RoomInfoCard;

