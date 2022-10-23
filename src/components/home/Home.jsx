import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Search from "../Search";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Paper } from "@mui/material";
import Image from "../../components/stockmarket.jpg";
import { Backdrop } from "@mui/material";
import Alert from "@mui/material/Alert";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AppleIcon from "@mui/icons-material/Apple";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//use Paper material UI to get the background image but it does not work
const styles = {
  paperContainer: {
    backgroundImage: `url(${"./beach.png"})`,
  },
};

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

const theme = createTheme();

export default function Home() {
  const navigate = useNavigate();
  const [stock, setStock] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [savedData, setSavedData] = useState([]);

  // To handle save job click event by setting jobId state, triggering useEffect
  const handleSave = (event) => {
    let token = localStorage.getItem("user_token");
    if (token) {
      setJobId({
        id: event.target.value,
      });
    } else {
      navigate("/login");
    }
  };

  // Function to fetch user's saved jobs data
  const fetchSavedData = async () => {
    let token = localStorage.getItem("user_token");
    if (token) {
      const res = await fetch(`http://localhost:3000/jobs/saved`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();

      try {
        setSavedData(data[0].jobId);
      } catch (err) {
        console.log("No saved jobs data present in DB");
      }
    }
  };

  // To fetch search stock data and set into a state to be mapped onto the table
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch("http://localhost:3001/stock/search");
      const data = await res.json();
      console.log('stock data:,', data)

      setStock(data);
    };

    fetchApi();
    setTimeout(() => {
      fetchSavedData();
    }, "1000");
  }, []);

  // POST
  useEffect(() => {
    let token = localStorage.getItem("user_token") || "";

    if (jobId === null) {
      return;
    }

    fetch(`http://localhost:3000/jobs/saved`, {
      method: "POST",
      body: JSON.stringify(jobId),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("response: ", response);
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.error) {
          console.log("jsonResponse.error: ", jsonResponse.error);
          return;
        }

        console.log("Save Successful!", jsonResponse);
      })
      .catch((err) => {
        console.log("err: ", err);
      });

    setTimeout(() => {
      fetchSavedData();
    }, "500");
  }, [jobId]);

  return (
    <Paper style={styles.paperContainer}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              backdropFilter: "blur(3px)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "Cover",
              backgroundImage: `url(${Image})`,
              bgcolor: "text.primary",
              pt: 8,
              pb: 6,
            }}
          >
            <Container
              maxWidth="md"
              align="right"
              display="flex"
              flexDirection="row"
            >
              <Stack direction="row" spacing={15}>
                <Typography
                  component="h5"
                  variant="h5"
                  color="text.primary"
                  mb={3}
                  ml={70}
                  sx={{
                    color: "black",
                  }}
                >
                  Apple:
                </Typography>

                <Typography
                  component="h5"
                  variant="h5"
                  color="text.primary"
                  mb={3}
                  sx={{
                    color: "black",
                  }}
                >
                  Google:
                </Typography>

                <Typography
                  component="h5"
                  variant="h5"
                  color="text.primary"
                  mb={3}
                  sx={{
                    color: "black",
                  }}
                >
                  Tesla:
                </Typography>
              </Stack>
            </Container>

            <Container maxWidth="xl" align="center">
              <AttachMoneyIcon
                sx={{
                  display: { xs: "none", md: "fix" },
                  mr: 1,
                  color: "black",
                }}
              />
              <Typography
                component="h1"
                variant="h2"
                align="left"
                ml="10"
                color="text.primary"
                gutterBottom
                fontWeight="bold"
                mb={5}
              >
                IBull
              </Typography>

              <Typography
                variant="h5"
                align="left"
                color="text.secondary"
                paragraph
                mb={3}
              >
                Stock Viewer to get the necessary stock information that you
                desire
              </Typography>

              <Typography
                variant="h5"
                align="left"
                color="text.secondary"
                paragraph
                mb={16}
              >
                Here you can search, save, buy and sell equities!
              </Typography>

              <Typography
                variant="h8"
                align="center"
                color="text.primary"
                paragraph
                marginTop={10}
              >
                Please use a ticker to search for your stocks
              </Typography>

              <Search sx={{ mt: 10, mb: 3 }} align="center" />

              <Container maxWidth="xl">
                <div>
                  <Typography
                    textDecoration="underline"
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.secondary"
                    fontWeight="bold"
                    mt={5}
                  >
                    Your Selected Stock Information
                  </Typography>
                </div>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Stock Name:</TableCell>
                        <TableCell align="right">Enterprise Value:</TableCell>
                        <TableCell align="right">Forward PE:</TableCell>
                        <TableCell align="right">Profit Margins:</TableCell>
                        <TableCell align="right">Float Shares:</TableCell>
                        <TableCell align="right">Shares Outstanding:</TableCell>
                        <TableCell align="right">Shares Short:</TableCell>
                        <TableCell align="right">Short Ratio:</TableCell>
                        <TableCell align="right">Beta:</TableCell>
                        <TableCell align="right">Price to Book:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stock.map((stocks) => (
                        <TableRow
                          key={stocks.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {stocks.name}
                          </TableCell>
                          <TableCell align="right">{stocks.calories}</TableCell>
                          <TableCell align="right">{stocks.fat}</TableCell>
                          <TableCell align="right">{stocks.carbs}</TableCell>
                          <TableCell align="right">{stocks.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    </Paper>
  );
}
