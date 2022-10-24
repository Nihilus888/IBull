import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { borders } from '@mui/system';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Search from "../Search";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Paper } from "@mui/material";
import Image from "../../components/stockmarket.jpg";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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
  const [postedJobs, setpostedJobs] = useState([]);
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

  // To fetch posted jobs data and set into a state to be mapped on the carousel
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch("http://localhost:3000/jobs/posted");
      const data = await res.json();

      setpostedJobs(data);
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
              <Typography
                component="h5"
                variant="h5"
                color="text.primary"
                align="center"
                mb={3}
                ml={90}
                sx={{
                  color: "black",
                }}
              >
                Live Prices
              </Typography>
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
                mt={-14}
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
                fontWeight={200}
                paragraph
                textDecoration="underline"
                marginTop={10}
              >
                Please use a ticker to search for your stocks
              </Typography>

              <Search sx={{ mt: 10, mb: 3 , borderColor: 'secondary.main', borderRadius: '50%' }} align="center" />

              <Container maxWidth="xl">
                <div>
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    fontWeight="bold"
                    textDecoration="underline"
                    mt={5}
                  >
                    Our Featured Stocks
                  </Typography>
                </div>

                <TableContainer sx={{ mt: 5 }} component={Paper}>
                  <Table sx={{ minWidth: 650, bgcolor: '#00D100', border: 1, borderColor: 'text.primary'}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell aliign="center">Stock Name:</TableCell>
                        <TableCell align="center">Currency:</TableCell>
                        <TableCell align="center">Enterprise Value:</TableCell>
                        <TableCell align="center">Forward PE:</TableCell>
                        <TableCell align="center">Profit Margins:</TableCell>
                        <TableCell align="center">Float Shares:</TableCell>
                        <TableCell align="center">
                          Shares Outstanding:
                        </TableCell>
                        <TableCell align="center">Shares Short:</TableCell>
                        <TableCell align="center">Short Ratio:</TableCell>
                        <TableCell align="center">Beta:</TableCell>
                        <TableCell align="center">Price to Book:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {searchPass.map((stocks) => ( */}
                      <TableRow
                        // key={Google}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Google
                        </TableCell>
                        <TableCell align="center">USD</TableCell>
                        <TableCell align="center">1.22T</TableCell>
                        <TableCell align="center">17.26</TableCell>
                        <TableCell align="center">25.89%</TableCell>
                        <TableCell align="center">11.36B</TableCell>
                        <TableCell align="center">51.46M</TableCell>
                        <TableCell align="center">51.46M</TableCell>
                        <TableCell align="center">1.77</TableCell>
                        <TableCell align="center">1.1</TableCell>
                        <TableCell align="center">5.18</TableCell>
                      </TableRow>
                      {/* ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TableContainer sx={{ mt: 5 }} component={Paper}>
                  <Table sx={{ minWidth: 650, bgcolor: '#00D100', border: 1, borderColor: 'text.primary'}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell aliign="center">Stock Name:</TableCell>
                        <TableCell align="center">Currency:</TableCell>
                        <TableCell align="center">Enterprise Value:</TableCell>
                        <TableCell align="center">Forward PE:</TableCell>
                        <TableCell align="center">Profit Margins:</TableCell>
                        <TableCell align="center">Float Shares:</TableCell>
                        <TableCell align="center">
                          Shares Outstanding:
                        </TableCell>
                        <TableCell align="center">Shares Short:</TableCell>
                        <TableCell align="center">Short Ratio:</TableCell>
                        <TableCell align="center">Beta:</TableCell>
                        <TableCell align="center">Price to Book:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {searchPass.map((stocks) => ( */}
                      <TableRow
                        // key={Google}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Eli Lilly
                        </TableCell>
                        <TableCell align="center">USD</TableCell>
                        <TableCell align="center">338.04B</TableCell>
                        <TableCell align="center">35.61</TableCell>
                        <TableCell align="center">19.58%</TableCell>
                        <TableCell align="center">948.27M</TableCell>
                        <TableCell align="center">5.75M</TableCell>
                        <TableCell align="center">5.75M</TableCell>
                        <TableCell align="center">1.78</TableCell>
                        <TableCell align="center">0.33</TableCell>
                        <TableCell align="center">37.91</TableCell>
                      </TableRow>
                      {/* ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TableContainer sx={{ mt: 5 }} component={Paper}>
                  <Table sx={{ minWidth: 650, bgcolor: '#00D100', border: 1, borderColor: 'text.primary'}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell aliign="center">Stock Name:</TableCell>
                        <TableCell align="center">Currency:</TableCell>
                        <TableCell align="center">Enterprise Value:</TableCell>
                        <TableCell align="center">Forward PE:</TableCell>
                        <TableCell align="center">Profit Margins:</TableCell>
                        <TableCell align="center">Float Shares:</TableCell>
                        <TableCell align="center">
                          Shares Outstanding:
                        </TableCell>
                        <TableCell align="center">Shares Short:</TableCell>
                        <TableCell align="center">Short Ratio:</TableCell>
                        <TableCell align="center">Beta:</TableCell>
                        <TableCell align="center">Price to Book:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {searchPass.map((stocks) => ( */}
                      <TableRow
                        // key={Google}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Goldman Sachs
                        </TableCell>
                        <TableCell align="center">USD</TableCell>
                        <TableCell align="center">-42.3B</TableCell>
                        <TableCell align="center">8.59</TableCell>
                        <TableCell align="center">29.31%</TableCell>
                        <TableCell align="center">350.83M</TableCell>
                        <TableCell align="center">5.11M</TableCell>
                        <TableCell align="center">5.11M</TableCell>
                        <TableCell align="center">2.6</TableCell>
                        <TableCell align="center">N/A</TableCell>
                        <TableCell align="center">0.96</TableCell>
                      </TableRow>
                      {/* ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={3000} infinite={true} mt={12}>

                  {postedJobs.map((jobs) => (
                    <div>
                      <Card
                      key={jobs._id}
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column', margin: 'normal', backgroundColor:'black', opacity: '0.7', color: 'white', mr: 2, mt: 5, mb: 3, boxShadow: 10}}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>

                          <Typography gutterBottom variant="h3" component="h2" fontWeight='bold'>
                            {jobs.company}
                          </Typography>

                          <Typography gutterBottom variant="h6" component='h2' fontStyle='oblique' fontWeight='bold'>
                            {jobs.title}
                          </Typography>

                          <Typography gutterBottom variant="h7" component='h3' >
                            {jobs.position}
                          </Typography>

                          <Typography fontStyle='italic'>
                          Min: ${jobs.salary_min ? jobs.salary_min : ''}
                          </Typography>

                          <Typography fontStyle='italic'>
                          Max: ${jobs.salary_max ? jobs.salary_max : ''}
                          </Typography>

                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', mb: 2, opacity: 1}}>
                          { savedData.includes(jobs._id) ? 
                          <Button sx={{ mr: 1, opacity: '1'}} key={jobs._id} size="small" variant="contained" color='success' align='justify'>Saved</Button>
                          :
                          <Button sx={{ mr: 1, opacity: '1'}} key={jobs._id} size="small" variant="contained" value={jobs._id} color='info' align='justify' onClick={handleSave}>Save</Button>
                          }
                          <Button sx={{ ml: 1, opacity: '1'}} size="small" variant="contained" color='info' align='justify' href={`/jobs/${jobs._id}/edit`}>View</Button>
                        </CardActions>
                      </Card>
                    </div>
                      ))}
              </Carousel> */}
              </Container>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    </Paper>
  );
}
