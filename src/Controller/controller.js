const express = require("express");
const _ = require('lodash');
const http = require('http');

const fetch = require('node-fetch');
const { SanteAPI } = require('../sante-mediator/sante-mediator-api');
const { NPRSAPI } = require('../nprs-mediator/nprs-mediator-api');
const santeAPI = new SanteAPI();
const nprsAPI = new NPRSAPI();
const config = require('../config/private-config.json');
var nprsUrl = "urn:validationproject:nprsStatus";
var registrationDateUrl = "http://hl7.org/fhir/StructureDefinition/patient-registration-date";
var updatedDateUrl = "http://hl7.org/fhir/StructureDefinition/patient-update-date";
var datetime = new Date();
var newDate = datetime.toISOString().slice(0, 10);



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
 if (!req.headers['content-type'].startsWith('application/fhir+json')) {
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
if (!req.headers['content-type'].startsWith('application/fhir+json')) {
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
  if (!req.headers['content-type'].startsWith('application/fhir+json')) {
    res.status(415).send({error: 'Unsupported Media Type'});
    return;
  }

  //set content type to fhir
  res.setHeader('Content-Type', 'application/fhir+json');

  let body = req.body; 

  urlExists(config.nprsMediatorConfig.apiURL).then((exists) => {
    if (exists) {
      nprsAPI.POST(generateNPRSResource(body)).then(response => {
        res.status(200).send(response);
      }).catch(error => {
        res.status(400).send(error)
      })
    }
    else {
      res.status(400).send({
      
          "resourceType": "Patient",
          "identifier": [
              {
                  "system": "http://ohie.org/National_ID",
                  "value": body.identifier[0].value
              }
          ],
          "extension": [
              {
                  "url": "urn:validationproject:nprsStatus",
                  "valueString": "unknown"
              }
          ],
          "name": [
              {
                  "family": body.name[0].family
              }
          ],
          "gender": body.gender
    });
    }
  })
  .catch((err) => {
    res.status(400).send(err)
  });
};

const searchPatient =  async (req,res) => {
 if (!req.headers['content-type'].startsWith('application/fhir+json')) {
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
if (!req.headers['content-type'].startsWith('application/fhir+json')) {
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
  if (!req.headers['content-type'].startsWith('application/fhir+json')) {
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
       
        //set content type to fhir
        res.setHeader('Content-Type', 'application/fhir+json');

        // add extension status
        const nprsExt=mergeExtension(body, nprsUrl, validation);
        const registrationDateExt = mergeDateExtension(body, registrationDateUrl, newDate);
        

        console.log(registrationDateExt)

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
     
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      // add validation status
      const nprsExt = mergeExtension(body, nprsUrl, "unknown");
      const registrationDateExt = mergeDateExtension(body, registrationDateUrl, newDate);
      //create patient
      santeAPI.POST(body,accessToken).then(response => {
        console.log(response)
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


  function mergeExtension(body, extensionUrl, extensionValue) {
   if (!body.extension) {
    body.extension = [];
  }

  const extensionExists = body.extension.some(ext => ext.url === extensionUrl);
  if (!extensionExists) {
    const newExtension = {
      "url": extensionUrl,
      "valueString": extensionValue
    };
    body.extension.push(newExtension);
    return body; 
  }

  return body; 
}

 function mergeDateExtension(body, extensionUrl, extensionValue) {
   if (!body.extension) {
    body.extension = [];
  }

  const extensionExists = body.extension.some(ext => ext.url === extensionUrl);
  if (!extensionExists) {
    const newExtension = {
      "url": extensionUrl,
      "valueString": extensionValue
    };
    body.extension.push(newExtension);
    return body; 
  }

  return body; 
}

// const updatePatient = async  (req,res) => {

//   if (!req.headers['content-type'].startsWith('application/fhir+json')) {
//     res.status(415).send({error: 'Unsupported Media Type'});
//     return;
//   }
//     //set content type to fhir
//     res.setHeader('Content-Type', 'application/fhir+json');

//     let url = '/getResource?identifier=http://ohie.org/Health_ID|'+req.params.id;  
//     let accessToken = req.headers.authorization;
//     santeAPI.GET(accessToken,url).then(response => {
//       let body = req.body;
//       let id = response.entry[0].resource.id; 
//       console.log("Original",body.extension);
//       console.log("Sante",response.entry[0].resource.extension);
//       const updatedDateExt = mergeDateExtension(body, updatedDateUrl, newDate);
//       santeAPI.PUT(body,accessToken,id).then(response => { 
//         res.status(200).send(response); 
//       }).catch(error => {
//         res.status(400).send(error)
//       }) 
//     }).catch(error => {
//       res.status(400).send(error)
//     })  
// };


const updatePatient = async (req, res) => {
  if (!req.headers['content-type'].startsWith('application/fhir+json')) {
    res.status(415).send({ error: 'Unsupported Media Type' });
    return;
  }

  // set content type to fhir
  res.setHeader('Content-Type', 'application/fhir+json');

  let url = '/getResource?identifier=http://ohie.org/Health_ID|' + req.params.id;
  let accessToken = req.headers.authorization;

  try {
    const santeResponse = await santeAPI.GET(accessToken, url);

    let body = req.body;
    let id = santeResponse.entry[0].resource.id;

    console.log("Original", body.extension);
    console.log("Sante", santeResponse.entry[0].resource.extension);

    // Extract extensions from the original and Sante arrays
    const originalExtensions = body.extension;
    const santeExtensions = santeResponse.entry[0].resource.extension;

    // Check and push only non-duplicate extensions to Sante extensions
    originalExtensions.forEach((originalExt) => {
      const santeExtIndex = santeExtensions.findIndex((santeExt) => santeExt.url === originalExt.url);

      if (santeExtIndex !== -1) {
        // Check if values are different
        if (santeExtensions[santeExtIndex].valueString !== originalExt.valueString) {
          // Update the value in Sante extensions with the value from the Original extension
          santeExtensions[santeExtIndex].valueString = originalExt.valueString;
        }
      } else {
        // Extension doesn't exist in Sante extensions, so add it
        santeExtensions.push(originalExt);
      }
    });

    // Update body.extensions with Sante extensions
    body.extension = santeExtensions;

    console.log("BODY", body);

    // Merge other necessary extensions
    const updatedDateExt = mergeDateExtension(body, updatedDateUrl, newDate);

    // Perform the PUT request to update the patient resource
    const updateResponse = await santeAPI.PUT(body, accessToken, id);

    res.status(200).send(updateResponse);
  } catch (error) {
    res.status(400).send(error);
  }
};


const mergePatient = async (req,res) => {
  if (!req.headers['content-type'].startsWith('application/fhir+json')) {
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
   if (!req.headers['content-type'].startsWith('application/fhir+json')) {
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