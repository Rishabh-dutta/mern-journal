const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User=require('./models/User')
//8MVlwrTu9mcavGWt
//mongodb+srv://schizophrenic2003:8MVlwrTu9mcavGWt@cluster0.smzgfmq.mongodb.net/?retryWrites=true&w=majority
const cors=require('cors')

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://schizophrenic2003:8MVlwrTu9mcavGWt@cluster0.smzgfmq.mongodb.net/?retryWrites=true&w=majority');

const port=4000;
app.post('/register',async (req,res)=>{
   
    const {username,password}=req.body;
    try{
    const userDoc=await User.create({username,password});
    console.log(userDoc);
    //res.json({requestData:{username,password}});
   //res.header({'username': username})
    res.json(userDoc);
    }
    catch(e)
    {
        res.status(400).json(e);
    }
    
});

app.listen(port,()=>{
    console.log(`listening at port: ${port}`)
});