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

const theme = createTheme();

function Login() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello there");

    setTitleError(false)
    setDetailsError(false)

    if(title === '') {
      setTitleError(true)
    }

    if(details === '') {
      setDetailsError(true)
    }

    if (title && details) {
      console.log(title, details);
    }

    // Need to add the mongodb here?
    fetch(`http://localhost:3001/user/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      }) 
      .then((jsonResponse) => {
        toast.error(jsonResponse.error);
        if (jsonResponse.error) {
          return;
        }

        // store the token into localstorage / cookie
        localStorage.setItem("user_token", jsonResponse.token);
        localStorage.setItem("user_Id", jsonResponse.userId);
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_CENTER,
        });

        navigate("/");
        setTimeout(() => {
          window.location.reload(false);
        }, "1000");

      })
      .catch((err) => {
        console.log(err);

      });
  };

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
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
            <Typography>
                Email Address
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                autoFocus
                inputProps={{ style: { color: "green" } }}
                error={titleError}
              />

            <Typography>
                Password
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
                value={formData.password}
                onChange={handleChange}
                inputProps={{ style: { color: "green" } }}
                error={titleError}
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
              <Grid container sx={{ mb: 5 }}>
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
              <FacebookIcon sx={{ml: 3, mb: 10}}/>
              <GoogleIcon sx={{ml: 3, mb: 10}}/>
              <TwitterIcon sx={{ml:3, mb: 10}} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
