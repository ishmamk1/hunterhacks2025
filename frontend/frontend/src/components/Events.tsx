import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Divider, CircularProgress } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  isLoading: boolean;
}

const EventsPage: React.FC = () => {

  return (
    <></>
  );
};

export default EventsPage;
