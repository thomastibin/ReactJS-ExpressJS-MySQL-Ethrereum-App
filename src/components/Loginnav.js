import React from 'react'
import { BrowserRouter as Router,Route ,Switch,Link, withRouter} from "react-router-dom";
import {ReactSession} from 'react-client-session';

function Loginnav(  props) {
  const logoutt = (r) =>{
    r.preventDefault();
    ReactSession.remove("username")
    ReactSession.remove("email")
    props.history.push('/sign-in');
  }
    return (
        <div>
            <Router>
            <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container" >
        
          <div className=" " id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">View</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add-case" >Add Case </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add-evid" >Add Evidence </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logoutt} >Logout </Link>
              </li>
            </ul>
          </div>
          
        </div>
        
      </nav>
      </Router>
      <hr></hr>
       
        </div>
    )
}

export default withRouter(Loginnav) 
