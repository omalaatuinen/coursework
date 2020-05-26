const fs = require("fs");
const http = require("http");
hostName = "127.0.0.1";
const port = 3000;


fs.readFile('index.html', (err, html)=>{
    if (err){
        throw err;
    }

    const server = http.createServer((req, res)=>{
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        res.write(html);
        res.end();
    });
    server.listen(port, hostName, ()=>{
        console.log(`server has started on port ${port} .`);
    });


});



