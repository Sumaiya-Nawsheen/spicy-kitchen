
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { Form, FormControl, Button} from 'react-bootstrap';
import FoodItems from '../FoodItems/FoodItems';
import NavBar from '../NavBar/NavBar';

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
      },[])
    
    const classes = useStyles();

    return (
        <div>
   <div style={{ height: '100px' }}>
        <NavBar/>
         </div>

        <div style={{textAlign: 'center',  display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <Form inline style={{textAlign: 'center'}}>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
            </div>


            <div>
            <div className={classes.root}>
         <Grid container spacing={24} justify="center" >
    
          {
                foodItems.map(foodItem => <FoodItems  foodItem={foodItem}></FoodItems>)
            }
        
        </Grid>
            
        </div>
            </div>
            
        </div>
     );
};

export default Home;