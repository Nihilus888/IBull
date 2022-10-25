import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect,  } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { borders } from "@mui/system";
import { shadows } from "@mui/system";
import LineChart from "./stockView/Line";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    align: 'center'
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    align: 'center'
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    align: 'center'
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    align: 'center'
  },
};

const Search = (props) => {
  const navigate = useNavigate()
  const [searchPass, setSearchPass] = useState(null);
  const [searchData, setSearchData] = useState({
    search: "",
    pg: 1,
  });
  const [stockId, setStockId] = useState(null);

  const handleChange = (e) => {
    setSearchData({
      [e.target.name]: e.target.value,
    });
    console.log(searchData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/stock/search", {
      method: "POST",
      body: JSON.stringify(searchData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log("Search Response: ", response);
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.error) {
          console.log("jsonResponse.error: ", jsonResponse.error);
          return;
        }
        console.log(jsonResponse);
        setSearchPass(jsonResponse);
      });
  };

  // To handle save job click event by setting jobId state, triggering useEffect
  const handleSave = (event) => {
    let token = localStorage.getItem("user_token");
    if (token) {
      setStockId({
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
      const res = await fetch(`http://localhost:3001/stock/saved`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();

      try {
        setSearchData(data[0].jobId);
      } catch (err) {
        console.log("No saved jobs data present in DB");
      }
    }
  };

  // To fetch posted jobs data and set into a state to be mapped on the carousel
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch("http://localhost:300/jobs/posted");
      const data = await res.json();

      setStockId(data);
    };

    fetchApi();
    setTimeout(() => {
      fetchSavedData();
    }, "1000");
  }, []);

  // Save Stock into my watchlist
  useEffect(() => {
    let token = localStorage.getItem("user_token") || "";

    if (stockId === null) {
      return;
    }

    fetch(`http://localhost:3001/stock/saved`, {
      method: "POST",
      body: JSON.stringify(stockId),
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
  }, [stockId]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{ marginTop: 5, paddingBottom: 1, align: "center" }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            width: "50%",
            mb: "100px",
            border: 1,
            borderRadius: "25%",
            borderColor: "grey.500",
            backgroundColor: "primary.main",
            boxShadow: 20,
          }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{
              ml: 5,
              flex: 1,
              flexDirection: "row",
              color: "primary.text",
              fontWeight: "bold",
              alignContent: "center",
              justifyContent: "center",
              align: "center",
              fontSize: 20,
              textTransform:"capitalize",
              fontFamily: "Segoe UI Symbol",
            }}
            placeholder="Search Stocks"
            id="search"
            name="search"
            label="search"
            value={searchData.search}
            onChange={handleChange}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px", color: "primary.text", fontWeight: "bold" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>

      {searchPass ? (
        <Container maxWidth="xl">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.secondary"
            fontWeight="bold"
            mt={4}
            mr={10}
            mb={4}
            ml={5}
            fontStyle="bold"
            sx={{ mr: 1 }}
          >
            {searchPass ? "Your Search Results" : ""}
          </Typography>
          <Carousel responsive={responsive} ml={100} align="center">
            {/* {searchPass ? searchPass.map((stock) => ( */}
            <Card
              key={searchPass[0]}
              sx={{
                height: "100%",
                width: "auto",
                display: "flex",
                flexDirection: "column",
                margin: "normal",
                mr: 2,
                alignContent: "center",
                backgroundColor: "#37FDFC",
                opacity: "0.6",
                color: "black",
              }}
            >
              <CardContent sx={{ flexGrow: 1, variant: "outlined", mr: 2 }}>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  fontWeight="bold"
                  display="inline-flex"
                >
                  Name: {searchPass[0]}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  Currency: {searchPass[1]}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="h4"
                  lineheight={2}
                >
                  Enterprise Value: {searchPass[2]}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  fontWeight="medium"
                  fontStyle="italic"
                >
                  Forward PE: {searchPass[3]}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  fontWeight="medium"
                  fontStyle="italic"
                >
                  Profit Margins: {searchPass[4]}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", mb: 2 }}>
                <Button
                  sx={{ mr: 1, opacity: "1" }}
                  key={searchPass[0]}
                  value={searchPass[0]}
                  size="small"
                  variant="contained"
                  color="error"
                  align="center"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  size="small"
                  variant="contained"
                  color="error"
                  align="center"
                  href={`${searchPass.link}`}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Carousel>

          <LineChart data={searchPass[11]}/>

          <TableContainer sx={{ mt: 5 }} component={Paper}>
            <Table
              sx={{ minWidth: 650, bgcolor: "grey", color: "white" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell aliign="center">Stock Name</TableCell>
                  <TableCell align="center">Currency:</TableCell>
                  <TableCell align="center">Enterprise Value:</TableCell>
                  <TableCell align="center">Forward PE:</TableCell>
                  <TableCell align="center">Profit Margins:</TableCell>
                  <TableCell align="center">Float Shares:</TableCell>
                  <TableCell align="center">Shares Outstanding:</TableCell>
                  <TableCell align="center">Shares Short:</TableCell>
                  <TableCell align="center">Short Ratio:</TableCell>
                  <TableCell align="center">Beta:</TableCell>
                  <TableCell align="center">Price to Book:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {searchPass.map((stocks) => ( */}
                <TableRow
                  key={searchPass[0]}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {searchPass[0]}
                  </TableCell>
                  <TableCell align="center">{searchPass[1]}</TableCell>
                  <TableCell align="center">{searchPass[2]}</TableCell>
                  <TableCell align="center">{searchPass[3]}</TableCell>
                  <TableCell align="center">{searchPass[4]}</TableCell>
                  <TableCell align="center">{searchPass[5]}</TableCell>
                  <TableCell align="center">{searchPass[6]}</TableCell>
                  <TableCell align="center">{searchPass[7]}</TableCell>
                  <TableCell align="center">{searchPass[8]}</TableCell>
                  <TableCell align="center">{searchPass[9]}</TableCell>
                  <TableCell align="center">{searchPass[10]}</TableCell>
                </TableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <Container maxWidth="s">
          <Line
            datasetIdKey="id"
            data={{
              labels: ["Jun", "Jul", "Aug"],
              datasets: [
                {
                  id: 1,
                  label: "",
                  data: [5, 6, 7],
                },
                {
                  id: 2,
                  label: "",
                  data: [3, 2, 1],
                },
              ],
            }}
          />
          </Container> */}
        </Container>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
};

export default Search;
