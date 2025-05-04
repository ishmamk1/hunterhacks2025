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
  LinearProgress,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WifiIcon from '@mui/icons-material/Wifi';
import PowerIcon from '@mui/icons-material/Power';
import ChairIcon from '@mui/icons-material/Chair';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BusyChart from './Busy';

interface RoomInfoCardProps {
  roomData: {
    name: string;
    location?: string;
    description?: string;
    image?: string;
    filters?: string[];
    permitted_volume?: string;
    current_occupancy?: number;
    capacity?: number;
    computer_access?: boolean;
    status?: string;
  };
  onBack: () => void;
}

const FeatureIcon = ({ type }: { type: string }) => {
  const iconStyle = {
    fontSize: 28,
    color: '#9b5de5',
    backgroundColor: 'rgba(155, 93, 229, 0.1)',
    padding: '12px',
    borderRadius: '12px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(155, 93, 229, 0.2)',
      transform: 'translateY(-2px)',
    }
  };

  switch (type.toLowerCase()) {
    case 'eating allowed': return <RestaurantIcon sx={iconStyle} />;
    case 'speaking allowed': return <VolumeUpIcon sx={iconStyle} />;
    case 'whiteboard': return <ChairIcon sx={iconStyle} />;
    case 'group work': return <GroupIcon sx={iconStyle} />;
    case 'wifi': return <WifiIcon sx={iconStyle} />;
    case 'outlets': return <PowerIcon sx={iconStyle} />;
    default: return <InfoIcon sx={iconStyle} />;
  }
};

const RoomInfoCard: React.FC<RoomInfoCardProps> = ({ roomData, onBack }) => {
  const theme = useTheme();
  const capacity = roomData.capacity || 30;
  const occupied = roomData.current_occupancy ?? 18;
  const occupancyPercent = Math.min(100, Math.round((occupied / capacity) * 100));

  return (
    <Card
      sx={{
        mt: 4,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        boxShadow: '0 20px 40px rgba(155, 93, 229, 0.1)',
        maxWidth: '1400px',
        margin: '0 auto',
        color: '#2e026d',
        border: '1px solid rgba(155, 93, 229, 0.1)',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        {roomData.image && (
          <Box
            sx={{
              width: '100%',
              height: '400px',
              borderRadius: '24px',
              overflow: 'hidden',
              mb: 4,
              boxShadow: '0 12px 24px rgba(155, 93, 229, 0.1)',
            }}
          >
            <Box
              component="img"
              src={roomData.image}
              alt={roomData.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            />
          </Box>
        )}

        <Typography
          variant="h3"
          sx={{
            background: 'linear-gradient(135deg, #2e026d 0%, #9b5de5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            mb: 2
          }}
        >
          {roomData.name}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
          {roomData.location && (
            <Chip
              icon={<LocationOnIcon />}
              label={roomData.location}
              sx={{
                bgcolor: 'rgba(155, 93, 229, 0.1)',
                color: '#2e026d',
                border: '1px solid rgba(155, 93, 229, 0.2)',
                '&:hover': {
                  bgcolor: 'rgba(155, 93, 229, 0.15)',
                },
              }}
            />
          )}
          <Chip
            icon={<GroupIcon />}
            label={`${occupied}/${capacity} occupied`}
            sx={{
              bgcolor: 'rgba(155, 93, 229, 0.1)',
              color: '#2e026d',
              border: '1px solid rgba(155, 93, 229, 0.2)',
              '&:hover': {
                bgcolor: 'rgba(155, 93, 229, 0.15)',
              },
            }}
          />
          {typeof roomData.computer_access === 'boolean' && (
            <Chip
              icon={<ComputerIcon />}
              label={roomData.computer_access ? 'Computer Access' : 'No Computers'}
              sx={{
                bgcolor: 'rgba(155, 93, 229, 0.1)',
                color: '#2e026d',
                border: '1px solid rgba(155, 93, 229, 0.2)',
              }}
            />
          )}
          {roomData.status && (
            <Chip
              icon={roomData.status.toLowerCase() === 'open' ? <CheckCircleIcon /> : <CancelIcon />}
              label={roomData.status}
              sx={{
                bgcolor: roomData.status.toLowerCase() === 'open' ? 'rgba(0, 200, 81, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                color: roomData.status.toLowerCase() === 'open' ? '#00C851' : '#ff4444',
                border: '1px solid rgba(155, 93, 229, 0.2)',
              }}
            />
          )}
        </Stack>

        <Divider sx={{ borderColor: 'rgba(155, 93, 229, 0.1)', mb: 4 }} />

        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '2fr 1fr' }, gap: 4 }}>
          {/* Left Panel */}
          <Box>
            {roomData.description && (
              <Typography variant="body1" sx={{ mb: 4, color: '#4a4a4a', lineHeight: 1.6 }}>
                {roomData.description}
              </Typography>
            )}
            <Typography variant="h6" sx={{ mb: 2, color: '#2e026d', fontWeight: 600 }}>
              Available Features
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
              {roomData.filters?.map((filter, i) => (
                <Tooltip title={filter} key={i}>
                  <IconButton sx={{
                    bgcolor: 'rgba(155, 93, 229, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(155, 93, 229, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}>
                    <FeatureIcon type={filter} />
                  </IconButton>
                </Tooltip>
              ))}
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#2e026d', fontWeight: 600 }}>
                Current Occupancy
              </Typography>
              <LinearProgress
                variant="determinate"
                value={occupancyPercent}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  bgcolor: 'rgba(155, 93, 229, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: occupancyPercent > 80 ? '#ff4444' :
                      occupancyPercent > 50 ? '#ffbb33' : '#00C851',
                  },
                }}
              />
              <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#666' }}>
                {occupancyPercent}% occupied
              </Typography>
            </Box>
          </Box>

          {/* Right Panel */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#2e026d', fontWeight: 600 }}>
              Popular Times
            </Typography>
            <Box sx={{
              bgcolor: 'rgba(155, 93, 229, 0.05)',
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(155, 93, 229, 0.1)',
            }}>
              <BusyChart locationName={roomData.name} />
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={onBack}
          sx={{
            mt: 4,
            bgcolor: '#9b5de5',
            color: '#fff',
            py: 1.5,
            px: 4,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '1.1rem',
            '&:hover': {
              bgcolor: '#8347c3',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(155, 93, 229, 0.3)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Back to Rooms
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoomInfoCard;






