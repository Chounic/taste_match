import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import FollowersList from '../components/Profil/FollowersList';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';

const Followers = () => {

    const uid = useContext(UidContext);

    return (
        <div>
            { uid && <LeftNav /> }
            <FollowersList />
                
        </div>
    );


}

export default Followers;