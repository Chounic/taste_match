import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, makeStyles, Paper, Slide, TextField, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
import RateReviewIcon from '@material-ui/icons/RateReview';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateReview } from '../../actions/reviews.actions';





const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(50),
      },
    }, 
    form: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '90%', 
        }, 
    }, 
    customizedButton: {
      position: 'absolute', 
      width: '3rem', 
      height: '3rem', 

      '&:hover': {
        backgroundColor: '#eaeaea', 
      }, 
      color: 'gray', 
      right: '10%'
    }, 
    input: {
      fontSize: 13
    }
   /* resizeForm: {
      fontSize: 20
    }*/
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });





const ReviewUpdateForm = ({modal, review, closeModal}) => {



    const reviewsData = useSelector( state => state.reviewsReducer );
    const [reviewData, setReviewData] = useState(null);
    const dispatch = useDispatch();

    useEffect( () => {

      setReviewData(review);
    }, [review]);




    const handleClose = () => {


        closeModal();

    };
  
  
    const handleChange = (e) => {

      setReviewData({
        ...reviewData, 
        [e.target.name]: e.target.value
      }); 
        
    }

    const handleSubmit = (e) => {

      //e.preventDefault();
      console.log(reviewData);
      dispatch(updateReview(reviewData));
    }


    const classes = useStyles();


    const customIcons = {
        1: {
          icon: <SentimentVeryDissatisfiedIcon fontSize="large" />,
          label: 'Very Dissatisfied',
        },
        2: {
          icon: <SentimentDissatisfiedIcon fontSize="large"  />,
          label: 'Dissatisfied',
        },
        3: {
          icon: <SentimentSatisfiedIcon fontSize="large"  />,
          label: 'Neutral',
        },
        4: {
          icon: <SentimentSatisfiedAltIcon fontSize="large"  />,
          label: 'Satisfied',
        },
        5: {
          icon: <SentimentVerySatisfiedIcon fontSize="large"  />,
          label: 'Very Satisfied',
        },
      };
      
      function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other} style={{ marginRight: "1rem"}}>{customIcons[value].icon}</span>;
      }
      
      IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
      };

    return (

        
          <Dialog
          open={modal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description" 
          fullScreen
          >
          
          <Paper elevation={3} >
          
          <Typography variant='h4' paragraph>
          
          <DialogTitle id="customized-dialog-title" disableTypography='true'>
          Write a review
          
          <CloseIcon onClick={(handleClose)} className={classes.customizedButton} />
          
          </DialogTitle>
          </Typography>
          
          { review && 
          
          
          <form action="" onSubmit={handleSubmit} className={classes.form} key={review._id} noValidate autoComplete="off">
          
          
          
          <TextField 
          
          id="outlined-required" 
          label={<Typography variant="h4"  color="textPrimary" >Artist</Typography>} 
          
          variant="outlined" 
          name="artist" 
          defaultValue={review.artist} 
          onChange={handleChange} 
          InputProps={{
            className: classes.input
          }}
          InputLabelProps={{
            shrink: true, 
            /*classes: {
              root: classes.resizeForm
            }*/
          }} 
          
          />
          
          <TextField 
          
          id="outlined-required 2" 
          label={<Typography variant="h4"  color="textPrimary" >Album</Typography>} 
          defaultValue={review.album} 
          variant="outlined" 
          name="album" 
          onChange={handleChange} 
          InputProps={{
            className: classes.input
          }} 
          InputLabelProps={{
            shrink: true,
          }} 
          
/>

<Box component="fieldset" mb={3} borderColor="transparent" width="75%">
                    <Typography component="legend" variant="h4">Rate the album</Typography>
                    <Rating 
                    name="rating"
                    defaultValue={review.rating} 
                    onChange={handleChange} 
                    getLabelText={(value) => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                    />
                </Box>


<TextField 

id="outlined-required 3" 
label={<Typography variant="h4"  color="textPrimary" >Title review</Typography>} 
defaultValue={review.title} 
variant="outlined" 
name="title" 
onChange={handleChange} 
InputProps={{
  className: classes.input
}} 
InputLabelProps={{
  shrink: true,
}} 

/>



<TextField
                id="outlined-multiline-static"
                label={<Typography variant="h4" color="textPrimary" >Review</Typography>}
                multiline
                rows={10} 
                placeholder="Don't be shy :) Tell us how you feel about it" 
                variant="outlined" 
                defaultValue={review.text} 
                name="text" 
                onChange={handleChange} 
                InputProps={{
                  className: classes.input
                }} 
                InputLabelProps={{
                  shrink: true,
                }} 
                
                />
                
                
                <Typography align="center" >

                  <Button 
                      type="submit" 
                      variant="contained"
                      color="inherit"
                      size="large"
                      startIcon={<RateReviewIcon />}
                      style={{ margin: "3rem"}} 
                      >
                      Send 
                  </Button>

                </Typography>

</form>

}

</ Paper>


</Dialog>

);
};

export default ReviewUpdateForm;