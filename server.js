const http = require('http');
const apiRequestHandler = require('./api');
const server = http.createServer();
const Db = require("./database/config");
const { parseBody } = require("./utilities/utilities");
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');
require('dotenv').config();

const serve = serveStatic('public', { 'index': ['index.html'] })

let client = null;

new Db(process.env.MONGODB_URI, "hng")
.then(instance=> {
    client = instance;
})
.catch((err)=> {
    throw err
});


//add json object to response object;
http.ServerResponse.prototype.json = function(json, status){
    json = typeof json === "string" ? json : JSON.stringify(json);
    status = status || 200;
    this.writeHead(status, {
        'Content-Length': Buffer.byteLength(json),
        'Content-Type': "application/json"
    });
    this.end(json); 
}


server.on('request', async function(request, response){
    const { url } = request;
    const isApiRequest = url.startsWith("/api");
    if(isApiRequest){
        await parseBody(request);
        apiRequestHandler(request, response, client);
        return;
    }

    //code to serve frontend pages;
    serve(request, response, finalhandler(request, response));
});

// start server on port 4000
server.listen(process.env.PORT);