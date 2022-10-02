const User = require('../models/user');

const createUser = async (req, res) => {
    const { name, email } = req.body;
    let passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name,
        email,
        password: passwordHash
    });
    user.save((err, user) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido crear el usuario" })
        }
        return res.status(200).send(user);
    });
}

const getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).send({ message: "No se han podido obtener los usuarios" })
        }
        return res.status(200).send(users);
    });
}

const getUser = (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "No se ha podido obtener el usuario" })
        }
        if (!user) {
            return res.status(400).send({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).send(user);
    });
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    User.findByIdAndUpdate(id, { name, email }, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "No se ha podido actualizar el usuario" })
        }
        if (!user) {
            return res.status(400).send({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).send(user);
    });
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "No se ha podido eliminar el usuario" })
        }
        if (!user) {
            return res.status(400).send({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).send(user);
    });
}

const updatePassword = async (req, res) => {
    const { id } = req.params;
    let passwordHash = await bcrypt.hash(req.body.password, 10);
    User.findByIdAndUpdate(id, { password: passwordHash }, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "No se ha podido actualizar la contraseña" })
        }
        if (!user) {
            return res.status(400).send({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).send(user);
    });
}

const login = (req, res) => {
    usuario.findOne({ 'email': req.body.email }, async (err, user) => {
        if (err) {
            return res.status(500).send({ message: `Error al validar el usuario` })
        }
        if (!user) {
            return res.status(400).send({ message: `El usuario no existe` })
        }
        await bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send({ message: `Error al validar el usuario` })
            }
            if (!result) {
                return res.status(400).send({ message: `Contraseña incorrecta` })
            }
            return res.status(200).send({ message: 'Contraseña correcta' }).cookie('token', token.createToken(user), { httpOnly: true });
        })
    })
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updatePassword,
    login
}