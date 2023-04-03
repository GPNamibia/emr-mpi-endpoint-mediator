const express = require("express");
const _ = require('lodash');
const http = require('http');

const fetch = require('node-fetch');
const { SanteAPI } = require('../sante-mediator/sante-mediator-api');
const { NPRSAPI } = require('../nprs-mediator/nprs-mediator-api');
const santeAPI = new SanteAPI();
const nprsAPI = new NPRSAPI();

const config = require('../config/private-config.json');


function generateNPRSResource(body) {
  return {
    "resourceType": "Patient",
    "identifier": [
      {
        "system": "http://example.com/idNo",
        "value": body.identifier[0].value
      }
    ],
    "gender": body.gender,
    "name": [
      {
        "family": body.name[0].family,
        "use": "official"
      }
    ],

    "meta": {
      "tag": [
        {
          "system": "http://example.com/auth",
          "code": "/Y63UYsirfLkT"
        }
      ]
    }
  };
}

function urlExists(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
      res.resume();
    });
    req.on('error', (err) => {
      resolve(false);
    });
  });
}


const getOnePatient = async(req,res) => {
  if (req.headers['content-type'] !== 'application/fhir+json') {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }
    //set content type to fhir
    res.setHeader('Content-Type', 'application/fhir+json');
    //set url/token
    let url = '/getResource?identifier=http://ohie.org/Health_ID|'+req.params.id;  
    let accessToken = req.headers.authorization;
    santeAPI.GET(accessToken,url).then(response => { 
      res.status(200).send(response);
      return response;
    }).catch(error => {
      res.status(400).send(error)
    })
};

const generateQR = async(req,res) => {
  if (req.headers['content-type'] !== 'application/fhir+json') {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }
    //set content type to fhir
    res.setHeader('Content-Type', 'application/fhir+json');
    //set url/token
    let url = '/getResource?identifier=http://ohie.org/Health_ID|'+req.params.id;  
    let accessToken = req.headers.authorization;
    santeAPI.GET(accessToken,url).then(response => { 
      res.status(200).send(response);
      return response;
    }).catch(error => {
      res.status(400).send(error)
    })
};

const validatePatient = async(req,res) => {
  if (req.headers['content-type'] !== 'application/fhir+json') {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }

  let body = req.body; 

  urlExists(config.nprsMediatorConfig.apiURL).then((exists) => {
    if (exists) {
      nprsAPI.POST(generateNPRSResource(body)).then(response => {
        if(response.faultCode == 201){
          res.status(200).send({response});
        }
        else{
          res.status(200).send(response);
        }
        
      }).catch(error => {
        res.status(400).send(error)
      })
    }
    else {
      res.status(400).send({
        "message": "No response from NPRS",
        "status": "unknown",
        "data": {
            "idNo":body.identifier[0].value,
            "sex": body.gender.charAt(0),
            "surname": body.name[0].family,
            "auth": "/Y63UYsirfLkT"
        }
    });
    }
  })
  .catch((err) => {
    res.status(400).send(err)
  });
};

const searchPatient =  async (req,res) => {
  if (req.headers['content-type'] !== 'application/fhir+json') {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }
    //set content type to fhir
    res.setHeader('Content-Type', 'application/fhir+json');
    //set url/token
    let url = '/getResource'+req._parsedUrl.search;  
    let accessToken = req.headers.authorization;
    santeAPI.GET(accessToken,url).then(response => { 
      res.status(200).send(response);
      return response;
    }).catch(error => {
      res.status(400).send(error)
    })
    
};

const getSimilarPatient =  async (req,res) => {
  if (req.headers['content-type'] !== 'application/fhir+json') {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }
    //set content type to fhir
    res.setHeader('Content-Type', 'application/fhir+json');

    let url = '/getResource?identifier=http://ohie.org/Health_ID|'+req.params.id;  
    let accessToken = req.headers.authorization;
    
    santeAPI.GET(accessToken,url).then(response => {
      let uid = response.entry[0].resource.id;
      santeAPI.SIMILAR(accessToken,uid).then(response => { 
        res.status(200).send(response); 
      }).catch(error => {
        res.status(400).send(error)
      }) 
    }).catch(error => {
      res.status(400).send(error)
    })
};

