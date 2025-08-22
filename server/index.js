
// const fs = require('fs')
// const http = require('http');
// const url = require('url');
const express = require('express');

const app = express();

app.get('/', (req , res)=>{
    return res.send('Home Page');
});
app.get('/about', (req , res)=>{
    return res.send('About Page');
});

// function myHandler(req , res){
//     if(req.url.includes('favicon')){
//         res.end();
//         return;
//     }
//     const log =`${Date.now()}: ${req.method} New Request Receive\n`;
//     const myUrl = url.parse(req.url ,true);
//     fs.appendFile('log.txt', log, (err , data)=>{
//         switch(myUrl.pathname){
//             case '/': 
//             if(req.method === 'GET'){
//                 res.end('Home Page');
//             }
//             break;
//             case '/about':
//                 const username = myUrl.query.myName;
//              res.end(`hi ${username}`);
//             break;
//             case '/signup':
//              if(req.method === 'GET'){
//                  res.end('Signup Page');
//              }
//              else if(req.method === 'POST'){
//                 //DB query
//                  res.end('Signup Success');
//              }
//             default : res.end('404 Not Found');
//         }
//     });
// }

// const myServer =http.createServer(app);

// myServer.listen(8000, ()=> console.log("Server is listening on port 8000"));

app.listen(8000, ()=> console.log("Server is listening on port 8000"));

