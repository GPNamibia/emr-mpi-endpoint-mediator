
# Endpoints

## Search Patient

  

URL: `localhost:7000/patient?freetext=Pete`

Method: `GET`

Authentication: `Required`


Parameter: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameter: | _**/patient**_ | Specifies the patient endpoint |

Parameter: | _**freetext**_ | Specifies the text used to perform search |

  
  
**Response:** 
=======
Endpoint: `/patient`

Parameters: 
| ***freetext*** | Specifies the text used to perform search |
 ___



```json
{
    "resourceType": "Bundle",
    "id": "urn:uuid:e777b863-599a-40d6-aac1-9fa4901a9aba",
    "type": "searchset",
    "timestamp": "2022-07-28T10:53:30.268146+00:00",
    "total": 22,
    "link": [
        {
            "relation": "self",
            "url": "Patient?"
        }
    ],
    "entry": [
        {
            "link": [
                {
                    "relation": "_self",
                    "url": "Patient/cf172f30-86f9-4c92-abbc-30f69d2210b1/_history/4df648ad-4ed3-4573-85b8-ab9fe7a96d56"
                }
            ],
            "fullUrl": "http://127.0.0.1:8080/fhir/Patient/cf172f30-86f9-4c92-abbc-30f69d2210b1",
            "resource": {
                "resourceType": "Patient",
                "id": "cf172f30-86f9-4c92-abbc-30f69d2210b1",
                "meta": {
                    "versionId": "4df648ad-4ed3-4573-85b8-ab9fe7a96d56",
                    "lastUpdated": "2022-07-28T08:17:42.977897+00:00",
                    "security": [
                        {
                            "system": "http://santedb.org/security/policy",
                            "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
                        }
                    ],
                    "tag": [
                        {
                            "system": "http://santedb.org/fhir/tags",
                            "code": "$mdm.type:M"
                        },
                        {
                            "system": "http://santedb.org/fhir/tags",
                            "code": "$mdm.resource:Patient"
                        },
                        {
                            "system": "http://santedb.org/fhir/tags",
                            "code": "$generated:true"
                        },
                        {
                            "system": "http://santedb.org/fhir/tags",
                            "code": "$alt.keys:f019ba9f-5db8-411c-b8be-3f8fc0aa6262"
                        }
                    ]
                },
                "identifier": [
                    {
                        "system": "http://ohie.org/EDT_ART_Number",
                        "value": "6897678"
                    }
                ],
                "active": true,
                "birthDate": "1986-10-16",
                "address": [
                    {
                        "use": "home",
                        "country": "Namibia"
                    }
                ],
                "link": [
                    {
                        "other": {
                            "reference": "Patient/f019ba9f-5db8-411c-b8be-3f8fc0aa6262"
                        },
                        "type": "seealso"
                    }
                ]
            },
            "search": {
                "mode": "match"
            }
        },
        {
            "link": [
                {
                    "relation": "_self",
                    "url": "Patient/275136db-a1d4-40ec-bed6-692e8abc515b/_history/3497afda-7238-412f-b795-b98ba826ebc2"
                }
            ],
            "fullUrl": "http://127.0.0.1:8080/fhir/Patient/275136db-a1d4-40ec-bed6-692e8abc515b",
            "resource": {
                "resourceType": "Patient",
                "id": "275136db-a1d4-40ec-bed6-692e8abc515b",
                "meta": {
                    "versionId": "3497afda-7238-412f-b795-b98ba826ebc2",
                    "lastUpdated": "2022-07-28T08:17:35.341503+00:00",
                    "security": [
                        {
                            "system": "http://santedb.org/security/policy",
                            "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
                        }
                    ],
                    "tag": [
                        {
                            "system": "http://santedb.org/fhir/tags",
                            "code": "$mdm.type:M"
                        },
                        {
                            "system": "http://santedb.org/fhir/tags",
                            "code": "$mdm.resource:Patient"
                        },
                        {
                            "system": "http://santedb.org/fhir/tags",
                            "code": "$generated:true"
                        },
                        {
                            "system": "http://santedb.org/fhir/tags",
                            "code": "$alt.keys:d33c59a2-762f-4bae-8838-73a7593070c8"
                        }
                    ]
                },
                "identifier": [
                    {
                        "system": "http://ohie.org/EDT_ART_Number",
                        "value": "98798"
                    }
                ],
                "active": true,
                "name": [
                    {
                        "use": "usual",
                        "family": "Kelly",
                        "given": [
                            "Peter"
                        ]
                    }
                ],
                "birthDate": "1998-12-10",
                "address": [
                    {
                        "use": "home",
                        "country": "Namibia"
                    }
                ],
                "link": [
                    {
                        "other": {
                            "reference": "Patient/d44c59a2-769f-4bae-8838-73a7593070c8"
                        },
                        "type": "seealso"
                    }
                ]
            },
            "search": {
                "mode": "match"
            }
        } 
    ]
}
```

  
  

