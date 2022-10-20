import * as React from "react";
import {useState, useEffect} from 'react';
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
import { useParams, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import Card from '@mui/material/Card';
import { CardMedia } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FaceIcon from '@mui/icons-material/Face';

const theme = createTheme();


export default function Profile(props) {
  const navigate = useNavigate();
  const params = useParams()
 
  //for display later when there is an error with title or details
  const [ profile, setProfile] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [techStack, setTechStack] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    job: "",
    position: "",
    experience: 0,
    skills: []
  });

  let token = localStorage.getItem('user_token')
  let id = localStorage.getItem('user_Id')

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(`http://localhost:3001/user/profile/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
      },
  })
      const data = await res.json()
      console.log('data', data)
      setProfile(data)
      setFormData(data)
    }

    fetchApi()
  }, [params])

  useEffect(() => {
    setTechStack(formData.skills)
  }, [formData.skills])

  function handleChange(e) {
    setFormData({
        // ...formData ->
        // name: 'asdasd',
        // species: 'asdasd',
        // breed: 'asdasd'
        ...formData,
        skills: [...techStack],
        [e.target.name]: e.target.value
    })

  }

  const handleChangeOnSubmit = () => {
    setFormData({
      ...formData,
      skills: [...techStack]
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    let token = localStorage.getItem('user_token')
    console.log('token:', token)
    fetch(`http://localhost:3000/users/profile/${id}`, {
      method: 'DELETE',
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

        console.log('Delete Successful!')
        localStorage.clear()
        localStorage.removeItem('user-token')

        navigate('/')
    })
    .catch(err => {
        console.log('err: ',err)
    })
};


  function handleSubmit(e) {
    e.preventDefault()

    // validations ...

    // processing
    let token = localStorage.getItem('user_token')
    console.log('token:', token)

    fetch(`http://localhost:3000/users/profile/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
          // displaying success message

          // redirect to animals listing page
          navigate('/')
        })
        .catch(err => {
          console.log(err)
        })
  }

  console.log(formData.skills)

  //tab function 
  const [value, setValue] = React.useState('1');
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // dialog states
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
            backdropFilter: "blur(3px)",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'Cover',
            backgroundImage: `url(${Image})`,
            bgcolor: 'text.primary',
          }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <TabContext value={value}>

        <Box sx={{ width: '100%', bgcolor: 'transparent' }}>
        <TabList onChange={handleTabChange} aria-label="lab API tabs example" centered>

            <Tab label="View" value="1"/>
            <Tab label="Edit" value="2"/>
        </TabList>

        </Box>

        <TabPanel value="1">

              <Card sx={{ minHeight: 300, minWidth: 300, mb: 20 , backgroundColor:'black', opacity: '0.6', color: 'white'}}>
            <CardContent>
              <Typography sx={{ fontSize: 18, mb: 3, textDecoration: 'underline', fontWeight: 'bold'}} color="white" gutterBottom >
                Company: {formData.name}
              </Typography>
              <Typography variant="h5" component="div">
                Name: {formData.name}
              </Typography>
              <Typography sx={{ mb: 3 }} color="white">
                Email: {formData.email}
              </Typography>
              <Typography variant="body2" sx={{fontSize: 15}}>
                Title: {formData.title} 
                <br />
                Job: {formData.job}
                <br />
                Position: {formData.position}
                <br />
                Experience: {formData.experience}
                {/* {techStack} */}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        </TabPanel>



        <TabPanel value="2">

        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <FaceIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  error={titleError}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={titleError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={titleError}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="Password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={titleError}
                />
              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="job"
                  label="Job Title"
                  name="job"
                  autoComplete="job"
                  value={formData.job}
                  onChange={handleChange}
                  error={detailsError}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="position"
                  label="Position"
                  name="position"
                  autoComplete="position"
                  value={formData.position}
                  onChange={handleChange}
                  error={detailsError}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography id="input-slider" gutterBottom>
                  Experience*
                </Typography>
                <Slider
                  defaultValue={0}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  max={50}
                  id="experience"
                  name="experience"
                  label="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  error={detailsError}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={3} sx={{ width: 500 }}>
                  <Autocomplete
                    multiple
                    name="skills"
                    id="skills"
                    onChange={(event,value) => setTechStack(value)}
                    value={techStack}
                    autoSelect
                    options={setskills}
                    getOptionLabel={(option) => option.name}
                    defaultValue={setskills[0]}
                    error={detailsError}
                    renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Add Your Tech Stack"
                      placeholder="Skills"
                    />
                  )}
                />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive alerts on new jobs via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              onClick={handleChangeOnSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0 }}
            >
              Edit Profile
            </Button>


            <Button
              onClick={handleClickOpen}
              fullWidth
              variant="contained"
              color='error'
              sx={{ mt: 3, mb: 5 }}
            >
              Delete Profile
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Delete your profile forever?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={handleDelete}>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>



            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
              </Grid>
              
              <Grid container justifyContent="flex-end">
              <Grid item>

              </Grid>


            </Grid>
          </Box>
        </Box>

        </TabPanel>
        </TabContext>

      </Container>
      </Box>
    </ThemeProvider>
  );
}

const setskills = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "React" },
  { name: "Node" },
  { name: "Mongo" },
  { name: "Express" },
];