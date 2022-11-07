const express = require("express");

const fetch = require('node-fetch');
const { SanteAPI } = require('../sante-mediator/sante-mediator-api');
const santeAPI = new SanteAPI();

const config = require('../config/private-config.json');

const getOnePatient = async(req,res) => {
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
    let url = '/getResource?identifier=http://ohie.org/Health_ID|'+req.params.id;  
    let accessToken = req.headers.authorization;
    santeAPI.GET(accessToken,url).then(response => { 
      res.status(200).send(response);
      return response;
    }).catch(error => {
      res.status(400).send(error)
    })
};

const searchPatient =  async (req,res) => {
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
    let body = req.body; 
    let accessToken = req.headers.authorization;
    santeAPI.POST(body,accessToken).then(response => {
      res.status(200).send(response);
      //return response;
    }).catch(error => {
      res.status(400).send(error)
    })
};


const updatePatient = async  (req,res) => {
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


module.exports = {
    getOnePatient,
    generateQR,
    searchPatient,
    getSimilarPatient,
    createPatient,
    updatePatient,
    mergePatient,
    validatePatient
};