## Advanced search

  

URL: `localhost:7000/patient?family=Peter&given=Ken`

Method: `GET`

Authentication: `Required`

Parameters: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameters: | _**/patient**_ | Specifies the patient endpoint |

Parameters: | _**family=Peter&given=Ken**_ | Defines the search parameters. In this case, the search is for a patient with Peter as the family name and Ken as the given name |

  

**Response:**

  
  


```json
{
    "resourceType": "Patient",
    "id": "f019ba9f-5db8-411c-b8be-3f8fc0aa6262",
    "meta": {
        "versionId": "1fbed60f-f521-4f7a-9881-12f2f5f993b2",
        "lastUpdated": "2022-07-28T12:12:39.623512+00:00",
        "security": [
            {
                "system": "http://santedb.org/security/policy",
                "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
            }
        ],
        "tag": [
            {
                "system": "http://santedb.org/fhir/tags",
                "code": "$dcdr.refetch:true"
            }
        ]
    },
    "identifier": [
        {
            "system": "http://ohie.org/National_ID",
            "value": "1968689767"
        }
    ],
    "active": true,
    "name": [
        {
            "use": "usual",
            "family": "Peter",
            "given": [
                "Ken"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1976-09-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ],
    "link": [
        {
            "other": {
                "reference": "Patient/cf172f30-86f9-4c92-abbc-30f69d2210b1"
            },
            "type": "refer"
        }
    ]
}
```

  
  
  

## Register Patient

  

URL: `localhost:7000/patient`

Method: `POST`

Authentication: `Required`

Parameters: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameters: | _**/patient**_ | Specifies the patient endpoint |
  

**Request Body:**

  
  

```json
POST localhost:7000/patient
{
    "resourceType": "Patient",
    "gender": "male",
    "identifier": [
        {
            "system": "urn:oid:4.0",
            "value": "1968689767"
        }
    ],
    "name": [ {
        "family": "Ken",
        "given": "Pete",
        "use":"usual"
      }],
    "birthDate": "1986-10-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ]
}
```

  
  
  

**Response:**

  
  

```json
{
    "resourceType": "Patient",
    "id": "c04b204b-1c2c-46cd-a827-a707793971a7",
    "meta": {
        "versionId": "07dd2a3c-6635-48d1-93eb-6c0353cf829a",
        "lastUpdated": "2022-07-28T08:15:09.572005+00:00",
        "security": [
            {
                "system": "http://santedb.org/security/policy",
                "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
            }
        ]
    },
    "identifier": [
        {
            "system": "http://ohie.org/National_ID",
            "value": "1968689767"
        }
    ],
    "active": true,
    "name": [
        {
            "use": "usual",
            "family": "Ken",
            "given": [
                "Pete"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1986-10-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ],
    "link": [
        {
            "other": {
                "reference": "Patient/a68375a3-6c83-4ef3-b4c7-5000ebdee5f3"
            },
            "type": "refer"
        }
    ]
}
```
  

## Update Patient

  

URL: `localhost:7000/patient/12WENR6`

Method: `PUT`

Authentication: `Required`

Parameter: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameter: | _**/patient**_ | Specifies the patient endpoint |

  

