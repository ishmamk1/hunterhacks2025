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
  };
  onBack: () => void;
}

const FeatureIcon = ({ type }: { type: string }) => {
  const theme = useTheme();
  const iconStyle = { fontSize: 24, color: theme.palette.primary.main };
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
        backgroundColor: '#1a1a1a',
        borderRadius: 4,
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        maxWidth: '1400px',
        margin: '0 auto',
        color: '#fff',
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        {/* Photo Section */}
        {roomData.image && (
          <Box
            sx={{
              width: '100%',
              height: '300px',
              borderRadius: '16px',
              overflow: 'hidden',
              mb: 4,
            }}
          >
            <Box
              component="img"
              src={roomData.image}
              alt={roomData.name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}

        {/* Title & Chips */}
        <Typography
          variant="h3"
          sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}
        >
          {roomData.name}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          {roomData.location && (
            <Chip
              icon={<LocationOnIcon />}
              label={roomData.location}
              sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' }}
            />
          )}
          <Chip
            icon={<GroupIcon />}
            label={`${occupied}/${capacity} occupied`}
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          />
          {roomData.permitted_volume && (
            <Chip
              icon={<VolumeUpIcon />}
              label={roomData.permitted_volume}
              sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' }}
            />
          )}
        </Stack>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 4 }} />

        {/* Main Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '2fr 1fr' }, gap: 4 }}>
          {/* Left Panel */}
          <Box>
            {roomData.description && (
              <Typography variant="body1" sx={{ mb: 4, color: '#ccc' }}>
                {roomData.description}
              </Typography>
            )}
            <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
              Available Features
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
              {roomData.filters?.map((filter, i) => (
                <Tooltip title={filter} key={i}>
                  <span>
                    <FeatureIcon type={filter} />
                  </span>
                </Tooltip>
              ))}
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
                Current Occupancy
              </Typography>
              <LinearProgress
                variant="determinate"
                value={occupancyPercent}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor:
                      occupancyPercent > 80
                        ? '#ff4444'
                        : occupancyPercent > 50
                        ? '#ffbb33'
                        : '#00C851',
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{ mt: 1, display: 'block', color: '#ccc' }}
              >
                {occupancyPercent}% occupied
              </Typography>
            </Box>
          </Box>

          {/* Right Panel */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
              Popular Times
            </Typography>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 2, borderRadius: 2 }}>
              <BusyChart locationName={roomData.name} />
            </Box>
          </Box>
        </Box>

        {/* Back */}
        <Button
          variant="contained"
          onClick={onBack}
          sx={{
            mt: 4,
            bgcolor: theme.palette.primary.main,
            color: '#fff',
            py: 1.5,
            px: 4,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '1.1rem',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
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






