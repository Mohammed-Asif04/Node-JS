const express = require('express');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const port = 8000;

//Connect to MongoDB
mongoose
.connect('mongodb://127.0.0.1:27017/Learning-NodeJS')
.then(()=>{
    console.log('MongoDB Connected');
})
.catch((err)=>{
    console.log('MongoDB Connection Error' , err);
});

//Schema
const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    job_title:{
        type: String,
    },
    gender:{
        type: String,
    }
},
{timestamps: true}
);

const User = mongoose.model('User' , userSchema);

//Middleware-Plugins
app.use(express.urlencoded({extended: false}));

app.use((req , res , next)=>{
    fs.appendFile('log.txt', `${Date.now()}: ${req.method}: ${req.path}\n` , (err , data)=>{
        next();
    });
});
// app.use((req , res , next)=>{
//     console.log('Hello from middleware 1');
//     next();  
// })

// app.use((req , res , next)=>{
//     console.log('Hello from middleware 2');
//     //db query
//     // credit card info
//     next();  
// })

//Routes
app.get('/users', async (req , res)=>{
    const allDbUsers = await User.find({});
    const html = `
       <ul>
          ${allDbUsers.map((Users) => `<li>${Users.first_name} - ${Users.email}</li>`).join('')}
       </ul>
    `
    return res.send(html);
});

app.get('/api/users', async (req , res)=>{
    const allDbUsers = await User.find({});
    // res.setHeader('My-Name' , 'Mohammed Asif') //Custom Header
    // Always add X to custom headers
    return res.json(allDbUsers);
});


// app
// .route('/api/users/:id')
// .get((req , res)=>{
//      const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     return  res.json(user);
// })
// .post((req , res)=>{
//     const body = req.body;
//     if (
//         !body ||
//         !body.first_name ||
//         !body.last_name ||
//         !body.email ||
//         !body.job_title ||
//         !body.gender
//     ){
//         return res.status(400).json({status: 'Error' , message: 'Please provide all the required fields'});
//     }

// })

app.get('/api/users/:id',async (req , res)=>{
    const user = await User.findById(req.params.id);
    return  res.json(user);
    
    //manually
    // const id = Number(req.params.id);
    // const user = users.find((user)=> user.id === id);
    // return  res.json(user);
});


app.post('/api/users', async(req , res)=>{
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.job_title ||
        !body.gender
    ){
        return res.status(400).json({status: 'Error' , message: 'Please provide all the required fields'});
    }
    const result=  await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender
    })
    return res.status(201).json({ msg : 'Success'})
 })

app.patch('/api/users/:id',async (req , res)=>{
    await User.findByIdAndUpdate(req.params.id , {last_name: 'Changed'});
    return  res.json({status: 'Success'});
 })

app.delete('/api/users/:id',async (req , res)=>{
    await User.findByIdAndDelete(req.params.id);
    return  res.json({status: 'Success'});
});
  

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});