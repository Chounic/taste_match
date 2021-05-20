import React, { useContext } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import { UidContext } from "./AppContext";
import LogOut from "./Log/LogOut";
import { useSelector } from 'react-redux';
import logoTaste1 from '../images/logoTaste1.png';
import { green } from '@material-ui/core/colors';
import "@fontsource/courgette";
import "@fontsource/luckiest-guy";
import { Container, Grid } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1, 
    backgroundColor: "#63879e", 
    border: "red solid", 
    height: "15rem", 
    display: "flex", 
    justifyContent: "center"
  },
  colorDefault: {
    backgroundColor: "#63879e",
  }, 
  title: {
    //flexGrow: 1, 
    marginRight: "1rem"
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#63879e",
    }, 
  }
});

const titleFont = createMuiTheme({
  typography: {
    fontFamily: 'Luckiest Guy', 
    backgroundColor: "red"
  }, 
  palette: {
    primary: {
      main: "#2d363c",
    }, 
  }
});



export default function ButtonAppBar() {
  const classes = useStyles();
//#63879e
  const uid = useContext(UidContext);
  const userdata = useSelector( state => state.userReducer);

  return (
    <div >
      
      <ThemeProvider theme={theme}>
      <AppBar position="static" className={classes.root}>
      <Container  maxWidth="xl" disableGutters>
        <Toolbar>
          <Grid container spacing={3} justify="space-between">
            <Grid item xs={12} sm={6} md={8} lg={9}>
            
                  <NavLink exact to="/"><img src={logoTaste1} style={{ width: "4rem", marginRight: "1rem"}} alt="logo"/></NavLink>
              
               
                  <ThemeProvider theme={titleFont}>
                  <NavLink exact to="/" style={{ textDecoration: 'none' }}><Typography className={classes.title} variant="h4" component="span" noWrap color="primary" paragraph >
                    Taste Match
                  </Typography></NavLink>
                  </ThemeProvider>
                
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Grid container alignItems="flex-end" spacing={3}>
                
                { uid ? <>
                  <Grid item>
                  <ThemeProvider theme={theme}>
                  <Typography component="span" display="block" variant="h6" color="textPrimary" >Hello {userdata.pseudo}</Typography></ThemeProvider>
                  <NavLink exact to="/Profil" style={{  marginLeft: "2rem" }}>
                  <ThemeProvider theme={titleFont}><Typography component="span" variant="h6" >Infos du profil</Typography></ThemeProvider>
                  </NavLink>
                  </Grid>
                  <Grid item>
                  <LogOut />
                  </Grid>
                  </>
                  : 
                  <NavLink exact to="/Profil" style={{
            color: "white", textDecoration: 'none'
                    }}>   
                  <Button color="inherit" ><Typography>Se connecter</Typography></Button>
                  </NavLink>}
                  
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>
     
    </div>
  );
}
