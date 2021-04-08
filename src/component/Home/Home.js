
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import FoodItems from '../FoodItems/FoodItems';
import NavBar from '../NavBar/NavBar';
import { CircularProgress } from '@material-ui/core';


const Home = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetch('https://shrouded-refuge-30415.herokuapp.com/foodItems')
      .then(response => response.json())
      .then(data => setFoodItems(data))
  }, [])

  const classes = useStyles();

  return (
    <div>
      <div style={{ height: '100px' }}>
        <NavBar />
      </div>
      <div style={{ height: '50px' }}>
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <Form inline style={{ textAlign: 'center' }}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </div>
      </div>



      <div style={{ marginTop: '10px' }}>
        <div className={classes.root} >
          <Grid container spacing={24} justify="center" >
            {
              foodItems.length === 0 && <CircularProgress color="secondary" />
            }
            {
              foodItems.map(foodItem => <FoodItems foodItem={foodItem} key={foodItem._id}></FoodItems>)
            }

          </Grid>

        </div>
      </div>

    </div>
  );
};

export default Home;