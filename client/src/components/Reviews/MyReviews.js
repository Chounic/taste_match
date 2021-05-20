import { Box, Button, Grid, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../../utils/utils';
import LikeDislike from './LikeDislike';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import ReviewUpdateForm from './ReviewUpdateForm';
import { deleteReview, getReviews } from '../../actions/reviews.actions';



const MyReviews = () => {

    const dispatch = useDispatch();
    const reviewsData = useSelector( state => state.reviewsReducer );
    const userData = useSelector( state => state.userReducer);
    const [open, setOpen] = useState(false);
    const [review, setReview] = useState();


    useEffect( () => {

      dispatch(getReviews());
  }, []);

    const handleUpdate = (e) => {

      console.log(e);
      setOpen(true);
      setReview(e);

    };

    const handleDelete = (id) => {

      console.log(id);
      dispatch(deleteReview(id));
    };

    const handleClose = () => {

      setOpen(false);

    };

console.log(reviewsData);

    const customIcons = {
        1: {
          icon: <SentimentVeryDissatisfiedIcon />,
          label: 'Very Dissatisfied',
        },
        2: {
          icon: <SentimentDissatisfiedIcon />,
          label: 'Dissatisfied',
        },
        3: {
          icon: <SentimentSatisfiedIcon />,
          label: 'Neutral',
        },
        4: {
          icon: <SentimentSatisfiedAltIcon />,
          label: 'Satisfied',
        },
        5: {
          icon: <SentimentVerySatisfiedIcon />,
          label: 'Very Satisfied',
        },
      };
      
      function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
      }
      
      IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
      };




    return (
        <div>
          <ReviewUpdateForm modal={open} review={review} closeModal={handleClose} />
            { 
            !isEmpty(reviewsData) && reviewsData.filter( review => review.reviewerId === userData._id).map( review => {

                return (
                    <Paper key={review._id} style={{ margin: '1rem', backgroundColor: "rgb(0 0 0 / 4%)" }}>
                        <Grid container >
                              
                          <Grid style={{ paddingLeft: ".5rem", borderBottom: "#d8d7d7 solid 1px"}} container justify="space-between" alignItems="center">
                              <Grid >
                                  <h2>{review.artist}</h2>
                                  <h3>{review.album}</h3>
                              </Grid>
                              <Grid >

                                  <img src={review.picture} style={{ width: '5rem', height: '5rem', display: 'flex', backgroundColor: "#f1f1f1" }}/>

                              </Grid>
                          </Grid>
                          <small>Posté le {dateParser(review.createdAt)}</small>
                          <Grid container justify="space-between">
                            <Grid  item xs={7}>
                              <h4 style={{ fontStyle: "italic"}}>{review.title}</h4>
                            </Grid>
                            <Grid item xs={5}>
                              <Box component="fieldset" mb={3} borderColor="transparent" style={{ marginTop: "1rem"}}>
                                  <Rating
                                  name="customized-icons"
                                  value={review.rating} 
                                  readOnly 
                                  getLabelText={(value) => customIcons[value].label}
                                  IconContainerComponent={IconContainer}
                                  />
                              </Box>
                            </Grid>
                          </Grid>

                          <Grid container justify="center" spacing={1}>

                            <Grid item xs={12}>
                              <p>{review.text}</p>
                            </Grid>
                            <Grid item xs={6} style={{ borderBottom: "#d8d7d7 solid 1px"}}></Grid>

                          </Grid>


                          <Grid container justify="center" spacing={3} style={{ marginTop: ".5rem"}}>
                            
                            <LikeDislike review={review}/>

                          </Grid>
                          <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => handleUpdate(review)} 
                          >
                            Modidier
                          </Button> 
                          <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => { if (window.confirm('Êtes-vous sûr(e) de vouloir supprimer cette critique?')) handleDelete(review._id) }} 
                          >
                            Supprimer
                          </Button>
                        </Grid>
                    </Paper>
                )
            })

            }
        </div>
    );
};

export default MyReviews;