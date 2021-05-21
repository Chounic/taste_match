import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';
import ReviewForm from '../components/Reviews/reviewForm';
import ReviewsList from '../components/Reviews/ReviewsList';
import Background from '../images/main_background.jpg' ;




const useStyles = makeStyles((theme) => ({

    background: {
      '&:after': {
        content: '""',
        backgroundImage: "url(" + Background + ")" ,

        position: 'absolute',
        top: '15rem' ,
        right: '0px' ,
        bottom: '0px' ,
        left: '0px' ,
        opacity: '0.2' ,
        height: '100%' ,
      }
    }
  }));



const Home = () => {


    const classes = useStyles();

    const uid = useContext(UidContext);



    return(
        <div /*className={classes.background}*/>
            { uid && <LeftNav /> }
            
                    <ReviewForm />
                    
                    <ReviewsList />
                    <div style={{height: "5rem"}}></div>
        </div>
    )
};


export default Home;