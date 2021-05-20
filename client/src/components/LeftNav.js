import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Hidden, Link } from '@material-ui/core';
import './leftnav.css';



const useStyles = makeStyles((theme) => ({
    item: {
      '& > *': {
        height: theme.spacing(3), 
      }, 

      width: "25%", 
      height: "3rem", 
      //backgroundColor: "#98a7a6", 
      background: 'linear-gradient(45deg, #98a7a6 30%, #a0a0a0 90%)', 
      color: "#000000", 
      borderRadius: "3px", 
      boxShadow: '0 3px 5px 2px rgba(35, 35, 35, .3)',

    }, 
    button: {
        display: "block", 
        height: "100%", 

        backgroundColor: "#FFFFFF", 
        /*"&:active": {
            backgroundColor: '#FFFFFF',
          },*/
    }, 
    activeButton: {

        backgroundColor: "red"
    }

  }));


const LeftNav = () => {


    const classes = useStyles();

    const userData = useSelector( state => state.userReducer);
    //const [color, setColor] = useState('primary');
    const [currentButton, setCurrentButton] = useState();


    const handleClick = (e) => {
        console.log(e.target.innerText);
        if (e.target.innerText !== currentButton) {
            setCurrentButton(e.target.innerText);

        }
    };

    
    return (

                <Hidden smUp>
                <Grid container style={{ position: 'fixed', bottom: "0", margin: "0", width: "100%", zIndex: "2"}} >

                    <Grid className={classes.item}>
                        
                        <NavLink to='/' exact activeClassName={classes.button} style={{ textDecoration: 'none' }}> 
                            <Grid container alignItems="center" justify="center" alignContent="center" style={{ color: "black" }}>

                                <HomeIcon fontSize="large" />
                                <p style={{ fontSize: "1rem", marginLeft: ".3rem"}}>Home</p>
 
                            </Grid>

                        </NavLink>

                    </Grid>

                    <Grid className={classes.item}> 

                        <NavLink to='/Following' exact activeClassName={classes.button} style={{ textDecoration: 'none' }} >   

                        <Grid container alignItems="center" justify="center" alignContent="center" style={{ color: "black" }}>

                            <GroupIcon fontSize="large" />
                            <p style={{ fontSize: "1rem", marginLeft: ".3rem"}}>{ userData.following ? userData.following.length : 0}</p>

                        </Grid>

                        </NavLink>

                    </Grid>

                    <Grid  className={classes.item}>

                        <NavLink to='/Followers' exact activeClassName={classes.button} style={{ textDecoration: 'none' }} >

                            <Grid container alignItems="center" justify="center" style={{ color: "black" }}>

                                <PeopleOutlineIcon fontSize="large" />
                                <p style={{ fontSize: "1rem", marginLeft: ".3rem"}}>{ userData.followers ? userData.followers.length : 0}</p>

                            </Grid>

                        </NavLink>
                    </Grid>

                    <Grid  className={classes.item}>

                        <NavLink to='/SearchFriends' exact activeClassName={classes.button} style={{ textDecoration: 'none' }} >  

                            <Grid container alignItems="center" justify="center" style={{ color: "black" }}>

                            <GroupAddIcon fontSize="large" />
                            <p style={{ fontSize: "1rem", marginLeft: ".3rem"}}>Add</p>

                            </Grid>

                        </NavLink>

                    </Grid>


                </Grid>
                </Hidden>
    );
};

export default LeftNav;