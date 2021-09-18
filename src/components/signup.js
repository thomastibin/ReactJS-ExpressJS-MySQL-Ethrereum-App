import React from 'react'
import './signup.css'
import { withRouter } from 'react-router-dom'
import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system';

import Axios from 'axios'
function Signup() {
    const  [email, setEmail] = useState("")
    const [fn, setFirstName] = useState("")
    const [ln, setLastName] = useState("")
    const [status, setstatus] = useState("")
    const [password, setPassword] = useState("")

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    const addEmployee =(e) => {
        
        e.preventDefault()
       
        const params = new URLSearchParams();
        params.append('email', email)
        params.append('fn', fn)
        params.append('ln', ln) 
        params.append('pwd',password)
        

        Axios.post('http://localhost:3002/add-employee',params,{headers}).then((response) => {
         if(response.data===1)   
        setstatus("Successfully added");

        else
        setstatus("Already Registered");
        console.log(response)
        
        }).catch( (error) => {
            setstatus("already registered");
            console.log( error)
        
        })
        
    }
    return (
        <Container width={'100%'} >
            <Row className="row d-flex justify-content-center"> <Col width={'100%'} lg={6} sm={12}  >
        <div className="box">
                <br/>  <br/>  <br/>
                <h2 className="message">{status}</h2>
                <h3>Sign Up</h3>
                
            <form onSubmit={addEmployee}>
            <Row>
                <Col width={'100%'} lg={12} sm={12}>
            <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={(e)=> {
                        setEmail(e.target.value)
                    }}/>
            </div>
            </Col>
            </Row>
            <Row>
                <Col width={'100%'} lg={12} sm={12}>
            <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={(e)=> {
                        setPassword(e.target.value)
                    }}/>
                </div>
</Col></Row>
<Row>
                <Col width={'100%'} lg={12} sm={12}>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="fn" className="form-control" placeholder="First name"  onChange={(e)=> {
                        setFirstName(e.target.value)
                    }}/>
                </div>
                </Col></Row>
<Row>
                <Col width={'100%'} lg={12} sm={12}>  
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" name ="ln" className="form-control" placeholder="Last name" onChange={(e)=> {
                        setLastName(e.target.value)}} />
                </div>
                </Col></Row>
                
            <Row>
                <Col width={'100%'} lg={12} sm={12}> 

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        </Col></Row>
                <p className="forgot-password text-right">
                    
                   Already registered <a href="/sign-in">sign in?</a>
                  


                   
                   
                 
                </p>
                </form>
                </div>
                </Col></Row>
                </Container>
        
    )
}

export default  withRouter(Signup)
