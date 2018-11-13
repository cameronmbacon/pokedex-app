// required modules and packages
const http = require('http');

// local variables and constants
const PORT = process.env.PORT || 3000;

// create server
const server = http.createServer((request, response) => {
    // set response for default url
    if (request.url === '/') {
        response.write('Server is listening...');
        response.end();
    }
});

// set server to listen for requests on PORT
server.listen(PORT);

// console log to validate server is listening
console.log('Server is listening on port', PORT);
