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




const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1, 
    backgroundColor: "#63879e", 
    border: "red solid", 
    height: "8rem"
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
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <AppBar position="static" >
        <Toolbar>

            <div>
            <NavLink exact to="/"><img src={logoTaste1} style={{ width: "4rem", marginRight: "2rem"}} alt="logo"/>          </NavLink>
            </div>
            <ThemeProvider theme={titleFont}>
            <NavLink exact to="/" style={{ textDecoration: 'none' }}><Typography className={classes.title} variant="h4" color="primary">
              Taste Match
            </Typography></NavLink>
            </ThemeProvider>

          { uid ? <>
            <NavLink exact to="/Profil" style={{ color: "white", marginLeft: "2rem" }}>
            <h3 >Bienvenue {userdata.pseudo}</h3>
            </NavLink>
            <LogOut />
          </>
          : 
          <NavLink exact to="/Profil" style={{
    color: "white", textDecoration: 'none'
            }}>   
          <Button color="inherit" ><Typography>Login</Typography></Button>
          </NavLink>}
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </div>
  );
}
