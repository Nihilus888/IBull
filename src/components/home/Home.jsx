import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Search from '../Search'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Paper } from '@mui/material';
import Image from '../../components/stockmarket.jpg'
import { Backdrop } from '@mui/material';

//use Paper material UI to get the background image but it does not work
const styles = {
  paperContainer: {
    backgroundImage: `url(${"./beach.png"})`,
  }
};

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

const theme = createTheme();

export default function Home() {

  const navigate = useNavigate()
  const [postedJobs, setpostedJobs] = useState([])
  const [jobId, setJobId] = useState(null)
  const [savedData, setSavedData] = useState([])

  // To handle save job click event by setting jobId state, triggering useEffect
  const handleSave = (event) => {
    let token = localStorage.getItem('user_token')
    if (token) {
      setJobId({
        id: event.target.value 
      })} else {
        navigate('/login')
      }
  };

  // Function to fetch user's saved jobs data
  const fetchSavedData = async () => {
    let token = localStorage.getItem('user_token')
    if (token) {
      const res = await fetch(`http://localhost:3000/jobs/saved`, {
        method: 'GET',
        headers: {
          'Authorization': token
        },
      })
      const data = await res.json()

      try {
        setSavedData(data[0].jobId)
      } catch(err) {
        console.log("No saved jobs data present in DB")
      }
    }
  }

  // To fetch posted jobs data and set into a state to be mapped on the carousel
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch('http://localhost:3000/jobs/posted')
      const data = await res.json()
  
      setpostedJobs(data)
    }
  
    fetchApi()
    setTimeout(() => {
      fetchSavedData()
    }, "1000")
  }, [])

  // POST 
  useEffect(() => {
    let token = localStorage.getItem('user_token') || ""

    if (jobId === null) {
      return
    }

      fetch(`http://localhost:3000/jobs/saved`, {
        method: 'POST',
        body: JSON.stringify(jobId),
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
    })
        .then(response => {
            console.log('response: ',response)
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.error) {
                console.log('jsonResponse.error: ', jsonResponse.error)
                return
            }

            console.log('Save Successful!', jsonResponse)

        })
        .catch(err => {
            console.log('err: ',err)
        })

        setTimeout(() => {
          fetchSavedData()
        }, "500")
  },[jobId])

  return (
    <Paper style={styles.paperContainer}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            backdropFilter: "blur(3px)",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'Cover',
            backgroundImage: `url(${Image})`,
            bgcolor: 'text.primary',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="xl" align="center">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              fontWeight='bold'
              mb={5}
            >
              IBull
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Here you can search, save, buy and sell equities!
            </Typography>


            <Search sx={{mt: 10, mb : 5}} /> 
          
            <Container maxWidth="xl">

            <div>
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.secondary"
                    fontWeight='bold'
                    mt={5}
                  >
                    Our Featured Stocks
                  </Typography>
                </div>

              <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={3000} infinite={true} mt={12}>

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
              </Carousel>
            </Container>
            </Container>
          </Box>


        {/* <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Job Title
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color='info'>Save</Button>
                    <Button size="small" variant="contained" color='info'>View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> */}

      </main>
    </ThemeProvider>
    </Paper>
  );
} 
