import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../utils/utils';
import UserItem from './UserItem';

const FollowingList = () => {

    const userData = useSelector( state => state.userReducer);
    const usersData = useSelector( (state) => state.usersReducer);


    return (
        <Grid container justify="center">

            <h1>Following</h1>
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
    );
};

export default FollowingList;