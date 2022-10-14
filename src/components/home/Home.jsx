import * as React from 'react'
import { useState, useEffect } from 'react'
import {createTheme} from '@mui/material'
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/system';
import { Image } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';

//responsive design

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const theme = createTheme();

export default function Home() {
  return (
  <ThemeProvider theme={theme}>
    <Box
          sx={{
            backdropFilter: "blur(3px)",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'Cover',
            backgroundImage: `url(${Image})`,
            bgcolor: 'text.primary',
            pt: 8,
            pb: 6,
          }}
        >
      <Container maxWidth="xl" align="center">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.secondary"
              gutterBottom
              fontWeight='bold'
              mb={5}
            >
              IBull
            </Typography>
      </Container>


    </Box>
  </ThemeProvider>
  )
}