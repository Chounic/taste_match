import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../utils/utils';
import UserItem from './UserItem';

const FollowersList = () => {

    const userData = useSelector( state => state.userReducer);
    const usersData = useSelector( (state) => state.usersReducer);


        
        return (
            
            
            <div style={{ width: '15rem' }}>
            {
                !isEmpty(usersData) && usersData.map( user => {
                    if (!isEmpty(userData) && userData.followers.includes(user._id)) {
                        return (
                            
                            <UserItem key={user._id} data={user}/>
                            
                            )
                        }
                    })
            }
            </div>

)


};

export default FollowersList;