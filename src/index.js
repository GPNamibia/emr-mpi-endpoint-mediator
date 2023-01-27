const express = require("express");
const router = require("./routes");
const privateConfig = require("./config/private-config.json");
const { getQueryParameters } = require('./openHIM/initialize.js');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
// parse the request body as JSON
app.use(bodyParser.json({ type: 'application/fhir+json' }));

app.all('*', router, (req, res) => {
    try {
        // Starts when a new request is received by the server
        res.send(`${new Date().toUTCString('en-GB', { timeZone: 'UTC' })} : The EMR Endpoint Mediator has received ${req.method} request. \n`);
    } catch (error) {
        // Starts when a new request is received by the server
        res.send(error);
    }
});
app.use('/', router);

//Server PORT
app.listen(privateConfig.appConfig.PORT, (err) => {
    if (err) console.log(`Error: ${err}`)
    console.log(`${privateConfig.appConfig.mediatorName}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
    //openHIM
    getQueryParameters();
});