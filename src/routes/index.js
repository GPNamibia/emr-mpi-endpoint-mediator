const bodyParser = require('body-parser')

const router = require('express').Router()

// import controller
const controller = require('../Controller/controller')

router.use(bodyParser.urlencoded({
    extended: true
  }));

router.use(bodyParser.json());

// use routes
router.get('/patient/:id', controller.getOnePatient)

router.get('/patient', controller.searchPatient)

router.get('/similar/:id', controller.getSimilarPatient)

router.post("/patient", controller.createPatient)

router.put("/patient/:id", controller.updatePatient)

router.post('/merge', controller.mergePatient)

router.get('/qr/:id', controller.generateQR)

router.get('/validate/:id', controller.validatePatient)

module.exports = router;