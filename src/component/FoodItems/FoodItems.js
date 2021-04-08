import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Link, useHistory } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      textAlign: 'center',
      margin:'1em',
      boxSizing: 'border-box'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
   
  }));


  export default function FoodItems({foodItem}) {
    const classes = useStyles();

    return (
        <div>
              <Card className={classes.root}>

              <CardActionArea>

      <CardMedia
        className={classes.media}
        alt="Contemplative Reptile"
        image={foodItem.imageURL}
        title="Paella dish"
        height="140"
      />
     
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {foodItem.title}
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="price">
          <AttachMoneyIcon />: {foodItem.price} 
        </IconButton>
        <Link to = {`/checkout/${foodItem._id}`}><Button   variant="contained" color="primary">
            Order now
        </Button></Link>
      </CardActions>
    </Card>
        </div>
    );
};