**Request Body:**

  
  

```json
PUT localhost:7000/patient/12WENR6
{
    "resourceType": "Patient",
    "gender": "male",
    "identifier": [
        {
            "system": "urn:oid:4.0",
            "value": "1968689767"
        },
        {
            "system": "urn:oid:3.7",
            "value": "12WENR6"
        }
    ],
    "name": [ {
        "family": "Peter",
        "given": "Ken",
        "use":"usual"
      }],
    "birthDate": "1976-09-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ]
}
```

  
  
  

**Response:**

  
  

```json
{
    "resourceType": "Patient",
    "id": "f019ba9f-5db8-411c-b8be-3f8fc0aa6262",
    "meta": {
        "versionId": "1fbed60f-f521-4f7a-9881-12f2f5f993b2",
        "lastUpdated": "2022-07-28T12:12:39.623512+00:00",
        "security": [
            {
                "system": "http://santedb.org/security/policy",
                "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
            }
        ],
        "tag": [
            {
                "system": "http://santedb.org/fhir/tags",
                "code": "$dcdr.refetch:true"
            }
        ]
    },
    "identifier": [
        {
            "system": "http://ohie.org/National_ID",
            "value": "1968689767"
        },
        {
            "system": "http://ohie.org/Health_ID",
            "value": "12WENR6"
        }
    ],
    "active": true,
    "name": [
        {
            "use": "usual",
            "family": "Peter",
            "given": [
                "Ken"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1976-09-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ],
    "link": [
        {
            "other": {
                "reference": "Patient/cf172f30-86f9-4c92-abbc-30f69d2210b1"
            },
            "type": "refer"
        }
    ]
}
```

  

## Get one patient by Health ID

  

URL: `localhost:7000/Patient/12WENR6`

Method: `GET`

Authentication: `Required`

Parameter: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameter: | _**/patient**_ | Specifies the patient endpoint |

Parameter: | _**/identifier_type=Health_ID&identifier_no=12WENR6**_ | Specifies the health ID for patient one is |



**Response:**

  
  

```json
{
    "resourceType": "Patient",
    "id": "f019ba9f-5db8-411c-b8be-3f8fc0aa6262",
    "meta": {
        "versionId": "1fbed60f-f521-4f7a-9881-12f2f5f993b2",
        "lastUpdated": "2022-07-28T12:12:39.623512+00:00",
        "security": [
            {
                "system": "http://santedb.org/security/policy",
                "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
            }
        ],
        "tag": [
            {
                "system": "http://santedb.org/fhir/tags",
                "code": "$dcdr.refetch:true"
            }
        ]
    },
    "identifier": [
        {
            "system": "http://ohie.org/National_ID",
            "value": "1968689767"
        },
        {
            "system": "http://ohie.org/Health_ID",
            "value": "12WENR6"
        }
    ],
    "active": true,
    "name": [
        {
            "use": "usual",
            "family": "Peter",
            "given": [
                "Ken"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1976-09-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ],
    "link": [
        {
            "other": {
                "reference": "Patient/cf172f30-86f9-4c92-abbc-30f69d2210b1"
            },
            "type": "refer"
        }
    ]
}
```

  
  

## Similar Patient

  

URL: `localhost:7000/similar/12WENR6`

Method: `GET`

Authentication: `Required`

Parameter: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameter: | _**/similar**_ | End point used to search similar patients |

Parameter: | _**/identifier_type=Health_ID&identifier_no=12WENR6**_ | Specifies the health ID for patient for whom one is searching similar patients for |

  

**Response:**

  
  

