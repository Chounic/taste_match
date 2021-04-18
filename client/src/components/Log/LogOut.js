import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



const LogOut = () => {

    
    
    const handleClick = async () => {


            
            await axios({ 
                method: "get", 
                url: /*`${process.env.REACT_APP_API_URL}/api/user/logout`*/`/api/user/logout`, 
                withCredentials: true, 
                
            })
            .catch( err => {
                console.log(err);
            });
            

        window.location = "/";
    }

    

    return (
        <div>
            <Button onClick={handleClick} color="inherit" ><ExitToAppIcon fontSize="large"/></Button>
        </div>
    );
};

export default LogOut;