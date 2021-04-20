import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../../utils/utils';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Typography } from '@material-ui/core';


const FollowUnfollow = ({idToSet, type}) => {


    const userData = useSelector( state => state.userReducer);
    const dispatch = useDispatch();


    const handleFollow = () => {

        console.log(idToSet);

        if (userData.following) {


            if ( userData.following.includes(idToSet) ){
                
                dispatch(unfollowUser(idToSet, userData._id));
                
            } else {
                
                dispatch(followUser(idToSet, userData._id));
            }
        }



    }


    if (idToSet === userData._id) {

        return <div></div>;

    } else if (type === "review") {

        return (

            <div>

                <Typography align="center">Follow?
                { !isEmpty(userData) && userData.following.includes(idToSet) ? 
                <CheckBoxIcon onClick={handleFollow}/> 
                : 
                <CheckBoxOutlineBlankIcon onClick={handleFollow}/>
                } </Typography>
            </div>
        )

    } else {
        
        return (
            <div>
                <button 
                onClick={handleFollow}
                >{ !isEmpty(userData) && userData.following.includes(idToSet) ? 'UNFOLLOW' : 'FOLLOW' }
                </button>
            </div>
        );
        
    }
};

export default FollowUnfollow;