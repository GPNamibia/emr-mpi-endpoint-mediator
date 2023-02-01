const axios = require('axios');
const config = require('../config/private-config.json');
const instance = axios.create({ baseURL: config.santeMpiMediatorConfig.apiURL });
const openHimInstance = axios.create({ baseURL: config.santeMpiMediatorConfig.santApiURL });

class SanteAPI {

    constructor() { }

    async GET(accessToken, url) 
    {
        const response = await instance.get( config.santeMpiMediatorConfig.apiURL+url , {
            headers: {
                Authorization: `${accessToken}`
            },
        });
        openHimInstance.get(config.santeMpiMediatorConfig.santApiURL, {});
        return response.data;
    }

    async POST(newFhirPatient, accessToken) 
    {
        const response = await instance.post(config.santeMpiMediatorConfig.apiURL+'/postResource' , newFhirPatient, {
            headers: 
            {
                'Content-Type': 'application/json',
                Authorization: `${accessToken}`
            },
        });
        openHimInstance.post(config.santeMpiMediatorConfig.santApiURL, {});
        return response.data;
    }

    async authPost(username,password,client_id,client_secret,grant_type){
        const response = await instance.post(config.santeMpiMediatorConfig.apiURL+'/userAuth' , {
            headers:{
                username: username,
                password: password,
                client_id:client_id,
                client_secret:client_secret,
                grant_type:grant_type
            }
        });
        openHimInstance.post(config.santeMpiMediatorConfig.santApiURL, {});
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
        openHimInstance.put(config.santeMpiMediatorConfig.santApiURL, {});
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
        openHimInstance.post(config.santeMpiMediatorConfig.santApiURL, {});
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
        openHimInstance.get(config.santeMpiMediatorConfig.santApiURL, {});
        return response.data;
    }
}

module.exports = {
    SanteAPI
  };