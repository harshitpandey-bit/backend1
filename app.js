const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app=express();
const port = process.env.PORT || 3000;
const cors = require('cors')


//middleware
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());


// simulated database

const users = [
            {id :1,username:"harshit",password:"12345"},
            
            {id :2,username:"peeush",password:"1234"}
        ]
        
        
       
// login route

app.get("/",(req,res)=>{
    res.send("hello world")
})
app.post("/api/login",(req,res)=>{
const {username,password}= req.body
const  user=users.find(u=>u.username=== username && password === password)
if(user)
{
    res.cookie("userId",user.id);
    res.json({message : "login successful",login:false})
}
else{
    res.status(401).json({message:'Invalid Credential'})

}
// logout route
app.post("/api/logout",(req,res)=>{
    res.clearCookie("userId");
    res.json({message:"Logout Successfully",login:true})
})
})

app.listen(port,()=>{
    console.log("server started");
});