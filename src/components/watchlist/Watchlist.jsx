import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Carousel from "react-multi-carousel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

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

export default function Watchlist() {

    const [watchlist, setWatchlist] = (null)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Typography
          component="h3"
          variant="h3"
          sx={{
            mt: 2,
            mb: 4,
          }}
        >
          My Stock Watchlist
        </Typography>

        <Carousel responsive={responsive}>
          <Card>
              <CardContent>
                  <Typography>
                      Hello there
                  </Typography>
              </CardContent>
          </Card>
        </Carousel>
      </Container>
    </ThemeProvider>
  );
}
