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
import { toast } from "react-toastify";
import { fontSize } from "@mui/system";

const theme = createTheme();

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
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
  const [stockId, setStockId] = useState(null);

  const navigate = useNavigate();


  let token = localStorage.getItem("user_token");
  let id = localStorage.getItem("user_Id");

  useEffect(() => {
    let token = localStorage.getItem("user_token");
    let id = localStorage.getItem("user_Id");

    const fetchSaveData = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/stock/saved/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();
      console.log("stock data:", data[0].stockId);
      setWatchlist(data[0].stockId);
    };
    fetchSaveData();
  }, []);

  const handleDelete = (event, id) => {
    event.preventDefault();

    console.log('stock: ', id)

    let token = localStorage.getItem("user_token");
    let user_id = localStorage.getItem("user_Id");

      // if (token) {
      //   //retrieves the necessary information when we click on delete
      //   setStockId({
      //     id: id,
      //   });
      //   console.log("event.target.id: ", id);
      // }
      // //if there is no token, we cannot let them save it and instead let them navigate to login
      // else {
      //   navigate("/login");
      // }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/stock/saved/${user_id}`, {
      method: "DELETE",
      body: JSON.parse(id),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("response: ", response);
        console.log(response.json())
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.error) {
          toast.error("Unable to Delete", {
            theme: "colored"
          })
          console.log("jsonResponse.error: ", jsonResponse.error);
          return;
        }
        console.log("Delete successful");
      })
      .catch((err) => {
        console.log("err: ", err);
      });
      toast.info("Delete successful", {
        theme: "colored",
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    console.log("Delete successful");
  };

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

          {watchlist
            ? watchlist.map((stock, index) => (
                <Card
                  key={index}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    margin: "normal",
                    backgroundColor: "#00688B",
                    opacity: "0.8",
                    color: "white",
                    mr: 2,
                    mt: 5,
                    mb: 3,
                    boxShadow: 20,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, variant: "outlined", mr: 2 }}>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="h2"
                      fontWeight="bold"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent='center'
                      sx={{
                        ml: 3
                      }}
                    >
                      Name: {stock}
                    </Typography>

                    <Button
                      sx={{
                        mt: 10,
                        ml: -20,
                      }}
                      size="small"
                      variant="contained"
                      color="error"
                      align="center"
                      justifyContent="center"
                      display="inline-flex"
                      onClick={(event) => {
                        handleDelete(event, stock)
                      }}
                    >
                      Delete
                    </Button>

                    <Button
                      sx={{
                        mt: 10,
                        mr: 4,
                        ml: 2
                      }}
                      size="small"
                      variant="contained"
                      color="info"
                      align="center"
                      justifyContent="center"
                      display="inline-flex"
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))
            : ""}
        </Container>
      </ThemeProvider>
    </Paper>
  );
}
