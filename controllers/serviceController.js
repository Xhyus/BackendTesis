const Service = require('../models/service');
const Item = require('../models/item');

const createService = (req, res) => {
    const { name, description, price, type, itemList } = req.body;
    let items = []
    itemList.forEach(item => {
        items.push(new Item({ description: item }))
    })
    Item.insertMany(items, (err, itemsCreated) => {
        if (err) {
            return res.status(400).send({ message: 'Error al crear los item' });
        }
        let itemsID = itemsCreated.map(item => {
            return item._id.toString()
        })
        const service = new Service({
            name,
            description,
            price,
            type,
            item: itemsID
        });
        service.save((err, serviceCreated) => {
            if (err) {
                return res.status(400).send({ message: 'Error al crear el servicio' });
            }
            return res.status(200).send(serviceCreated);
        });
    })
}

const getServices = (req, res) => {
    Service.find().populate('item').exec((err, services) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener los servicios' });
        }
        if (!services) {
            return res.status(404).send({ message: 'No hay servicios' });
        }
        return res.status(200).send(services);
    });
}

const getService = (req, res) => {
    const { id } = req.params;
    Service.findById(id).populate('item').exec((err, service) => {
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
    const { name, description, price, type, itemList } = req.body;
    let items = []
    itemList.forEach(item => {
        items.push(new Item({ description: item }))
    })
    Item.insertMany(items, (err, itemsCreated) => {
        if (err) {
            return res.status(400).send({ message: 'Error al crear los item' });
        }
        let itemsID = itemsCreated.map(item => {
            return item._id.toString()
        })
        Service.findByIdAndUpdate(id, { name, description, price, type, item: itemsID, updated: Date.now() }, { new: true }).populate('item').exec((err, serviceUpdated) => {
            if (err) {
                return res.status(400).send({ message: 'Error al actualizar el servicio' });
            }
            if (!serviceUpdated) {
                return res.status(404).send({ message: 'El servicio no existe' });
            }
            return res.status(200).send(serviceUpdated);
        }
        );
    })
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
    deleteService,
};