const axios = require('axios');
const config = require('../config/private-config.json');
const instance = axios.create({ baseURL: config.nprsMediatorConfig.apiURL }); 

class NPRSAPI {

    constructor() { }

    async POST(newFhirPatient) 
    {
        const response = await instance.post(config.nprsMediatorConfig.apiURL+'/validate' , newFhirPatient, {
            headers: 
            {
                'Content-Type': 'application/json'
            },
        });
        
        return response.data;
    }

}

module.exports = {
    NPRSAPI
  };