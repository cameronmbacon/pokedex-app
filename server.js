// required modules and packages
const https = require('https');
const fs = require('fs');
const Pokemon = require('./Pokemon.js');

// local variables and constants
var options;
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const pokeApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon';

// if NODE_ENV is not 'production' then require dotenv package and load local environment variables
if (!isProduction) {
    require('dotenv').config();
    // set options object for creating HTTPS server
    options = {
        pfx: fs.readFileSync('ssl/crt.pfx'),
        passphrase: process.env.PFX_PASSPHRASE
      };
}

// create server
const server = https.createServer(options, (request, response) => {
    // set response for default url
    if (request.url === '/' || request.url === '') {
        var rawData = '';
        return new Promise((resolve, reject) => {
            https.get(`${pokeApiBaseUrl}/1/`, (res) => {     
                res.on('data', (chunk) => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    try {
                        resolve(rawData);
                    } catch (err) {
                        console.log(err);
                    }
                });
                res.on('error', (e) => {
                    reject(e);
                });
            });
        })
        .then((data) => {
            var pokemon = new Pokemon(JSON.parse(data));
            
            response.write(JSON.stringify(pokemon), () => {
                response.end();
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
});

// set server to listen for requests on PORT
server.listen(PORT, () => {
    // console log to validate server is listening
    console.log('Server is listening on port', PORT);
});
