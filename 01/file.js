const { log } = require('console');
const fs = require('fs');

// Synchronous
// fs.writeFileSync('./test.txt', 'Hello World!');

// Asynchronous
// fs.writeFile('./test.txt', 'Hello World! Asif', (err) =>{})

// const result = fs.readFileSync('./contact.txt', 'utf8');
// console.log(result);

// fs.readFile('./contact.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.log("Error",err);
//     } else {
//         console.log(data);
//     }
// });

// fs.appendFileSync('./contact.txt', `Asif\n`);``

const os = require('os');
console.log(os.cpus().length);
