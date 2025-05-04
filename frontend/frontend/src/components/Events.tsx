import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import logo from '../assets/logo-01.png';

const primaryColor = '#983ca4';

interface Event {
  url: string;
  title: string;
  location: string;
  date: string;
  description: string;
  image_url?: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/events');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <img src={logo} alt="ReadTheRoom Logo" style={{ height: 80 }} />

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${primaryColor}, ${primaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
            }}
          >
            Campus Events
          </Typography>

          <TextField
            placeholder="Search events..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              maxWidth: 600,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f8f5ff',
                borderRadius: 2,
                '& fieldset': {
                  borderColor: primaryColor,
                },
                '&:hover fieldset': {
                  borderColor: primaryColor,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: primaryColor }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', color: primaryColor }} />
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.url}>
                <Card
                  sx={{
                    backgroundColor: '#fafafa',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: 3,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                      '& .event-image': {
                        transform: 'scale(1.05)',
                      },
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.image_url || 'https://source.unsplash.com/random?university'}
                      alt={event.title}
                      className="event-image"
                      sx={{ transition: 'transform 0.3s ease' }}
                    />
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: primaryColor, mb: 1 }}>
                      {event.title}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2, color: '#757575', fontSize: '0.9rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon sx={{ fontSize: '1rem', color: primaryColor }} />
                        <Typography variant="body2">{event.date}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ fontSize: '1rem', color: primaryColor }} />
                        <Typography variant="body2">{event.location}</Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#555',
                        mb: 3,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.description}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      href={event.url}
                      target="_blank"
                      sx={{
                        background: `linear-gradient(45deg, ${primaryColor}, ${primaryColor})`,
                        color: '#fff',
                        py: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                          background: `linear-gradient(45deg, ${primaryColor}, #7a297f)`,
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default EventsPage;
