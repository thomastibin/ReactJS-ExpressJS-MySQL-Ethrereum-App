import {React,useState} from 'react'
import {ReactSession} from 'react-client-session';
import { Container, Row, Col } from 'react-grid-system';
import { BrowserRouter as Router,Route ,Switch,Link, withRouter} from "react-router-dom";
import Loginnav from './Loginnav';
import './signup.css'
import Axios from 'axios'
const namee=ReactSession.get("email");
function Insert() {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
const [caseName, setCaseName] = useState("")
const [reason, setReason] = useState("")
const [status, setstatus] = useState("")
    const addCase =(e) => {
        
        e.preventDefault()
       
        const params = new URLSearchParams();
        params.append('caseName', caseName)
        params.append('reason', reason)
        params.append('pid',namee)
        
        

        Axios.post('http://localhost:3002/add-case',params,{headers}).then((response) => {
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
        <div>
            
            <Loginnav></Loginnav>
            <Row className="row d-flex justify-content-center"> <Col width={'100%'} lg={6} sm={12}  >
        <div className="box">
        <br/>  <br/>  <br/>
                <h2 className="message">{status}</h2>
                <h3>Add New Case</h3>
                <form onSubmit= {addCase}>
                
                <br/>
                <div className="form-group">
                    <label>Case name</label>
                    <input type="text" className="form-control" placeholder="Case Name" onChange={(e)=> {
                        setCaseName(e.target.value)
                    }}/>
                </div>
                <br/>
                <div className="form-group">
                    <label>Reason</label>
                    <input type="text" className="form-control" placeholder="Reason" onChange={(e)=> {
                        setReason(e.target.value)
                    }} />
                </div>

                <br/>

                <button type="submit" className="btn btn-primary btn-block">Add new Case</button>
           <br/> <br/> <br/> <br/>
               
            </form>
            
        </div>
        </Col></Row>
        </div>
        </Container>
    )
}

export default withRouter(Insert)
