import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function Copyright() {
  return (
    <Typography variant="body2" color="white" fontFamily="Helvetica Neue">
      {'Copyright © '}
      <Link color="inherit" href="/" variant='body2' fontFamily="Arial">
      <AttachMoneyIcon 
      sx={{
        width: '2.5%',
        height: '2%'
      }}
      />
        IBull
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     minHeight: '100vh',
    //   }}
    >
      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 5,
          px: 3,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? '#708090'
              : '#708090',
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}