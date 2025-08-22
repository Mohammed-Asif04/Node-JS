const express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const app = express();
const port = 8000;

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
app.get('/users', (req , res)=>{
    const html = `
       <ul>
          ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
       </ul>
    `
    return res.send(html);
});

app.get('/api/users', (req , res)=>{
    return res.json(users);
});

// app
// .route('/api/users/:id')
// .get((req , res)=>{
//      const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     return  res.json(user);
// })
// .post((req , res)=>{
//     //TODO: Create new user
//     return res.json({status: 'Pending'});
// })
// .patch((req , res)=>{
//     //TODO: Edit the user with id
//     return res.json({status: 'Pending'});
// })
// .delete((req , res)=>{
//     //TODO: Delete the user with id
//     return res.json({status: 'Pending'});
// });

app.get('/api/users/:id', (req , res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return  res.json(user);
});


app.post('/api/users', (req , res)=>{
    const body = req.body;
    users.push({id: users.length + 1 ,...body });
    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users) , (err,data)=>{
     return res.json({status: 'Success' , id: users.length + 1});
    });
   
})
app.patch('/api/users/:id', (req , res)=>{
    //TODO: Edit the user with id
    return res.json({status: 'Pending'});
})
app.delete('/api/users/:id', (req , res)=>{
    //TODO: Delete the user with id
    return res.json({status: 'Pending'});
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});