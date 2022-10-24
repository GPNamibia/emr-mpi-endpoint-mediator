const express = require("express"); 
const router = require("./routes");

const config = require("./config/private-config.json")

const app = express();  
 
app.use('/', router);

app.listen(7000, ()=> {
    console.log(`Server is listening on port ${config.appConfig.PORT}`);
})