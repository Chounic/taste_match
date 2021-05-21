import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { UidContext } from "./components/AppContext";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil';
import Following from './pages/Following';
import Followers from './pages/Followers';
import SearchFriends from './pages/SearchFriends';
import axios from 'axios';
import Navbar from './components/Navbar';
import LeftNav from './components/LeftNav';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux' ;
import { getUser } from './actions/user.actions' ;
import Background from './images/main_background.jpg' ;
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

  background: {
    '&:after': {
      content: '""',
      backgroundImage: "url(" + Background + ")" ,
      backgroundSize: 'cover', 
      backgroundRepeat: 'repeat',
      position: 'absolute',
      top: '15rem' ,
      right: '0px' ,
      bottom: '0px' ,
      left: '0px' ,
      opacity: '0.2'
    }
  }
}));

function App() {


  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchToken = async () => {
      await axios({
        method: "get", 
        url: `/api/jwtid`, 
        withCredentials: true
      })
      .then( res => {
        setUid(res.data);
      })
      .catch( err => console.log('No token'));
    };
    fetchToken();

    if (uid) {
      dispatch(getUser(uid) )
    }
  }, [uid]);

  const classes = useStyles();

  return (
  <UidContext.Provider value={uid}>
    <Router>
      <div><Navbar /></div>
      <Container maxWidth="lg" disableGutters >
        <div  /*className={classes.background} */>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/profil" exact component={Profil} />
            <Route path="/Following" exact component={Following} />
            <Route path="/Followers" exact component={Followers} />
            <Route path="/SearchFriends" exact component={SearchFriends} />
            <Redirect to="/" />  
          </Switch>
        </div>
      </Container>
    </Router>
  </UidContext.Provider>
  );
}

export default App;
