
// var rect = require('./rectangle');

// function solveRect(l,b) {
//     console.log("Sloving for rectangle with l = "
//          + l +" and b = " + b );
//     rect(l,b, (err,rectangle) => {
//         if (err) {
//             console.log("ERROR: ", err.message);
//         }
//         else{
//             console.log("The area of the rectangle of dimensions l = " 
//                 + l + " and b = " + b +" is " + rectangle.area());
//             console.log("The perimeter of the rectangle of dimensions l = " 
//                 + l + " and b = " + b +" is " + rectangle.perimeter());
//         }
//     });
//     console.log("This statement after the call to rect()");          
// }

// solveRect(2,4);
// solveRect(3,5);
// solveRect(0,5);
// solveRect(-3,5);






// const morgan = require('morgan');
// const express = require('express'),

// http = require('http');

// const hostname = 'localhost';
// const port = 3000;

// const app = express();
// app.use((req, res, next) => {
//   console.log(req.headers);
//   res.statusCode = 200;	  res.setHeader('Content-Type', 'text/html');
//   res.end('<html><body><h1>This is an Express Server</h1></body></html>');

// });

// const server = http.createServer(app);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + ' not a HTML file</h1></body></html>');
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



// app.use(morgan('dev'));

// app.use(express.static(__dirname + '/public'));

