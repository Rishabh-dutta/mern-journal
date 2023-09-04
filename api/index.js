const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User=require('./models/User');
const bcrypt=require('bcryptjs');
//8MVlwrTu9mcavGWt
//mongodb+srv://schizophrenic2003:8MVlwrTu9mcavGWt@cluster0.smzgfmq.mongodb.net/?retryWrites=true&w=majority
const cors=require('cors')
const salt=bcrypt.genSaltSync(10);
const secret='uhi23h953uh9gb394h8f297egf754w983';
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');



app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://schizophrenic2003:8MVlwrTu9mcavGWt@cluster0.smzgfmq.mongodb.net/?retryWrites=true&w=majority');

const port=4000;
app.post('/register',async (req,res)=>{
   
    const {username,password}=req.body;
    try{
    const userDoc=await User.create({
        username,
        password:bcrypt.hashSync(password,salt)});
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

app.post('/login',async (req,res)=>{
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    //res.json(passOk);
    console.log(passOk);
    if(passOk)
    {
        jwt.sign({username,id:userDoc._id},secret, {}, (err,token)=>
        {
            if(err)
            throw err;
            res.cookie('token',token).json('ok');
        });
    }
    else
    {
        res.status(400).json('wrong creds');
    }
})

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    //console.log(req.cookies);
    jwt.verify(token,secret,{},(err,info) => {
        if(err)
        throw err;
        res.json(info);

    })
    //res.json(req.cookies);
})


app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');

})


app.listen(port,()=>{
    console.log(`listening at port: ${port}`)
});