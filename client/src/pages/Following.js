import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import FollowingList from '../components/Profil/FollowingList';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';

const Following = () => {


    const uid = useContext(UidContext);
    
    return (
        <div>
            
            { uid && <LeftNav /> }
            <FollowingList />
                
        </div>
    );



}

export default Following;