import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../utils/utils';
import UserItem from './UserItem';

const FollowingList = () => {

    const userData = useSelector( state => state.userReducer);
    const usersData = useSelector( (state) => state.usersReducer);


    return (
        <div>
        <h1 style={{ marginLeft: ".5rem"}}>Liste des personnes que vous suivez</h1>
        <Grid container justify="center">

            
            {
                !isEmpty(usersData) && usersData.map( user => {
                    if (!isEmpty(userData) && userData.following.includes(user._id)) {
                        return (

                            <UserItem key={user._id} data={user}/>

                        )
                    }
                })
            }
        </Grid>
        </div>
    );
};

export default FollowingList;