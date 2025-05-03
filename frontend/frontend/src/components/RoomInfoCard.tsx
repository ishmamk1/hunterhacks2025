import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import BusyChart from './Busy'; // Adjust path as needed

interface RoomData {
  name: string;
  description?: string;
  capacity?: number;
  current_occupancy?: number;
  status?: string;
  image?: string;
  computer_access?: boolean;
  location?: string;
  permitted_volume?: string;
  filters?: string[];
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

        {roomData.description && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ color: '#333', display: 'flex', alignItems: 'center' }}>
              <InfoIcon sx={{ mr: 1 }} /> {roomData.description}
            </Typography>
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
            <Chip
              label={roomData.status}
              color="success"
              sx={{
                mt: 1,
                backgroundColor: '#d1ffe0',
                color: '#2e7d32',
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1} sx={{ mb: 2 }}>
          {roomData.computer_access !== undefined && (
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: '#444' }}>
              <ComputerIcon sx={{ mr: 1 }} />
              {roomData.computer_access ? 'Computer Access Available' : 'No Computer Access'}
            </Typography>
          )}

          {roomData.location && (
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: '#444' }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              {roomData.location}
            </Typography>
          )}

          {roomData.permitted_volume && (
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: '#444' }}>
              <VolumeUpIcon sx={{ mr: 1 }} />
              Volume Level: {roomData.permitted_volume}
            </Typography>
          )}
        </Stack>

        {roomData.filters && roomData.filters.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Features:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {roomData.filters.map((filter, index) => (
                <Chip
                  key={index}
                  label={filter}
                  variant="outlined"
                  sx={{
                    borderColor: '#9b5de5',
                    color: '#5f259f',
                    fontWeight: '500',
                    backgroundColor: '#f3e8ff',
                  }}
                />
              ))}
            </Box>
          </>
        )}

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


