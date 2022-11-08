const express = require("express"); 
const router = require("./routes");
const privateConfig = require("./config/private-config.json");
const { getQueryParameters } = require('./openHIM/initialize.js');

//openHIM
getQueryParameters();

const app = express();  
 
// app.use('/', router);
app.use('/',router, async (req, res) => {
    // Starts when a new request is triggered by the polling channel
    res.status(res.statusCode).send(res.body);
    console.log(`\n---------------------------------------------------------------------------------`,
        `\n${new Date().toUTCString('en-GB', { timeZone: 'UTC' })}  - `,
        `The EMR Endpoint Mediator has received a new request. \n`
    );
});

//Server PORT
app.listen(privateConfig.appConfig.PORT, (err) => {
    if (err) console.log(`Error: ${err}`)
    console.log(`${privateConfig.appConfig.mediatorName}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
})