import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState,useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const Search = (props) => {

    const [searchPass, setSearchPass] = useState(null)
    const [searchData, setSearchData] = useState({
        search: "",
        pg: 1
    })

    const handleChange = (e) => {
        setSearchData({
            [e.target.name]: e.target.value
        })
        console.log(searchData)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://localhost:3000/jobs/search', {
            method: 'POST',
            body: JSON.stringify(searchData),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(response => {
                console.log('Search Response: ',response)
                return response.json()
            })
            .then(jsonResponse => {
                if(jsonResponse.error) {
                    console.log('jsonResponse.error: ', jsonResponse.error)
                    return
                }
                console.log(jsonResponse)
                setSearchPass(jsonResponse)
            })
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" sx={{marginTop: 5, paddingBottom: 1}}>
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', width: '50%', mb: '100px'}}
                onSubmit={handleSubmit}>
                    <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Jobs"
                    id="search"
                    name="search"
                    label="search"
                    value={searchData.search}
                    onChange={handleChange}
                    />
                    <IconButton 
                    type="submit" 
                    sx={{ p: '10px' }} 
                    aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Container>

            { searchPass ?
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
                    fontStyle='bold'
                    sx={{ mr: 1 }}
                    >
                    {searchPass ? ('Your Search Results') : ''}
                    </Typography>
            <Carousel responsive={responsive} >
               
                    {searchPass ? searchPass.map((jobs) => (
                        <Card
                        sx={{ height: '100%', width: 'auto', display: 'flex', flexDirection: 'column', margin: 'normal', mr: 2, align: 'center', backgroundColor:'black', opacity: '0.7', color: 'white'}}
                        >
                        <CardContent sx={{ flexGrow: 1, variant: 'outlined', mr: 2}}>
                            <Typography gutterBottom variant="h4" component="h2" fontWeight='bold' display='inline-flex'>
                            {jobs.company}
                            </Typography>

                            <Typography gutterBottom variant="h5" component="h3" fontWeight='bold' fontStyle='italic'>
                            {jobs.title}
                            </Typography>

                            <Typography gutterBottom variant="h5" component="h4" lineheight={2}>
                            {jobs.experience}
                            </Typography>

                            <Typography gutterBottom variant="h6" component="h5" fontWeight='medium' fontStyle='italic'>
                            {jobs.salary_min ? jobs.salary_min : ''}
                            </Typography>

                            <Typography gutterBottom variant="h6" component="h5" fontWeight='medium' fontStyle='italic'>
                            {jobs.salary_max ? jobs.salary_max : ''}
                            </Typography>

                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', mb: 2}}>
                            <Button sx={{ mr: 1 }} size="small" variant="contained" color='info' align='center'>Save</Button>
                            <Button sx={{ ml: 1 }} size="small" variant="contained" color='info' align='center' href={`${jobs.link}`}>View</Button>
                        </CardActions>
                        </Card> 
                        )) : ''}
            </Carousel> 
            </Container>
            : <></> }

        </ThemeProvider>
    )
}

export default Search