```xml
<?xml version="1.0"?>
<Bundle xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://santedb.org/model">
    <resource xsi:type="Patient">
        <id>d8fb2756-9536-4206-99cb-fa1f97a4294f</id>
        <creationTime>2022-06-07T17:23:23.0661270+00:00</creationTime>
        <createdBy>21030bc9-1e4e-4ea9-a089-f78fedd59615</createdBy>
        <previousVersion>d68a11e1-82d2-4b30-a8f6-1437d8bdb1d6</previousVersion>
        <version>0ff4c541-478d-4cd4-94ee-f4fc9da38324</version>
        <sequence>19010</sequence>
        <address>
            <id>88734e64-e686-11ec-8cbd-0242ac160004</id>
            <effectiveVersionSequence>19010</effectiveVersionSequence>
            <use>493c3e9d-4f65-4e4d-9582-c9008f4f2eb4</use>
            <component>
                <id>8873888e-e686-11ec-8cbd-0242ac160004</id>
                <type>48b2ffb3-07db-47ba-ad73-fc8fb8502471</type>
                <value>Namibia</value>
            </component>
            <component>
                <id>8873b304-e686-11ec-8cbd-0242ac160004</id>
                <type>8cf4b0b0-84e5-4122-85fe-6afa8240c218</type>
                <value>Khomas</value>
            </component>
        </address>
        <classConcept>bacd9c6f-3fa9-481e-9636-37457962804d</classConcept>
        <determinerConcept>f29f08de-78a7-4a5e-aeaf-7b545ba19a09</determinerConcept>
        <identifier>
            <id>88708832-e686-11ec-8cbd-0242ac160004</id>
            <source>d8fb2756-9536-4206-99cb-fa1f97a4294f</source>
            <effectiveVersionSequence>19010</effectiveVersionSequence>
            <value>zb/eZBS/S8Ga8ne93NTaqg</value>
            <authority>
                <id>3b5aa00a-7205-11ec-90d6-0242ac120003</id>
                <name>Health_ID</name>
                <domainName>Health_ID</domainName>
                <assigningApplication xsi:nil="true" />
                <policy xsi:nil="true" />
            </authority>
        </identifier>
        <name>
            <id>de8dd856-b52a-11ec-81a0-0242ac160004</id>
            <effectiveVersionSequence>2413</effectiveVersionSequence>
            <component>
                <id>de8e51d2-b52a-11ec-81a0-0242ac160004</id>
                <type>29b98455-ed61-49f8-a161-2d73363e1df0</type>
                <value>Testing</value>
            </component>
            <component>
                <id>de8e9d90-b52a-11ec-81a0-0242ac160004</id>
                <type>2f64bde2-a696-4b0a-9690-b21ebd7e5092</type>
                <value>Night</value>
            </component>
            <component>
                <id>de8ecd6a-b52a-11ec-81a0-0242ac160004</id>
                <type>a787187b-6be4-401e-8836-97fc000c5d16</type>
                <value>Patient</value>
            </component>
            <use>1ec9583a-b019-4baa-b856-b99caf368656</use>
        </name>
        <relationship>
            <id>baf8c047-183c-4479-9aef-db2e67d2d9c1</id>
            <effectiveVersionSequence>19010</effectiveVersionSequence>
            <holder>d8fb2756-9536-4206-99cb-fa1f97a4294f</holder>
            <strength>1</strength>
            <relationshipType>56cfb115-8207-4f89-b52e-d20dbad8f8cc</relationshipType>
            <relationshipRole xsi:nil="true" />
            <classification>4311e243-fcdf-43d0-9905-41fd231b1b51</classification>
            <target>867e9b63-c8c4-46fa-9045-93d358257564</target>
        </relationship>
        <relationship>
            <id>1c25b24a-584f-4046-9770-c56f36642c1d</id>
            <effectiveVersionSequence>12411</effectiveVersionSequence>
            <holder>d8fb2756-9536-4206-99cb-fa1f97a4294f</holder>
            <strength>1</strength>
            <relationshipType>97730a52-7e30-4dcd-94cd-fd532d111578</relationshipType>
            <relationshipRole xsi:nil="true" />
            <classification>3b9365ba-c229-44c4-95ae-6489809a33f0</classification>
            <target>cdbfde64-14bf-4bc1-9af2-77bddcd4daaa</target>
        </relationship>
        <statusConcept>c8064cbd-fa06-4530-b430-1a52f1530c27</statusConcept>
        <tag>
            <key>$match.score</key>
            <value>100%</value>
            <source xsi:nil="true" />
        </tag>
        <telecom>
            <id>88719808-e686-11ec-8cbd-0242ac160004</id>
            <source>d8fb2756-9536-4206-99cb-fa1f97a4294f</source>
            <effectiveVersionSequence>19010</effectiveVersionSequence>
            <use>cef6ea31-a097-4f59-8723-a38c727c6597</use>
            <type>c1c0a4e9-4238-4044-b89b-9c9798995b99</type>
            <value>8989323</value>
        </telecom>
        <dateOfBirthPrecision>D</dateOfBirthPrecision>
        <genderConcept>f4e3a6bb-612e-46b2-9f77-ff844d971198</genderConcept>
        <dateOfBirth>2002-04-24</dateOfBirth>
        <occupation xsi:nil="true" />
        <vipStatus xsi:nil="true" />
        <maritalStatus xsi:nil="true" />
        <educationLevel xsi:nil="true" />
        <livingArrangement xsi:nil="true" />
        <religion xsi:nil="true" />
        <nationality xsi:nil="true" />
        <ethnicity xsi:nil="true" />
    </resource>
    <focal>d8fb2756-9536-4206-99cb-fa1f97a4294f</focal>
    <offset>0</offset>
    <count>0</count>
    <totalResults>1</totalResults>
</Bundle>
```

  
  

