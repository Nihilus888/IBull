import * as React from "react";
import { useState, useEffect } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FaceIcon from "@mui/icons-material/Face";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Image from "../../components/stockmarket.jpg";

const theme = Theme();

function News(props) {
  const navigate = useNavigate();
  const params = useParams();

  //set the news state
  const [news, SetNews] = useState(null);

  let token = localStorage.getItem("user_token");

  useEffect(() => {
    const fetchApi = async () => {
      //get the news api call from the backend
      const res = await fetch("", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      });
      const newsData = await res.json();
      setNews(newsData);
    };

    fetchApi();
  }, [params]);
}
