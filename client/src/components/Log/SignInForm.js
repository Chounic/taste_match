import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



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
    marginTop: theme.spacing(1), 
    fontSize: "1.5rem", 
  },
  submit: {
    marginTop: theme.spacing(6), 

    margin: 'auto', 
    width: "12rem"
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault();

    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({ 
      method: "post", 
      url: `/api/user/login`, 
      withCredentials: true, 
      data: {
        email, 
        password
      }, 
    })
    .then(res => {
      console.log(res);
       if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
       } else {
         window.location = "/";
       }
    })
    .catch( err => {
      console.log(err);
    });

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Se connecter
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email" 
            onChange={ (e) => setEmail(e.target.value)} 
            autoComplete="email"
            autoFocus
            />
          <div className="email error" style={{ color: "red"}}></div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot De Passe"
            type="password"
            id="password" 
            onChange={ (e) => setPassword(e.target.value)} 
            autoComplete="current-password"
            />
          <div className="password error" style={{ color: "red"}}></div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" 
            size="large" 
            className={classes.submit}
            >
            Se connecter
          </Button>

          </Grid>


        </form>
      </div>

    </Container>
  );
}