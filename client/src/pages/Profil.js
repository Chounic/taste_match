import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';


const Profil = () => {

    const uid = useContext(UidContext);


    return(

        <div>
            { uid ?
            <UpdateProfil />

            :
            <Log />
            }
        </div>
    )
};


export default Profil; 