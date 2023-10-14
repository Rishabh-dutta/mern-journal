const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User=require('./models/User');
const bcrypt=require('bcryptjs');
const multer=require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'})
const fs=require('fs');
//8MVlwrTu9mcavGWt
//mongodb+srv://schizophrenic2003:8MVlwrTu9mcavGWt@cluster0.smzgfmq.mongodb.net/?retryWrites=true&w=majority
const cors=require('cors')
const salt=bcrypt.genSaltSync(10);
const secret='uhi23h953uh9gb394h8f297egf754w983';
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const  Post = require('./models/Post');
const Admin = require('./models/Admin');



app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://schizophrenic2003:8MVlwrTu9mcavGWt@cluster0.smzgfmq.mongodb.net/?retryWrites=true&w=majority');

const port=4000;
app.post('/register',async (req,res)=>{
    
   
    const {username,password}=req.body;
    try{

        const tempun=Array.from(username).join('');
        
       
        if(tempun.substring(2,7)==="admin")
        {
            console.log(tempun.substring(2,7))
            const adminDoc=await Admin.create({
                username,
                password:bcrypt.hashSync(password,salt)});
            
                console.log(adminDoc);
                res.json(adminDoc);
        }
        else
        {
    const userDoc=await User.create({
        username,
        password:bcrypt.hashSync(password,salt)});
    console.log(userDoc);
    //res.json({requestData:{username,password}});
   //res.header({'username': username})
    res.json(userDoc);
        }
    }
    catch(e)
    {
        res.status(400).json(e);
    }
    
});

app.post('/login',async (req,res)=>{
    const {username, password} = req.body;

    const adminDoc = await Admin.findOne({username});
    if(adminDoc)
    {
        
    const authorized = bcrypt.compareSync(password,adminDoc.password);
    console.log(authorized)
    if(!authorized)
    {
        res.status(400).json('wrong creds');
    }
    else{
        jwt.sign({username,id:adminDoc._id},secret, {}, (err,token)=>
        {
            if(err)
            throw err;
        res.cookie('token',token).json({
            id: adminDoc._id,
            username,
            isadmin: true,

        });
        });
    }
    }
    else
    {



    const userDoc = await User.findOne({username});
    if(userDoc)
    {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    //res.json(passOk);
    console.log(passOk);
    if(passOk)
    {
        jwt.sign({username,id:userDoc._id},secret, {}, (err,token)=>
        {
            if(err)
            throw err;
            res.cookie('token',token).json({
                id: userDoc._id,
                username,
                isadmin: false,
            });
        });
    }
    else
    {
        res.status(400).json('wrong creds');
    }
    }
    else
    {
        res.status(400).json('wrong creds');
    }
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


app.post('/submit',uploadMiddleware.single('file'),async (req,res)=>{
    const {originalname,path} = req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length - 1];
    const newPath =  path+'.'+ext;
    fs.renameSync(path,newPath)

    
    const {token}=req.cookies;
    //console.log(req.cookies);
    jwt.verify(token,secret,{},async (err,info) => {
        if(err)
        throw err;

        const {title,summary,content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
    
        });
        res.json(postDoc);
        //res.json(info);

    })
    







    
    //res.json({ext,title,summary,content});
    //res.json({files:req.file});
    
})


app.get('/post',async (req,res) => {
    
    res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    );
});



app.get('/post/:id', async (req,res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    //console.log(postDoc);
    res.json(postDoc);

})



app.listen(port,()=>{
    console.log(`listening at port: ${port}`)
});