## Patient Merging

  

URL: `localhost:7000/merge`

Method: `POST`

Authentication: `Required`

Header : | _**Content-Type : application/fhir+json**_ | Defines the format for the data on the request body |

Parameter: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameter: | _**merge**_ | End point used to link patients|


**Request Body:**

  
  

```json

POST localhost:7000/merge

{

"from": "12WENR6",

"into": "12WENR7"

}

```

  
  
  

**Response:**

  
  



```json
{
    "resourceType": "Bundle",
    "meta": {
        "lastUpdated": "2022-08-21T15:23:40.788704+00:00"
    },
    "type": "message",
    "timestamp": "2022-08-21T15:23:40.908417+00:00",
    "entry": [
        {
            "fullUrl": "urn:uuid:ffe96efe-9113-4c4d-a1f8-3fa24015ee30",
            "resource": {
                "resourceType": "MessageHeader",
                "id": "ffe96efe-9113-4c4d-a1f8-3fa24015ee30",
                "response": {
                    "code": "ok",
                    "details": {
                        "reference": "urn:uuid:b8d643d5-b033-419c-88fe-ce0c0adec398"
                    }
                }
            }
        },
        {
            "fullUrl": "urn:uuid:b8d643d5-b033-419c-88fe-ce0c0adec398",
            "resource": {
                "resourceType": "OperationOutcome",
                "id": "b8d643d5-b033-419c-88fe-ce0c0adec398",
                "issue": [
                    {
                        "severity": "information",
                        "diagnostics": "Merge 3e0f3250-1db5-455b-8454-ecdd5f1e68a4 -> 1bd8642e-0b66-4aba-b41d-70684ad84c37"
                    }
                ]
            }
        }
    ]
}
```

  

## Generate QR Code

  

URL: `localhost:7000/QR/12WENR6`

Method: `GET`

Authentication: `Required`

Parameter: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameter: | _**QR**_ | End point used to generate the patient’s QR code |

Parameter: | _**identifier_type=Health_ID&identifier_no=12WENR6**_ | Defines the search parameter. In this case, the search is for a patient with 12WENR6 as the health ID |


**Response:**

  
  


```json
{
    "resourceType": "Patient",
    "id": "f019ba9f-5db8-411c-b8be-3f8fc0aa6262",
    "meta": {
        "versionId": "1fbed60f-f521-4f7a-9881-12f2f5f993b2",
        "lastUpdated": "2022-07-28T12:12:39.623512+00:00",
        "security": [
            {
                "system": "http://santedb.org/security/policy",
                "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
            }
        ],
        "tag": [
            {
                "system": "http://santedb.org/fhir/tags",
                "code": "$dcdr.refetch:true"
            }
        ]
    },
    "identifier": [
        {
            "system": "http://ohie.org/National_ID",
            "value": "1968689767"
        },
        {
            "system": "http://ohie.org/Health_ID",
            "value": "12WENR6"
        }
    ],
    "active": true,
    "name": [
        {
            "use": "usual",
            "family": "Peter",
            "given": [
                "Ken"
            ]
        },
        {
            "use": "official",
            "family": "Peter",
            "given": [
                "Ken",
                "Jones"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1976-09-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ],
    "link": [
        {
            "other": {
                "reference": "Patient/cf172f30-86f9-4c92-abbc-30f69d2210b1"
            },
            "type": "refer"
        }
    ]
}
```
  
  
  

