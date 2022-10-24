const express = require('express');
const api = express.Router();
const companyController = require('../controllers/companyController');

api.post('/company/constituted', companyController.createCompany);
api.post('/company/unconstituted', companyController.createUnConstitutedCompany);
api.get('/companies', companyController.getCompanies);
api.get('/company/search/:id', companyController.getSpecificCompany);
api.put('/company/update/:id', companyController.updateCompany);
api.delete('/company/delete/:id', companyController.deleteCompany);

module.exports = api;