const createPatient = async (req,res) =>  {
  if (req.headers['content-type'] !== 'application/fhir+json') {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }
  let body = req.body; 
  let accessToken = req.headers.authorization;

  // Is the NPRS endpoint accessible?

  urlExists(config.nprsMediatorConfig.apiURL).then((exists) => {
    if (exists) {
      var validation = "";

      nprsAPI.POST(generateNPRSResource(body)).then(response => {
        if(response.faultCode == 201){
          validation = "valid";
          var official_names = {
            "name": [ {
                "family": response.surnameActive,
                "given": response.firstNameActive,
                "use":"official"
              }
              ],
          }
          body.name = body.name.concat(official_names.name);
        }
        else if (response.status == "invalid"){
          validation = "invalid";
        }

        var validation_obj = {
          "extension": [
              {
                  "url": "urn:validationproject:nprsStatus",
                  "valueString": validation
              }
        ]};
        
        //set content type to fhir
        res.setHeader('Content-Type', 'application/fhir+json');

        // add validation status
        _.merge(body, validation_obj);

        //create patient
        santeAPI.POST(body,accessToken).then(response => {
          res.status(200).send(response);
        }).catch(error => {
          res.status(400).send(error)
        })

      }).catch(error => {
        res.status(400).send(error)
      }) 
    } else {
      var validation_obj = {
        "extension": [
            {
                "url": "urn:validationproject:nprsStatus",
                "valueString": "unknown"
            }
      ]};

      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');

      // add validation status
      _.merge(body, validation_obj);

      //create patient
      santeAPI.POST(body,accessToken).then(response => {
    
        res.status(200).send(response);
      }).catch(error => {
        res.status(400).send(error)
      })
    }
  })
  .catch((err) => {
    res.status(400).send(err)
  });


     
  };


const updatePatient = async  (req,res) => {
  if (req.headers['content-type'] !== 'application/fhir+json') {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }
    //set content type to fhir
    res.setHeader('Content-Type', 'application/fhir+json');

    let url = '/getResource?identifier=http://ohie.org/Health_ID|'+req.params.id;  
    let accessToken = req.headers.authorization;
    santeAPI.GET(accessToken,url).then(response => {
      let body = req.body;
      let id = response.entry[0].resource.id; 
      santeAPI.PUT(body,accessToken,id).then(response => { 
        res.status(200).send(response); 
      }).catch(error => {
        res.status(400).send(error)
      }) 
    }).catch(error => {
      res.status(400).send(error)
    })  
};

const mergePatient = async (req,res) => {
  if (req.headers['content-type'] !== 'application/fhir+json') {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }
    //set content type to fhir
    res.setHeader('Content-Type', 'application/fhir+json');

    let fromURL = '/getResource?identifier=http://ohie.org/Health_ID|'+req.body.from;
    let intoURL = '/getResource?identifier=http://ohie.org/Health_ID|'+req.body.into;
    let santeURL = "https://santempi-console.globalhealthapp.net/#!/";
    let accessToken = req.headers.authorization;

    santeAPI.GET(accessToken,fromURL).then(response => {
      let fromStr = String(response.entry[0].resource.link[0].other.reference);
      let fromUIDArr = fromStr.split("/");
      let fromUID = fromUIDArr[1];
      
      santeAPI.GET(accessToken,intoURL).then(response => {
        let intoUID = response.entry[0].resource.id;
        let fullURL = santeURL+"mpi/patient/"+intoUID;

        let post_body = {
          "resourceType": "Bundle",
          "type": "message",
          "entry": [
            {
              "fullUrl": "MessageHeader/"+intoUID,
              "resource": {
                "resourceType": "MessageHeader",
                "eventUri": "urn:ihe:iti:pmir:2019:patient-feed",
                "focus": [
                  {
                    "reference": "Bundle/"+intoUID
                  }
                ]
              }
            },
            {
              "fullUrl": fullURL,
              "resource": {
                "resourceType": "Bundle", 
                "id": ""+intoUID,
              "type": "history",
              "entry": [
                  {
                      "resource": {
                          "resourceType": "Patient",
                          "id": fromUID,
                          "active": false,
                          "identifier": [
                            {
                              "use": "official",
                              "system": "http://ohie.org/Health_ID",
                              "value": req.body.from
                            }
                          ],
                          "link": [
                            {
                              "other": {
                                "type": "Patient",
                                "identifier": {
                                  "value": req.body.into,
                                  "system": "http://ohie.org/Health_ID"
                                }
                              },
                              "type": "replaced-by"
                            }
                          ]
                      },
                      "request": {
                        "method": "PUT",
                        "url": "Patient/"+intoUID
                      },
                      "response": {
                        "status":"200"
                      }
                  }
              ]
              }
            }
          ]
        };
        post_body = JSON.stringify(post_body);
        santeAPI.MERGE(post_body,accessToken).then(response => {  
          res.status(200).send(response); 
        }).catch(error => {
          res.status(400).send(error);
        }) 
      }).catch(error => {
        res.status(400).send(error);
      }) 
    }).catch(error => {
      res.status(400).send(error);
    })    
};

const getToken = async(req,res) => {
   if (req.headers['content-type'] !== 'application/fhir+json') {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }
  //set content type to fhir
  res.setHeader('Content-Type', 'application/fhir+json');
  //Extracting user auth headers
  const username = req.headers.username;
  const password = req.headers.password;
  const client_id = req.headers.client_id;
  const client_secret = req.headers.client_secret;
  const grant_type = req.headers.grant_type;
  //sending request
  santeAPI.authPost(username,password,client_id,client_secret,grant_type).then(response => { 
    res.status(200).send(response);
    return response;
  }).catch(error => {
    res.status(400).send(error)
  })
};


module.exports = {
    getOnePatient,
    generateQR,
    searchPatient,
    getSimilarPatient,
    createPatient,
    updatePatient,
    mergePatient,
    validatePatient,
    getToken
};