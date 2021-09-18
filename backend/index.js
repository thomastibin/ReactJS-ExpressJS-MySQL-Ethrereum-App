const express=require('express')
const app=express()
const mysql= require('mysql') 

const cors=require('cors')
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


const db=mysql.createConnection ({

    user:'root',
    host:'localhost',
    password: '',
    database: "evidence"
})

var contract=null;
const Web3 = require('web3');
var web3=null;
const Mycontract = require("./build/contracts/Evidence.json")
var address=null;
const init = async () => {
    if(!(new Web3("http://localhost:8545")))
  {
      console.log("ganache not connected");
  }
  web3= new Web3("http://localhost:8545");
  
 const id = await web3.eth.net.getId();
 address=await web3.eth.getAccounts();
 console.log("dafter");
 console.log(id); 
 const deployedNetwork =Mycontract.networks[id];
 //console.log(deployedNetwork); 
  contract= new web3.eth.Contract(

    Mycontract.abi,
    deployedNetwork.address
 )



}
init();
app.get("/",async (req,res) =>{

   res.send("connected to backend")
    
    
    })


app.post("/getCase",async (req,res) =>{

    console.log(req.body)
    const pid= req.body.email;
      const result = await contract.methods.viewCase(pid).call();
      //  console.log(result);
        res.send(result);
    
    
    })

    app.post("/getEvid",async (req,res) =>{
        console.log(req.body)
         const casenumber= req.body.Item;
          const result = await contract.methods.viewEvid(casenumber).call();
            console.log(result);
            res.send(result);
        
        
        })



app.post('/add-employee',(req,res)=>{
    
    //console.log(req.body)
     
     const fn= req.body.fn;
     const ln=req.body.ln;
     const email= req.body.email
     const pwd=req.body.pwd
     const type=1
     //console.log("insert into employee (email,first_name, last_name) values (?,?,?)",[email,fn,ln])
     db.query("insert into employee (email,first_name, last_name) values (?,?,?)",[email,fn,ln], (err)=>{
         if(err)
         {
             console.log("err1")
             res.send("0")
              

         }
         else
         {   db.query("insert into login  values (?,?,?)",[email,pwd,type],(err2)=>{
            
            if(err2)
            {console.log("err2")
                res.send("0")
                

            }
            else{
                res.send("1")
            }
         })
             
         }
     })

})
 

app.post('/add-case',async (req,res)=>{
    
     
     const caseName= req.body.caseName;
     const reason=req.body.reason;
     const pid=req.body.pid;
     const type=1
     //console.log(req.body);
     console.log(address[0])
    ////////////////////////

const resultc = await contract.methods.createCase(caseName,reason,pid).estimateGas({
         from:address[0],
         });
     console.log(resultc)

    await contract.methods.createCase(caseName,reason,pid).send({
        from:address[0], gas:resultc,
     }).then(()=>res.send("1")).catch((error)=>{
    res.send(error)}
     );
///////////////////////////////////
    // const result = await contract.methods.createCase(caseName,reason,pid).estimateGas({
    //      from:address[0],
    //      });
    //  console.log(result)

///////////////////////

    /* await  contract.methods.createCase(caseName,reason,pid).send({
        from:address[0], gas:124077,
     }).then(()=>res.send("Successfully added....")).catch((error)=>{
    res.send(error)}
     );*/
     
    
   // res.send("ok")
     

})


app.post('/add-evid',async (req,res)=>{
    
     
    const caseid =req.body.caseid;
    const evidtype=req.body.evidtype;
    const modelno=req.body.modelno;
    const serial=req.body.serial;
    const contentOwner=req.body.contentOwner;
    const contentDescription=req.body.contentDescription;
    const ownerContact=req.body.ownerContact;
    const agent =req.body.agent;
    const method=req.body.method;
    const hash=req.body.hash;
    const Time=req.body.Time;
    const agentInfo=req.body.agentInfo;
    const pid=req.body.pid;
    console.log(req.body);
    console.log(address[0])


    // get crypto module
const crypto = require("crypto");

// string to be hashed
const str = hash+evidtype+modelno+serial;

// secret or salt to be hashed with
const secret = "password";

// create a sha-256 hasher
const sha256Hasher = crypto.createHmac("sha256", secret);

// hash the string
// and set the output format
const hashofhash = sha256Hasher.update(str).digest("hex");

   ////////////////////////
   const data=[caseid,evidtype,modelno,serial,contentOwner,contentDescription,ownerContact];
   //const data=caseid+","+evidtype+","+modelno+","+serial+","+contentOwner+","+contentDescription+","+ownerContact;

   const result = await contract.methods.createEvid(data,agent,method,hash,Time,agentInfo,pid,hashofhash ).estimateGas({
        from:address[0],
        });
    console.log("estimate"+result)


   await contract.methods.createEvid(data,agent,method,hash,Time,agentInfo,pid,hashofhash ).send({
       from:address[0], gas:result,
    }).then(()=>res.send("1")).catch((error)=>{
   res.send(error)}
    );
///////////////////////////////////
//    const result = await contract.methods.createEvid(data,agent,method,hash,Time,agentInfo,pid,hashofhash ).estimateGas({
//         from:address[0],
//         });
//     console.log("estimate"+result)

///////////////////////

  
    
   
   //res.send("ok")
    

})


app.post('/check-credentials',(req,res)=>{
    console.log("checking credentials")




    console.log(req.body)
     
      const email= req.body.email
     const password=req.body.password
     console.log(email)
     const s="select * from login where username='"+email+"' and  password='"+password+"'"
     console.log("select * from login where username='"+email+"' and  password='"+password+"'")

     db.query("select * from login where username='"+email+"' and  password='"+password+"'", (err,result,fields)=>{
         if(err)
         {
             console.log(err)
             res.send("err")

         }
         else
         {  console.log(result.length);
            console.log("select first_name from employee where email='"+email+"'")
             if(result.length!=0 && result[0].username==email && result[0].password==password)
             
             {  db.query("select * from employee where email='"+email+"'",(error,r) => {
                    if(!error)
                    {
                        fn=r[0].first_name
                        console.log({status:"1",first:fn})
                        res.send({status : "1",first : fn,email: email})
                    }
                    else
                    {
                        res.send({status:"0"}) 
                    }

             })
                
         
            }
              else
              res.send({status:"0"})
         }
     })

})


app.listen(3002,()=> {
    console.log("Server at 3002")
})




