import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

function StockView(props) {
  const { _id, title, position, company, salary_min, salary_max } = props.data
  const displayView = props.showViewButton ? true : false

  const navigate = useNavigate()
  const params = useParams()

  return (
    <Grid item xs={12} sm={4} mt={5}>
        <Card
          sx={{ height: 'auto', width: '100', display: 'flex', flexDirection: 'column', mt:'5', opacity: '1', backgroundColor:'black', opacity: '0.7', color: 'white'}}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2" fontWeight='bold'>
              {title}
            </Typography>
            <Typography>
              {position}
            </Typography>
            <Typography>
              {company}
            </Typography>
            <Typography>
              ${salary_min} - {salary_max}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center'}}>
            <Link style={{textDecoration: 'none', color: 'white', opacity: '1'}} to={`/jobs/${_id}/edit`}><Button size="small" variant="contained" color='info'>View or Edit</Button></Link>
          </CardActions>
        </Card>
        </Grid>

   

  )
}

export default StockView
