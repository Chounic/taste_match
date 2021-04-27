import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import UserItem from './UserItem';
import { isEmpty } from '../../utils/utils';
import { getUsers } from '../../actions/users.actions';
import { UidContext } from '../AppContext';
import { getUser } from '../../actions/user.actions';
import { Grid } from '@material-ui/core';

const Suggestion = () => {


    const userData = useSelector( state => state.userReducer);
    const usersData = useSelector( state => state.usersReducer);
    const [friendsSuggestion, setFriendsSuggestions] = useState([]);
    const dispatch = useDispatch();


    useEffect( () => {
        

        console.log('suggestions');
        if (!isEmpty(userData.following)) {

            const favArtistsArray = Object.values(userData.favArtists);
            const notFollowed = usersData.filter( user => user._id !== userData._id && !userData.following.includes(user._id));
            console.log(notFollowed);
            
            const suggestionsList = notFollowed.filter( user => {
                if (user.favArtists) {

                        let fav = Object.values(user.favArtists);
                        console.log(fav);
                        const isIncluded = (item) => userData.suggestions.includes(item) || favArtistsArray.includes(item) ;
                        console.log(user.favArtists);

                        return fav.some(isIncluded) ;

                } 

            });
            console.log(suggestionsList);
            setFriendsSuggestions(suggestionsList);
        }

    }, []);



    return (
        <Grid container justify="center">
            
            <h1>Friends suggestions</h1>

            {
                !isEmpty(friendsSuggestion) && friendsSuggestion.map( user => {
                        console.log('ba alooors');
                        return (

                            <UserItem key={user._id} data={user}/>

                        )
                })
            }
            {
                !isEmpty(usersData) && usersData.filter( user => user._id !== userData._id && !friendsSuggestion.includes(user)).map( user => {
                        console.log('le reste koi');
                        return (

                            <UserItem key={user._id} data={user}/>

                        )
                })
            }

        </Grid>
    );
};

export default Suggestion;