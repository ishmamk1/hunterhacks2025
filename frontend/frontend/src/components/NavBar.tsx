import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, GlobalStyles } from '@mui/material';

export default function NavBar() {
  return (
    <>
      {/* Ensure no horizontal scroll */}
      <GlobalStyles
        styles={{
          'html, body, #root': {
            margin: 0,
            padding: 0,
            overflowX: 'hidden',
          },
        }}
      />

      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Left: About Us */}
          <Button
            variant="text"
            sx={{
              color: '#5f259f',
              fontWeight: 600,
              textTransform: 'none',
            }}
            href="/about"
          >
            About Us
          </Button>

          {/* Center: Logo/Text */}
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                color: '#2e026d',
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': { opacity: 0.8 },
              }}
            >
              app
            </Typography>
          </Box>

          {/* Right: GitHub Button using provided markup */}
          <a href="https://github.com/ishmamk1/hunterhack2025">
            <button className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </button>
          </a>
        </Toolbar>
      </AppBar>
    </>
  );
}
