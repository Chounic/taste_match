import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';
import ReviewForm from '../components/Reviews/reviewForm';
import ReviewsList from '../components/Reviews/ReviewsList';





const Home = () => {



    const uid = useContext(UidContext);



    return(
        <div >
            { uid && <LeftNav /> }
            
                    <ReviewForm />
                    
                    <ReviewsList />
                    <div style={{height: "5rem"}}></div>
        </div>
    )
};


export default Home;