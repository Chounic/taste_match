import React, { useEffect, useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      fontSize: "1.5rem", 
      color: "#0000d8", 
      cursor: "pointer"
    },
}));



const Log = () => {

    const classes = useStyles();

    const [signInModal, setsignInModal] = useState(true);
    const [signUpModal, setsignUpModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "signUp") {
            setsignInModal(false);
            setsignUpModal(true);
        } else if (e.target.id === "signIn") {
            setsignInModal(true);
            setsignUpModal(false);
        }
    }

    return (
        <div>

            { signInModal && 
            <div> 
                <SignInForm /> 
                <br></br>
                <div onClick={handleModals} id="signUp" className={classes.paper} >Don't have an account? Sign Up</div> 
            </div> 
            }

            { signUpModal && 
            <div> 
                <SignUpForm /> 
                <br></br> 
                <div onClick={handleModals} id="signIn" className={classes.paper} >Already have an account? Sign in</div> 
            </div>
            }

        </div>
    );
};

export default Log;