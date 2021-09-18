import React, { useState} from 'react'
import { BrowserRouter as Router ,Link, withRouter} from "react-router-dom";
import {ReactSession} from 'react-client-session';
import './login.css'
import { Container, Row, Col } from 'react-grid-system';
import Axios from 'axios'

const detailSample= {email:"a@a.in",password:"123"}
//const appContext = createContext()
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};
ReactSession.setStoreType("localStorage");
function Login(props) {


  if(ReactSession.get("username"))
  {
    props.history.push('/dashboard');
  }

    const  [details, setDetails] = useState({email:"",password:""})
    const [err, seterr] = useState("")
    
    const submitForm = (r)=>{
       
       r.preventDefault();
       const params = new URLSearchParams();
       params.append('email', details.email)
       params.append('password', details.password)
     

       
       Axios.post('http://localhost:3002/check-credentials',params,{headers}).then((response) => {
        //console.log(response.data)
            
        if(response.data.status==1) 
        {
          ReactSession.set("username", response.data.first);
          ReactSession.set("email", response.data.email);
          props.history.push('/dashboard')
      
      }
        
      else
      seterr("Email or password not correctt")
      }).catch( (error) => {
        
        console.log( error+"df") 
        seterr("Email or password not correct")
      })
              
    }

    const opensignup = (r) =>
    {   r.preventDefault();
        props.history.push('/sign-up')
    }
    return (
        <div>
            <Router>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container" >
        
          <div className=" " id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" href="/sign-in">Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={opensignup}>Sign up</Link>
              </li>
            </ul>
          </div>
          
        </div>
        
      </nav>
      <hr></hr>

      <br/><br/>
      
          
       
          </Router>
            <Container>
                <Row style={{color:"red"}   }> <Col  sm={12} lg={12}><center>  {err} </center> </Col></Row>
                 <Row>
                     <Col sm={12} lg={6}>
                <h1>Lorem Ipsum</h1>
                <p style={{textAlign: 'justify',color:'#1B3D6C'}}>
                Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.
                </p>
                </Col>
            
    
                <Col sm={12} lg={6}>
        <div className='login'>
              <div className='in'>
            <form onSubmit={submitForm}>
                <h3>Sign In</h3>

                <div className="form-group">
                     
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e => setDetails({...details,email:e.target.value}) } value={details.email}/>
                </div>
                <br></br>
                <div className="form-group">
                     
                    <input type="password" className="form-control" placeholder="Enter password" onChange={f => setDetails({...details,password:f.target.value}) } value={details.password} />
                </div>
                <br></br>
                
                <br></br>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <br></br>
               
            </form>
            </div>
        </div>
        </Col>
        </Row>
        </Container>
        
        </div>
    )
}

export default withRouter(Login)
