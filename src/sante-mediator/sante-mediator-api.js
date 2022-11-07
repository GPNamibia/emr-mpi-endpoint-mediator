const axios = require('axios');
const config = require('../config/private-config.json')
const instance = axios.create({ baseURL: config.santeMpiMediatorConfig.apiURL });

class SanteAPI {

    constructor() { }

    async GET(accessToken, url) 
    {
        const response = await instance.get( config.santeMpiMediatorConfig.apiURL+url , {
            headers: {
                Authorization: `${accessToken}`
            },
        });
        return response.data;
    }

    async POST(newFhirPatient, accessToken) 
    {
        const response = await instance.post(config.santeMpiMediatorConfig.apiURL+'/postResource' , newFhirPatient, {
            headers: 
            {
                Authorization: `${accessToken}`
            },
        });
        return response.data;
    }

    async PUT(newFhirPatient, accessToken, id) 
    {
        const response = await instance.put(config.santeMpiMediatorConfig.apiURL+`/updateResource/${id}`, newFhirPatient, {
            headers: 
            {
                Authorization: `${accessToken}` 
            },
        });
        return response.data;
    }

    async MERGE(newFhirObject, accessToken) 
    {
        const response = await instance.post(config.santeMpiMediatorConfig.apiURL+'/merge', newFhirObject, {
          headers: 
          {
            Authorization: `${accessToken}`, 
            'Content-Type': 'application/json'
          },
        }); 
        return response.data;
    }

    async SIMILAR(accessToken, uri) 
    {
        const response = await instance.get(config.santeMpiMediatorConfig.apiURL+`/getSimiliar/${uri}`, {
        headers: 
        {
            Authorization: `${accessToken}` 
        },
        });
        return response.data;
    }
}

module.exports = {
    SanteAPI
  };