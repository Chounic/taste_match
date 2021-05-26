import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import UserItem from './UserItem';
import { isEmpty } from '../../utils/utils';
import { getUsers } from '../../actions/users.actions';
import { UidContext } from '../AppContext';
import { getUser } from '../../actions/user.actions';
import { Grid } from '@material-ui/core';

const Suggestions = () => {


    const userData = useSelector( state => state.userReducer);
    const usersData = useSelector( state => state.usersReducer);
    const [friendsSuggestions, setFriendsSuggestions] = useState([]);
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
                        /*console.log(userData.suggestions.includes(K));*/
                        const isIncluded = (item) => userData.suggestions.includes(item) || favArtistsArray.includes(item) ;
                        console.log(favArtistsArray);
                        console.log(fav.some(isIncluded));
                        return fav.some(isIncluded) ;

                } 

            });
            console.log(suggestionsList);
            setFriendsSuggestions(suggestionsList);
        }

    }, [userData]);



    return (

        <div>
        <h1 style={{ margin: "50px 0 60px 1rem"}}>Suggestions d'amis</h1>

        <Grid container justify="flex-start">
            


            {
                !isEmpty(friendsSuggestions) && friendsSuggestions.map( user => {
                        console.log('ba alooors');
                        return (

                            <UserItem key={user._id} data={user}/>

                        )
                })
            }
            {
                ( !isEmpty(usersData) && !isEmpty(userData) ) && usersData.filter( user => user._id !== userData._id && !userData.following.includes(user._id) && !friendsSuggestions.includes(user)).map( user => {
                        console.log('le reste koi');
                        return (

                            <UserItem key={user._id} data={user}/>

                        )
                })
            }

        </Grid>

        </div>
    );
};

export default Suggestions;