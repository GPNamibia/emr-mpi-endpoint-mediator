
  

# emr-mpi Mediator

  

This mediator is intended for sending request to sante-mpi mediator

  

  

# Private Configurations

  

The `private-config.json` is used to store all the credentials and connection URLs of the mediator. The credentials are currently left out, so the file needs to be renamed with all the required credentials and URLs before installation for the mediator to work.

  

  

# INISTALL

  

  

## Requirements

  

  

1.  `Node.js 12 or later`

  

2.  `npm (version 6 or higher)`

  

3.  `MongoDB`

  

4.  `Docker`

  

5.  `OpenHIM`

  

6.  `Postgress`

  

## Installation in Localhost

  

  

To run the mediator without connecting it to the OpenHIM server, you can use the following commands if you have `Node.js` installed:

  

  

1. Clone or download the repository.`git clone https://github.com/UCSF-GP-Namibia/emr-mpi-endpoint-mediator.git`

  

  

2.  `cd emr-mpi-endpoint-mediator`

  

  

3. Run `npm install` to install the dependencies

  

  

4. Start the development server with `npm start`

  

  

## Installation in Docker

  

  

The mediator can be built and run using the `docker-compose.yml` file configurations.

  

  

1. Clone or download the repository.`git clone https://github.com/UCSF-GP-Namibia/emr-mpi-endpoint-mediator.git`

  

  

2. Navigate to `odk-central-mediator` folder where the `docker-compose.yml` is.

  

  

3.  `docker-compose build`

  

  

4.  `docker-compose up -d`

  

  

5.  `docker network create openHIM`

  

  

## Tests

  

  

You can run the Unit tests using the following command:

  

  

1.  `cd cd emr-mpi-endpoint-mediator`

  

  

2.  `npm run test`

  

  

# HOWTO

  

  

## Usage

  

  

1. Make a `GET` request to `/localhost:7000/patient?freetext=Pete` to perform a free text search for patients on the MPI.

  

2. Make a `GET` request to `/localhost:7000/patient?family=Peter&given=Ken` to perform a search for patients on the MPI where search fields are specified.

  

3. Make a `POST` request to `/localhost:7000/patient` to create a new patient on the MPI.

  

4. Make a `PUT` request to `/localhost:7000/patient/12WENR6` to outlines how an existing patient details will be updated on the MPI.

  

5. Make a `GET` request to `/localhost:7000/Patient/12WENR6` to search for a patient where a Health ID is provided.

  

6. Make a `GET` request to `/localhost:7000/similar/12WENR6` to retrieve patients that the matching algorithm had classified as possible matches. In other words it performs a linked or chained search on a sub-property.

  

7. Make a `POST` request to `/localhost:7000/merge` to link patients that are considered to be duplicates i.e. registered more than once.

  

8. Make a `GET` request to `/localhost:7000/QR/12WENR6` to search for a patient on the MPI. The response will be used to print the QR Code.

  

9. Make a `GET` request to `/localhost:7000/validate/12WENR6` to verify records on the MPI are validated against the NPRS.

  

  

## Authentication
The API uses a `Beaer Token` for authentication. To access the endpoints, you will need to pass a valid token in the Authorization header of your requests.
  

  

1. Make a `POST` request to `localhost:7000/auth` endpoint which Generate a token for use when making requests to the MPI

 
  

## Errors

  

The API uses the following error codes:

  

  

1.  `401` Unauthorized: The request could not be authenticated.

  

2.  `404` Not Found: The requested resource could not be found.

  

3.  `500` Internal Server Error: An error occurred on the server.

  

  

## More information

  

For more information on the API, please contact the developer.