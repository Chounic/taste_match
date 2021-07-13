import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserItem from './UserItem';
import { isEmpty } from '../../utils/utils';
import { Grid } from '@material-ui/core';

const Suggestions = () => {


    const userData = useSelector(state => state.userReducer);
    const usersData = useSelector(state => state.usersReducer);
    const [friendsSuggestions, setFriendsSuggestions] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {


        if (!isEmpty(userData.following)) {

            const favArtistsArray = Object.values(userData.favArtists);
            const notFollowed = usersData.filter(user => user._id !== userData._id && !userData.following.includes(user._id));


            const suggestionsList = notFollowed.filter(user => {
                if (user.favArtists) {

                    let fav = Object.values(user.favArtists);

                    const isIncluded = (item) => userData.suggestions.includes(item) || favArtistsArray.includes(item);

                    return fav.some(isIncluded);

                }

            });

            setFriendsSuggestions(suggestionsList);
        }

    }, [userData]);



    return (

        <div>
            <h1 style={{ margin: "50px 0 60px 1rem" }}>Suggestions d'amis</h1>

            <Grid container justify="flex-start">



                {
                    !isEmpty(friendsSuggestions) && friendsSuggestions.map(user => {

                        return (

                            <UserItem key={user._id} data={user} />

                        )
                    })
                }
                {
                    (!isEmpty(usersData) && !isEmpty(userData)) && usersData.filter(user => user._id !== userData._id && !userData.following.includes(user._id) && !friendsSuggestions.includes(user)).map(user => {

                        return (

                            <UserItem key={user._id} data={user} />

                        )
                    })
                }

            </Grid>

        </div>
    );
};

export default Suggestions;