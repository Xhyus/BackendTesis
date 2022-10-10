const Service = require('../models/service');
const Item = require('../models/item');

const createService = (req, res) => {
    const { name, description, price } = req.body;
    const newService = new Service({ name, description, price });
    newService.save((err, serviceStored) => {
        if (err) {
            return res.status(400).send({ message: 'Error al crear el servicio' });
        }
        return res.status(201).send(serviceStored);
    });
}

const getServices = (req, res) => {
    Service.find({}, (err, services) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener los servicios' });
        }
        if (services.length === 0) {
            return res.status(200).send({ message: 'No hay servicios' });
        }
        return res.status(200).send(services);
    });
}

const getService = (req, res) => {
    const { id } = req.params;
    Service.findById(id, (err, service) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener el servicio' });
        }
        if (!service) {
            return res.status(404).send({ message: 'El servicio no existe' });
        }
        return res.status(200).send(service);
    });
}

const updateService = (req, res) => {
    const { id } = req.params;
    req.body.updatedAt = Date.now();
    Service.findByIdAndUpdate(id, req.body, (err, serviceUpdated) => {
        if (err) {
            return res.status(400).send({ message: 'Error al actualizar el servicio' });
        }
        if (!serviceUpdated) {
            return res.status(404).send({ message: 'El servicio no existe' });
        }
        return res.status(200).send(serviceUpdated);
    });
}

const deleteService = (req, res) => {
    const { id } = req.params;
    Service.findByIdAndDelete(id, (err, serviceDeleted) => {
        if (err) {
            return res.status(400).send({ message: 'Error al eliminar el servicio' });
        }
        if (!serviceDeleted) {
            return res.status(404).send({ message: 'El servicio no existe' });
        }
        return res.status(200).send(serviceDeleted);
    });
}


module.exports = {
    createService,
    getServices,
    getService,
    updateService,
    deleteService
};