import {React,useState,useEffect} from 'react'
import {ReactSession} from 'react-client-session';
import { Container, Row, Col } from 'react-grid-system';
import { BrowserRouter as Router,Route ,Switch,Link, withRouter} from "react-router-dom";
import Loginnav from './Loginnav';
import './signup.css'
import Axios from 'axios'
import Select from 'react-select';
const namee=ReactSession.get("email"); 

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };


function Addevid() {
    const [caseList,setCase]=useState([])
    const [evidences,setEvidences]=useState({})
    const [responses, setresponses] = useState([])
    const [item, setitem] = useState("")
    const [evidtype,setevidtype]=useState("")
    const[modelno,setmodelno]=useState("")
    const[serial,setSerial]=useState("")
    const[contentOwner,setContentOwner]=useState("")
    const[contentDescription,setContentDescription]=useState("")
    const[ownerContact,setOwnerContact]=useState("")
    const[agent,setAgent]=useState("")
    const[method,setMethod]=useState("")
    const[hash,setHash]=useState("")
    const[Time,setTime]=useState("")
    const[agentInfo,setAgentInfo]=useState("")
    const [status, setstatus] = useState("")
    const addEvid=(e) => {
        
        e.preventDefault()
       
        const params = new URLSearchParams();
        params.append('caseid',item )
        params.append('evidtype', evidtype)
        params.append('modelno',modelno)
        params.append('serial',serial)
        params.append('contentOwner',contentOwner)
        params.append('contentDescription',contentDescription)
        params.append('ownerContact',ownerContact)
        params.append('agent',agent)
        params.append('method',method)
        params.append('hash',hash)
        params.append('Time',Time)
        params.append('agentInfo',agentInfo)
        params.append('pid',namee)
        
        

        Axios.post('http://localhost:3002/add-evid',params,{headers}).then((response) => {
         if(response.data===1)   
        setstatus("Successfully added");

        else
        setstatus("Error in adding");
        console.log(response)
        
        }).catch( (error) => {
            setstatus("Error in adding");
            console.log( error)
        
        })
        
    }






    useEffect(() => {
        const params = new URLSearchParams();
        params.append('email', ReactSession.get("email"))
        //need the change pid in backend..assigne as :tbin
        Axios.post('http://localhost:3002/getCase',params,{headers}).then((response) => {
           console.log(response.data);
            setresponses(response.data)
             
         
       }).catch( (error) => {
         
         console.log("error in post" + error)
       })
          return () => {
              //on unmounting
          }
      }, [])



      useEffect(() => {
        if(responses.length)
        {   var temp=[];
            
             const noofcase=responses.length;
             
             
             for(var i=0;i<noofcase;i++)
              {
                  var t=[{label:responses[i][0],value:responses[i][1]}]
                  
                  temp = [...temp, ...t]
                   
              }
              
            setCase(temp)
    
            var tempevid={};
           
             for( i=0;i<noofcase;i++)
              {
                  
                var ev={[responses[i][1]]:{name1:responses[i][0],reason:responses[i][2]}}
                
                tempevid = {...ev, ...tempevid}
                       
              }
              
            setCase(temp)
            setEvidences(tempevid)
    
        }
          return () => {
              
          }
      }, [responses])

    const choose = (e) =>{  
        console.log(e.value) 
        document.getElementById("eachItem").style.display="block "
        setitem(e.value)
    }


    return (
        <div>
          <Loginnav></Loginnav>
            <h4 style={{color:"red"}}>{status}</h4>
          <Container width={'100%'} >
            <Row className="row d-flex justify-content-center"> 
            <Col width={'100%'} lg={6} sm={12}  >
        
             
                 <br/>
                  <div className='listbox'>
                      <Row>
                          <Col width={'100%'} lg={12} sm={12}> <h4>  Your CaseList  </h4>
                          </Col>
                      </Row>
                      <br></br>
                      
                      <Row>
                          <Col width={'100%'} lg={12} sm={12}>
                              <Select id="cases" options={ caseList }  onChange = {(e) => choose(e)}/>
                              </Col>
                      </Row>
                      <br></br>
                  
                  </div>   
                  
                  <br></br>
                  <Row className="row d-flex justify-content-center">
                      <Col width={'100%'} sm={12} lg={12}>

                          <br/>
                  <div className="box" id="eachItem" style={{display:"block"}}>
                      <form onSubmit= {addEvid}>
                  <br/>  <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Evidence Type</label>
                    <input type="text" className="form-control" placeholder="Evidence Type" onChange={(e)=> {
                        setevidtype(e.target.value)
                    }} />   
                          </Col>
                      </Row>
                      <br/>  
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Model Number</label>
                    <input type="text" className="form-control" placeholder="Model Number" onChange={(e)=> {
                        setmodelno(e.target.value)
                    }} />   
                          </Col>
                      </Row>
                  
                      <br/>
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Serial Number</label>
                    <input type="text" className="form-control" placeholder="Serial Number" onChange={(e)=> {
                        setSerial(e.target.value)
                    }} />   
                          </Col>
                      </Row>


                      <br/>
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Content Owner</label>
                    <input type="text" className="form-control" placeholder="Content Owner" onChange={(e)=> {
                        setContentOwner(e.target.value)
                    }} />   
                          </Col>
                      </Row>


                      <br/>
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Content Description</label>
                    <input type="text" className="form-control" placeholder="Content Description" onChange={(e)=> {
                        setContentDescription(e.target.value)
                    }} />   
                          </Col>
                      </Row>


                      <br/>
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Owner Contact</label>
                    <input type="text" className="form-control" placeholder="Owner Contact" onChange={(e)=> {
                        setOwnerContact(e.target.value)
                    }} />   
                          </Col>
                      </Row>

                      <br/>
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Forensic Agent</label>
                    <input type="text" className="form-control" placeholder="Forensic Agent" onChange={(e)=> {
                        setAgent(e.target.value)
                    }} />   
                          </Col>
                      </Row>


                      <br/>
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Creation Method</label>
                    <input type="text" className="form-control" placeholder="Creation Method" onChange={(e)=> {
                        setMethod(e.target.value)
                    }} />   
                          </Col>
                      </Row>


                      <br/>
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>HASH value</label>
                    <input type="text" className="form-control" placeholder="HASH value" onChange={(e)=> {
                        setHash(e.target.value)
                    }} />   
                          </Col>
                      </Row>


                      <br/>
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Creation Date,Time</label>
                    <input type="text" className="form-control" placeholder="Date,Time" onChange={(e)=> {
                        setTime(e.target.value)
                    }} />   
                          </Col>
                      </Row>
                        <br/>
                      <Row>
                          <Col width={'100%'} sm={12} lg={12}>
                          <label>Forensic Agent Contact Information</label>
                    <input type="text" className="form-control" placeholder="Agent Contact" onChange={(e)=> {
                        setAgentInfo(e.target.value)
                    }} />   
                          </Col>
                      </Row>
<br></br>
                      <Row >
                          <Col  width={'100%'} sm={12} lg={12} style={{justifyContent: "center",display:"flex"}}> 
                          <button type="submit"> Submit</button>  
                          </Col>
                      </Row>


                        </form>
                  </div>
                  
                  </Col></Row>
                  
                  </Col> 
                  </Row>    
             </Container>
                  
          
          
          
            
        </div>
    )
}

export default Addevid
