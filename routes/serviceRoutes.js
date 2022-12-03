const express = require('express');
const api = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');

api.post('/service', auth.auth, serviceController.createService);
api.get('/services', auth.auth, serviceController.getServices);
api.get('/service/search/:id', auth.auth, serviceController.getService);
api.put('/service/update/:id', auth.auth, serviceController.updateService);
api.put('/service/delete/:id', auth.auth, serviceController.deleteService);
api.put('/service/restore/:id', auth.auth, serviceController.activateService);

module.exports = api;