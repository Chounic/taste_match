import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';
import Suggestions from '../components/Profil/Suggestions';



const SearchFriends = () => {


    const uid = useContext(UidContext);


    return (
        <div>
            { uid && <LeftNav /> }
            <Suggestions />

            <div style={{height: "5rem"}}></div>
        </div>
    );
};

export default SearchFriends;