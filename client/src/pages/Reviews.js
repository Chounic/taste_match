import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';
import Suggestion from '../components/Profil/Suggestion';



const Review = () => {


    const uid = useContext(UidContext);


    return (
        <div>
            { uid && <LeftNav /> }
            <Suggestion />

            <div style={{height: "5rem"}}></div>
        </div>
    );
};

export default Review;