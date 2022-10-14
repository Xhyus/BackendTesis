const Item = require('../models/item');
const Service = require('../models/service');

const createItem = (req, res) => {
    const { itemList } = req.body;
    const { id } = req.params
    let items = []
    itemList.forEach(item => {
        items.push(new Item({
            description: item
        }))
    })
    Item.insertMany(items, (err, itemsCreated) => {
        if (err) {
            return res.status(500).send({ message: 'Error al crear el item' });
        }
        let itemsID = itemsCreated.map(item => {
            return item._id.toString()
        })
        Service.findByIdAndUpdate(id, { $push: { itemList: itemsID } }, (err, serviceUpdated) => {
            if (err) {
                return res.status(500).send({ message: 'Error al actualizar el servicio' });
            }
            if (!serviceUpdated) {
                return res.status(404).send({ message: 'El servicio no existe' });
            }
            return res.status(200).send(serviceUpdated);
        });
    })
}

const getItems = (req, res) => {
    Item.find({}, (err, items) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener los items' });
        }
        if (items.length === 0) {
            return res.status(404).send({ message: 'No hay items' });
        }
        return res.status(200).send(items);
    });
}

const getItem = (req, res) => {
    const { id } = req.params;
    Item.findById(id, (err, item) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener el item' });
        }
        if (!item) {
            return res.status(404).send({ message: 'El item no existe' });
        }
        return res.status(200).send(item);
    });
}

const updateItem = (req, res) => {
    const { id } = req.params;
    Item.findByIdAndUpdate(id, req.body, (err, itemUpdated) => {
        if (err) {
            return res.status(400).send({ message: 'Error al actualizar el item' });
        }
        if (!itemUpdated) {
            return res.status(404).send({ message: 'El item no existe' });
        }
        return res.status(200).send(itemUpdated);
    });
}

const deleteItem = (req, res) => {
    const { id } = req.params;
    Item.findByIdAndDelete(id, (err, itemDeleted) => {
        if (err) {
            return res.status(400).send({ message: 'Error al eliminar el item' });
        }
        if (!itemDeleted) {
            return res.status(404).send({ message: 'El item no existe' });
        }
        return res.status(200).send(itemDeleted);
    });
}

module.exports = {
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem
}