import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../actions/reviews.actions';
import { isEmpty } from '../../utils/utils';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserItem from '../Profil/UserItem';
import RateReviewIcon from '@material-ui/icons/RateReview';
import GroupIcon from '@material-ui/icons/Group';
import FollowUnfollow from '../Profil/FollowUnfollow'; 
import LikeDislike from './LikeDislike';
import { dateParser } from '../../utils/utils';



const ReviewsList = () => {



    const reviewsData = useSelector( state => state.reviewsReducer );
    const usersData = useSelector( (state) => state.usersReducer);
    const dispatch = useDispatch();

    useEffect( () => {

        dispatch(getReviews());
        console.log('test');
    }, []);




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
            { 
            !isEmpty(reviewsData) && reviewsData.map( review => {

                return (
                <Paper key={review._id} style={{ margin: '1rem', backgroundColor: "rgb(0 0 0 / 4%)" }}>
                  <Grid container >
                    <Grid item xs={2} >
                      { !isEmpty(usersData) && usersData.filter( user => user._id === review.reviewerId).map(user => {

                        return (

                        <Grid container key={user._id} justify="center" alignContent="center" >

                          <img src={user.picture} alt="reviewerPic"  style={{ width: '4rem', marginTop: "6rem"}}/>
                  
                            
                            <p>{user.pseudo}</p>

                            <Grid container justify="center" >
                              <RateReviewIcon />
                              <Typography >{reviewsData.filter( review => review.reviewerId === user._id).length }</Typography>
                              
                            </Grid>

                            <Grid container justify="center">
                              <GroupIcon/>
                              <Typography>{user.following.length }</Typography>
                              <GroupIcon />
                              <Typography paragraph>{user.followers.length }</Typography>
                              
                            </Grid>

                            <Grid container alignContent="center" alignItems="center" direction="column">
                              <Typography>Follow?</Typography>
                              <FollowUnfollow idToSet={user._id} type="review"/>
                              
                            </Grid>



                          

                        </Grid>

                        )

                      })
                      
                      
                      }
                    </Grid>
                    <Grid item xs={9} style={{ padding: '1rem'}}>
 
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

                    </Grid>

                  </Grid>
                </Paper>
                )
            })
            }
        </div>
    );
};

export default ReviewsList;