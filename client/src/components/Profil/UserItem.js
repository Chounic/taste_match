import React from 'react';
import FollowUnfollow from './FollowUnfollow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RateReviewIcon from '@material-ui/icons/RateReview';
import GroupIcon from '@material-ui/icons/Group';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import "@fontsource/courgette";
import "@fontsource/luckiest-guy";
import { useSelector } from 'react-redux';
import { isEmpty } from '../../utils/utils';





const UserItem = ({data}) => {


    const favArtistsArray = data.favArtists ? Object.values(data.favArtists) : [] ;
    const reviewsData = useSelector(state => state.reviewsReducer);


    const useStyles = makeStyles((theme) => ({
        root: {
          //flexGrow: 1, 
          backgroundColor: "#63879e", 
        },
        colorDefault: {
          backgroundColor: "#63879e",
        }, 
        title: {
          flexGrow: 1, 
          marginRight: "1rem"
        },
      }));



    const favFont = createMuiTheme({
        typography: {
          fontFamily: 'Luckiest Guy'
        }, 
        palette: {
          primary: {
            main: "#d44646",
          }, 
          secondary: {
            main: "#e45f5f",
          }, 
        }, 
      });


    return (
        <Paper key={data._id} style={{ margin: '1rem', width: '30rem', height: '15rem' }}>
            <Grid container justify="center">

                <Grid container direction='row' alignItems='center' justify='space-evenly'>
                    <Grid item xs={5} >
                        <Grid>
                        <h2>{data.pseudo}</h2>
                        </Grid>
                        <Grid container justify="space-around">
                            <Grid>
                                <img src={data.picture} style={{ width: '5rem', height: '5rem' }}/>
                            </Grid>
                            <Grid>
                                {!isEmpty(reviewsData) && 
                                <>
                                <RateReviewIcon fontSize='large' />
                                <ThemeProvider theme={favFont}>
                                <Typography variant="h5" color="secondary">{ reviewsData.filter( review => review.reviewerId === data._id).length }</Typography>
                                </ThemeProvider>
                                </>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid  item xs={3} >
                        <Grid>

                        <FollowUnfollow idToSet={data._id} />
                        </Grid>
                        <Grid container justify="space-around" style={{ marginTop: "1rem"}}>

                              <ThemeProvider theme={favFont}>
                                <GroupIcon fontSize="large" />
                                <Typography variant="h5"  color="secondary">{data.following.length }</Typography>
                                <PeopleOutlineIcon  fontSize="large" style={{ marginBottom: "1rem"}}/>
                                <Typography  variant="h5" color="secondary">{data.followers.length }</Typography>
                              </ThemeProvider>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={11} style={{ height: "3rem", marginTop: "1rem", paddingLeft: '1rem'}}>
                { favArtistsArray[0] && 
                          <ThemeProvider theme={favFont}>
                        <Typography component={'span'} variant="body1" color="primary">

                        <p>Fav artists : <span>{favArtistsArray.join(', ')}</span></p>
                        </Typography>
                        </ThemeProvider>
                    }
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserItem;