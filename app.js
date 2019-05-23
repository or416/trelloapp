const http = require('http');
const onRequest = require('./Servidor');
const readData=require('./LeerDatos');


readData();

   


http.createServer(onRequest).listen(8000);
