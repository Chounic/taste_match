import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { UidContext } from "./components/AppContext";
import './App.css';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Following from './pages/Following';
import Followers from './pages/Followers';
import SearchFriends from './pages/SearchFriends';
import axios from 'axios';
import Navbar from './components/Navbar';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux' ;
import { getUser } from './actions/user.actions' ;





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


  return (
   
    <div  className="container" >
      <div className="background"></div>
      <div className="main">
        <UidContext.Provider value={uid}>
          <Router>
            <Navbar />
            <Container maxWidth="lg" disableGutters >
              
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/profil" exact component={Profil} />
                  <Route path="/Following" exact component={Following} />
                  <Route path="/Followers" exact component={Followers} />
                  <Route path="/SearchFriends" exact component={SearchFriends} />
                  <Redirect to="/" />  
                </Switch>
            
            </Container>
          </Router>
        </UidContext.Provider>
      </div>
    </div>

  );
}

export default App;
