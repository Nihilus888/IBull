import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Carousel from "react-multi-carousel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StockCard from "../stockCard/StockCard";
import Image from "../../components/stockmarket.jpg";
import PieChart from "../chart/PieChart";
import { Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Grid } from "@mui/material";

const theme = createTheme();

const styles = {
  paperContainer: {
    backgroundImage: `url(${"../../components/stockmarket.jpg"})`,
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

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState(null);

  const navigate = useNavigate();

  let token = localStorage.getItem("user_token");
  let id = localStorage.getItem("user_Id");

  useEffect(() => {
    let token = localStorage.getItem("user_token");
    let id = localStorage.getItem("user_Id");

    const fetchSaveData = async () => {
      const res = await fetch(`http://localhost:3001/stock/saved/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();
      console.log("stock data:", data);
      setWatchlist(data);
    };
    fetchSaveData()
  }, []);

  // const handleDelete = (event) => {
  //   event.preventDefault();
  //   let token = localStorage.getItem("user_token");
  //   let id = localStorage.getItem("user_Id");

  //   if (token) {
  //     //retrieves the necessary information when we click on save
  //     setWatchlist({
  //       id: event.target.value,
  //     });
  //     console.log("event.target.value: ", event.target.value);
  //   }
  //   //if there is no token, we cannot let them save it and instead let them navigate to login
  //   else {
  //     navigate("/login");
  //   }
  // };

  // fetch(`http://localhost:3001/stock/saved/${id}`, {
  //   method: "DELETE",
  //   headers: {
  //     "Content-type": "application/json",
  //     Authorization: token,
  //   },
  // })
  //   .then((response) => {
  //     console.log("response: ", response);
  //     return response.json();
  //   })
  //   .then((jsonResponse) => {
  //     if (jsonResponse.error) {
  //       console.log("jsonResponse.error: ", jsonResponse.error);
  //       return;
  //     }
  //     console.log("Delete successful");
  //   })
  //   .catch((err) => {
  //     console.log("err: ", err);
  //   });

  //   const stockCards = watchlist.map((stock) => (<StockCard key={stock._id} data={stock} showViewButton={true}/>))

  return (
    <Paper style={styles.paperContainer}>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            mb: 10,
          }}
        >
          <Typography
            component="h3"
            variant="h3"
            sx={{
              mt: 2,
              mb: 5,
            }}
          >
            My Stock Watchlist
          </Typography>

          <Typography
            component="h6"
            variant="h6"
            sx={{
              mt: 2,
              fontFamily: "initial",
              textDecoration: "underline",
            }}
          >
            Asset Allocation
          </Typography>

          <PieChart sx={{ mt: 5, mb: 10 }} />

          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={3000}
            infinite={true}
            mt={15}
            mb={20}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                margin: "normal",
                backgroundColor: "black",
                opacity: "0.7",
                color: "white",
                mr: 2,
                mt: 5,
                mb: 3,
                boxShadow: 20,
              }}
            >
              <Typography gutterBottom variant="h7" component="h2">
                Hello there
              </Typography>

              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="error"
                sx={{
                  width: "50%",
                  ml: 10,
                  justifyContent: "center",
                }}
                // onClick={handleDelete}
              >
                Delete
              </Button>
            </Card>

            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                margin: "normal",
                backgroundColor: "black",
                opacity: "0.7",
                color: "white",
                mr: 2,
                mt: 5,
                mb: 3,
                boxShadow: 20,
              }}
            >
              <Typography gutterBottom variant="h7" component="h2">
                It is what it is
              </Typography>
            </Card>

            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                margin: "normal",
                backgroundColor: "black",
                opacity: "0.7",
                color: "white",
                mr: 2,
                mt: 5,
                mb: 3,
                boxShadow: 20,
              }}
            >
              <Typography gutterBottom variant="h7" component="h2">
                It do be like that some times
              </Typography>
            </Card>
            {/* {watchlist.map((stock) => (
            <div>
              <Card
                key={stock._id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  margin: "normal",
                  backgroundColor: "black",
                  opacity: "0.7",
                  color: "white",
                  mr: 2,
                  mt: 5,
                  mb: 3,
                  boxShadow: 10,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="h2"
                    fontWeight="bold"
                  >
                    {stock.title}
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    fontStyle="oblique"
                    fontWeight="bold"
                  >
                    {stock.eps}
                  </Typography>

                  <Typography gutterBottom variant="h7" component="h3">
                    {stock.position}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "center", mb: 2, opacity: 1 }}
                >
                  <Button
                    sx={{ mr: 1, opacity: "1" }}
                    key={stock._id}
                    size="small"
                    variant="contained"
                    value={stock._id}
                    color="info"
                    align="justify"
                    onClick={handleDelete}
                  >
                    Save
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))} */}
          </Carousel>
        </Container>
      </ThemeProvider>
    </Paper>
  );
}
