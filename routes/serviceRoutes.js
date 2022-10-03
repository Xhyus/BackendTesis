const express = require('express');
const api = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');

api.post('/service', auth.auth, serviceController.createService);
api.get('/service', auth.auth, serviceController.getServices);
api.get('/service/:id', auth.auth, serviceController.getService);
api.put('/service/:id', auth.auth, serviceController.updateService);
api.delete('/service/:id', auth.auth, serviceController.deleteService);

module.exports = api;