## Validate patient details with Home Affairs and MPI

  

URL: `localhost:7000/validate/12WENR6`

Method: `GET`

Authentication: `Required`

Parameter: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameter: | _**validate**_ | End point used to validate a patient resource with home afairs and MPI |

Parameter: | _**identifier_type=Health_ID&identifier_no=12WENR6**_ | Defines the search parameter. In this case, the search is for a patient with 12WENR6 as the Health ID |


**Response:**

  
  

```json
{
    "resourceType": "Patient",
    "id": "f019ba9f-5db8-411c-b8be-3f8fc0aa6262",
    "meta": {
        "versionId": "1fbed60f-f521-4f7a-9881-12f2f5f993b2",
        "lastUpdated": "2022-07-28T12:12:39.623512+00:00",
        "security": [
            {
                "system": "http://santedb.org/security/policy",
                "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
            }
        ],
        "tag": [
            {
                "system": "http://santedb.org/fhir/tags",
                "code": "$dcdr.refetch:true"
            }
        ]
    },
    "identifier": [
        {
            "system": "http://ohie.org/National_ID",
            "value": "1968689767"
        },
        {
            "system": "http://ohie.org/Health_ID",
            "value": "12WENR6"
        }
    ],
    "active": true,
    "name": [
        {
            "use": "usual",
            "family": "Peter",
            "given": [
                "Ken"
            ]
        },
        {
            "use": "official",
            "family": "Peter",
            "given": [
                "Ken",
                "Jones"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1976-09-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ],
    "link": [
        {
            "other": {
                "reference": "Patient/cf172f30-86f9-4c92-abbc-30f69d2210b1"
            },
            "type": "refer"
        }
    ]
}
```


  

## Authentication

## User authentication

  

URL: `localhost:7000/auth`

Method: `POST`

Authentication: `Required`

Parameter: | _**localhost:7000**_ | Specifies the link to where the MPI mediator is hosted |

Parameter: | _**localhost:7000**_ | End point used to issue a Bearer token from santeMPI  |

**Request Body:**

  
  

```json
{
    "grant_type":"password"
    "client_id":"wick"
    "client_secret":"wick"
    "username":"john"
    "password":"john"
}
```


**Response:**

  
  


```json
{
    "access_token": "8C108588B30DED119ED50242AC160004E7F7FB80F5FCBE7A7D6A7FBFB53BC60B9E2DB0C7B063FBFA63DA17BFAB7526BF",
    
    "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsIm5hbWUiOiI4MmY0MGE4OC05MDlmLTExZWMtYTNmNy0wMjQyYWMxNjAwMDIifQ
    eyJ1bmlxdWVfbmFtZSI6ImpvaG4iLCJyb2xlIjoiUEVSU09OIiwiYXV0aG1ldGhvZCI6IlBhc3N3b3JkIiwibmFtZWlkIjoiNjQ2YTI5MDYtYmExZ
    C0xMWVjLWE3MzQtMDI0MmFjMTYwMDA0IiwiYWN0b3J0IjoiMzM5MzJiNDItNmY0Yi00NjU5LTg4NDktNmFjYTU0MTM5ZDhlIiwiYXBwaWQiOiI4MmY"
    
    "token_type": "bearer",
    
    "expires_in": 3599937,
    
    "refresh_token": "CC4854779AD0764C8802003DB15CE8E27418039113F83087924C1DF66E71AB271D704ACE68674240881ADA8D11B02BF8"
}
```
