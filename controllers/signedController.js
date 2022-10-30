const Signed = require('../models/signed');

const createSigned = (req, res) => {
    let { type, use, left } = req.body;
    const newSigned = new Signed({
        type,
        use,
        left
    })
    newSigned.save((err, signed) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear la página protegida" });
        }
        return res.status(200).send(signed);
    })
}

const getSigned = (req, res) => {
    Signed.find({}, (err, signed) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener las páginas protegidas" });
        }
        return res.status(200).send(signed);
    })
}

const getSignedPage = (req, res) => {
    const { id } = req.params;
    Signed.findById(id, (err, signed) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener la página protegida" });
        }
        if (!signed) {
            return res.status(404).send({ message: "Página protegida no encontrada" });
        }
        if (signed.type === 'signed' || signed.left === 3) {
            return res.status(400).json({ error: 'Favor contactarse con la empresa para generar un nuevo' });
        }
        Signed.findByIdAndUpdate(id, { left: signed.left + 1 }, (err, updated) => {
            if (err) {
                return res.status(400).send({ message: "Error al actualizar la página protegida" });
            }
            return res.status(200).send(updated);
        })
    })
}

const signedPage = (req, res) => {
    const { id } = req.params;
    Signed.findByIdAndUpdate(id, { type: "signed" }, (err, signed) => {
        if (err) {
            return res.status(400).send({ message: "Error al actualizar la página protegida" });
        }
        if (!signed) {
            return res.status(404).send({ message: "Página protegida no encontrada" });
        }
        if (signed.type === 'signed' || signed.left === 3) {
            return res.status(400).json({ error: 'Favor contactarse con la empresa para generar un nuevo link' });
        }
        return res.status(200).send(signed);
    })
}

module.exports = {
    createSigned,
    getSigned,
    getSignedPage,
    signedPage
}