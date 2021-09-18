import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router,Route ,Switch, withRouter} from "react-router-dom";


import { Container, Row, Col } from 'react-grid-system';

import image_banner from  './images/banner.jpg'
import login from './components/login';
import dashboard from './components/dashboard';
import signup from './components/signup';
import Insert from './components/Insert';
import addevid from './components/addevid';


function App() {
  const [user, setUser] = useState({email:"",name:""})
  const [error, seterror] = useState("")
  



  return (
    
    
    <div className="App" >


                      <img src={image_banner} width="100%" height="20%" style={{backgroundColo:"red"}} alt="not" />
                      
                      <br/>  <br/>  <br/>

         <Router>
        <Switch>
        <Route exact path="/add-case" component={(Insert)} />
        <Route exact path="/add-evid" component={(addevid)} />
        <Route exact path="/sign-up" component={withRouter(signup)}></Route>
        <Route   exact path="/sign-in" component={withRouter(login)}></Route>
        <Route exact path="/dashboard" component={withRouter(dashboard)}/>
        <Route   exact path="/" component={withRouter(login)}></Route>

</Switch>


</Router>
    </div>
    
    
  );
}

export default App;