import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Image from "../../components/stockmarket.jpg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from '@mui/material/Alert';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { toast } from "react-toastify";

const styles = {
  paperContainer: {
    backgroundImage: `url(${"./beach.png"})`,
  },
};

const theme = createTheme();

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Forgot() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backdropFilter: "blur(3px)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "Cover",
          backgroundImage: `url(${Image})`,
          bgcolor: "text.primary",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              pt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "black",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              fontWeight="bold"
              color="black"
              fontSize="50"
            >
              Forgot Password?
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
            <Typography>
                Email Address:
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{ style: { color: "green" } }}
              />

            <Typography>
                Password:
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputProps={{ style: { color: "green" } }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container sx={{ mb: 2, ml: 8 }}>
                <Grid item>
                  <Link
                    href="/register"
                    variant="body3"
                    color="primary.light"
                    justifyContent="center"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              <Grid container sx={{ mb: 5, mr: 3, ml: 15 }}>
                <Grid item>
                  <Link
                    href="/forgot"
                    variant="body3"
                    color="primary.dark"
                    justifyContent="center"
                  >
                    {"Forgot password?"}
                  </Link>
                </Grid>
              </Grid>
              
              <FacebookIcon sx={{ml: 0, mb: 10}}/>
              <GoogleIcon sx={{ml: 3, mb: 10}}/>
              <TwitterIcon sx={{ml:3, mb: 10}} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}