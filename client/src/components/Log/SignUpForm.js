import React, { useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignInForm from './SignInForm';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(8), 
    margin: 'auto', 
    width: "8rem"
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registration, setRegistration] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const pseudoError = document.querySelector(".pseudo.error");

    axios({ 
      method: "post", 
      url: `/api/user/register`, 
      withCredentials: true, 
      data: {
        pseudo, 
        email, 
        password
      }, 
    })
    .then(res => {
      console.log(res);
       if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
          pseudoError.innerHTML = res.data.errors.pseudo;
       } else {
          setRegistration(true);
       }
    })
    .catch( err => {
      console.log(err);
    });

  };


if (registration) {

  return (
    <>
    <SignInForm />
    <Typography align="center" variant="h4" color="secondary" >Inscription effectuée!</Typography>
    </>
  )
} else {
  
  
  return (
    
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
        Sign up
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <Grid container spacing={2}>

                <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="pseudo"
                label="Pseudo" 
                name="pseudo" 
                onChange={ (e) => setPseudo(e.target.value) }
                />
                  </Grid>
                  <div className="error pseudo" style={{ color: "red"}}></div>
                <Grid item xs={12}>
                  <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email" 
                  onChange={ (e) => setEmail(e.target.value) }
                  autoComplete="email"
                  />
                </Grid>
                  <div className="email error" style={{ color: "red"}}></div>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password" 
                    onChange={ (e) => setPassword(e.target.value) }
                    autoComplete="current-password"
                    />
                </Grid>
                  <div className="password error" style={{ color: "red"}}></div>



                <Button
                type="submit"
                fullWidth
                variant="contained" 
                size="large" 
                color="primary"
                className={classes.submit} 
                >
                  Sign Up
                </Button>

          </Grid>


        </form>
        </div>

    </Container>
    
    );
  }
  }