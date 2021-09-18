import {React,useEffect,useState} from 'react'
import Axios from 'axios'
import {ReactSession} from 'react-client-session';
import { Container, Row, Col } from 'react-grid-system';
import { BrowserRouter as Router,Route ,Switch,Link, withRouter} from "react-router-dom";
import Select from 'react-select';
import './dashboard.css'
import Loginnav from './Loginnav';
const namee=ReactSession.get("username"); 
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };


function Dashboard() {
    const [responses, setresponses] = useState([])
    const [evidences,setEvidences]=useState({})
    const [caseList,setCase]=useState([])
    const [caseName, setCaseName] = useState("")
     const [reason, setreason] = useState("")
     const [item, setitem] = useState("")

    const choose = (e) =>{   
        console.log(e.value)  
        // console.log(caseList)
         setCaseName(evidences[e.value]["name1"])
         setreason(evidences[e.value]["reason"])
        document.getElementById("eachItem").style.display="block "
        setitem(e.value)

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

  const getItems= () =>{

    const params = new URLSearchParams();
    params.append('Item', item)
    //need the change pid in backend..assigne as :tbin
    Axios.post('http://localhost:3002/getEvid',params,{headers}).then((response) => {
       console.log(response.data);
       document.getElementById("evid").style.display="block"
       var l=response.data.length
       console.log(l);
       var s='<div class="table-responsive-md"><table class="table" width="100%" border="1"><tr><th> Item Number </th><th> Evidence Type </th><th> Model Number </th><th> Serial Number </th><th> Content Owner </th><th> Content Descption </th><th> Owner Contact </th><th> Forensic Agent </th><th> Creation Method </th><th> Hash Value </th><th> Double Hash </th><th> Creation Date/Time </th><th> Agent Info </th></tr>'
       for(let i=0;i<l;i++)
       {
          s=s+'<tr><td>'+response.data[i][7]+'</td>';
          s=s+'<td>'+response.data[i][0][1]+'</td>';
          s=s+'<td>'+response.data[i][0][2]+'</td>';
          s=s+'<td>'+response.data[i][0][3]+'</td>';
          s=s+'<td>'+response.data[i][0][4]+'</td>';
          s=s+'<td>'+response.data[i][0][5]+'</td>';
          s=s+'<td>'+response.data[i][0][6]+'</td>';
          s=s+'<td>'+response.data[i][1]+'</td>';
          s=s+'<td>'+response.data[i][2]+'</td>';
          s=s+'<td>'+response.data[i][3]+'</td>';
          s=s+'<td>'+response.data[i][8]+'</td>';
          s=s+'<td>'+response.data[i][4]+'</td>';
          s=s+'<td>'+response.data[i][5]+'</td>';
          
        
          s=s+'</tr>';
         
       }

         s=s+'</table>'
         document.getElementById("evid").innerHTML=s;
     
   }).catch( (error) => {
     
     console.log("error in post" + error)
   })
    
  }           
    return (
        <div>
            
            <Loginnav></Loginnav>
             
           <Container >
             <Row className="row d-flex justify-content-center">
              <Col>
            <Row>
                <Col sm={6} lg={6}>
                    <h3> Welcome {namee}</h3></Col></Row>
               <br/>
                <div className='listbox'>
                    <Row>
                        <Col width={'50%'} lg={12} sm={12}> <h4>  Previously Uploaded Cases </h4>
                        </Col>
                    </Row>
                    <br></br>
                    
                    <Row>
                        <Col width={'50%'} lg={12} sm={12}>
                            <Select id="cases" options={ caseList }  onChange = {(e) => choose(e)}/>
                            </Col>
                    </Row>
                    
                    <br></br>
                    <div id="eachItem" style={{display:"none"}}>
                    <Row>
                    <Col width={'50%'} lg={12} sm={12}>
                     <div className="in">
                        <label > Name:  {caseName}</label>  <br/>
                        <label> Reason  {reason} </label>
                        <br></br>
                        <button onClick={getItems}> View Items</button>
                         
                         
                     </div>
                    </Col>
                    </Row>
                
                    </div>
                </div>   
                </Col> 
                </Row>  
                </Container>
                <Container fluid>
                <br></br>
                <Row><Col width={'100%'} sm={12} lg={12}>
                <div className="" id="evid" style={{display:"none"}}>
                    
                
                
                </div>
                
                </Col></Row>
                
                
           </Container>
                
        
        
        
        
        </div>
                

               
            
    )
}

export default withRouter(Dashboard)
