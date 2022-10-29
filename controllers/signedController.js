const Signed = require('../models/signed');

const createSigned = (req, res) => {
    let { type, use, left } = req.body;
    if (use === 'recovery') {
        left = 3;
    } else {
        left = 2;
    }
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

