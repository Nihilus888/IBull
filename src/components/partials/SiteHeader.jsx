import { Link } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Alert from "@mui/material/Alert";
import { purple } from "@mui/material/colors";
import { fontWeight } from "@mui/system";

const SiteHeader = () => {
  const [profile, setProfile] = useState(null);
  const [profileId, setProfileId] = useState("");
  const [isloggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    let id = localStorage.getItem("user_Id");

    const fetchProfileApi = async () => {
      if (token) {
        setIsLoggedin(true);
        const res = await fetch(`http://localhost:3001/user/profile/${id}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const data = await res.json();
        console.log("data: ", data);
        setProfile(token);
        setProfileId(id);
      } else {
        setIsLoggedin(false);
        return;
      }
    };

    //
    fetchProfileApi();
  });

  // Logout function
  const handleLogout = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("user_token");

    fetch(`http://localhost:3001/user/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("response:", response);
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.error) {
          return;
        }
        //remove JWT token from localstorage and return to home guest login page
        localStorage.clear();
        localStorage.removeItem(token);

        setTimeout(() => {
          setProfile(null);
        }, "500");

        setTimeout(() => {
          window.location.reload(false);
        }, "1000");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loggedIn = [
    <a
      href="https://www.cnbc.com/world/?region=world"
      target="_blank"
      rel="noopener"
      textAlign="center"
      style={{
        color: "white",
        fontWeight: "bold",
      }}
    >
      CNBC
    </a>,

    <Link
      style={{
        textDecoration: "underline",
        color: "white",
        fontWeight: "bold",
      }}
      to={`/watchlist`}
    >
      Watchlist
    </Link>,
  ];

  const loggedOut = [
    <a
      href="https://www.cnbc.com/world/?region=world"
      target="_blank"
      rel="noopener"
      textAlign="center"
      style={{
        color: "white",
        fontWeight: "bold",
      }}
    >
      CNBC
    </a>,

    <Link
      style={{
        textDecoration: "underline",
        color: "white",
        fontWeight: "bold",
      }}
      to="/login"
    >
      Login
    </Link>,
    <Link
      style={{
        textDecoration: "underline",
        color: "white",
        fontWeight: "bold",
      }}
      to="/register"
    >
      Register
    </Link>,
  ];

  const loggedInSettings = [
    //For logged In settings we need a profile route
    <Link
      style={{ textDecoration: "none", color: "black", width: "100%" }}
      to={`/profile/${profileId}`}
    >
      Profile
    </Link>,

    <Link to={{ pathname: "https://www.ft.com/" }} target="_blank">
      Financial Times
    </Link>,

    <Button
      style={{ textDecoration: "none", color: "black" }}
      onClick={handleLogout}
    >
      Logout
    </Button>,
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <AppBar position="static" style={{ backgroundColor: "#00688B" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AttachMoneyIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "white" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 110,
              display: { xs: "none", md: "flex" },
              fontFamily: "Segoe UI Symbol",
              fontWeight: 900,
              fontSize: 25,
              letterSpacing: ".7rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: '"Helvetica Neue"',
                fontWeight: "bold",

              }}
            >
              {" "}
              IBull{" "}
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, mr: 2, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {profile
                ? loggedIn.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        color="black"
                        textDecoration="none"
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))
                : loggedOut.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        color="black"
                        textDecoration="none"
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
          <AttachMoneyIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              fontFamily: '"Helvetica Neue"',
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "underline",
            }}
          >
            IBull
          </Typography>

          <LoginIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "white" }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {profile
              ? loggedIn.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, mr: 6, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))
              : loggedOut.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, mr: 3, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
          </Box>

          {profile ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar sx={{ bgcolor: purple[400] }}>J</Avatar>
                  </StyledBadge>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {loggedInSettings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            ""
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default SiteHeader;
