const User = require('../models/user');
const bcrypt = require('bcrypt');
const token = require('../services/token');
const { sendMailRecoverPassword } = require('../services/transporter');

const createUser = async (req, res) => {
    let { name, password, rePassword } = req.body;
    if (password !== rePassword) {
        return res.status(400).send({ message: "Las contraseñas no coinciden" })
    }
    let email = req.body.email.toLowerCase();
    let passwordHash = await bcrypt.hash(req.body.password, 10);
    if ((email.slit('@')[1] !== 'estudiofragua.cl') || (email.slit('@')[1] !== 'pryx.cl')) {
        return res.status(400).send({ message: "El correo no es válido" })
    }
    const user = new User({
        name,
        email,
        password: passwordHash
    });
    user.save((err, user) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido crear el usuario" })
        }
        return res.status(201).send(user);
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
            return res.status(400).send({ message: "No se ha podido obtener el usuario" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).send(user);
    });
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    User.findByIdAndUpdate(id, { name, email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido actualizar el usuario" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).send(user);
    });
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id, (err, user) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido eliminar el usuario" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).send(user);
    });
}

const updatePassword = async (req, res) => {
    const { id } = req.params;
    let passwordHash = await bcrypt.hash(req.body.password, 10);
    User.findByIdAndUpdate(id, { password: passwordHash }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido actualizar la contraseña" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).send(user);
    });
}

const login = (req, res) => {
    let email = req.body.email.toLowerCase();
    User.findOne({ 'email': email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: `Error al validar el usuario` })
        }
        if (!user) {
            return res.status(404).send({ message: `El usuario no existe` })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(400).send({ message: `Error al validar el usuario` })
            }
            if (!result) {
                return res.status(400).send({ message: `Contraseña incorrecta` })
            }
            res.cookie('token', token.createToken(user), { httpOnly: true });
            return res.status(200).send({ message: 'Contraseña correcta', token: token.createToken(user), user: user.name })
        })
    })
}

const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).send({ message: 'Sesión cerrada' })
}

const checkToken = (req, res) => {
    return res.status(200).send({ message: 'Token correcto' })
}

const recoverPassword = (req, res) => {
    let email = req.body.email.toLowerCase();
    User.findOne({ 'email': email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: `Error al validar el usuario` })
        }
        if (!user) {
            return res.status(404).send({ message: `El usuario no existe` })
        }
        let newPassword = Math.random().toString(36).slice(-8);
        bcrypt.hash(newPassword, 10, (err, hash) => {
            if (err) {
                return res.status(400).send({ message: `Error al validar el usuario` })
            }
            User.findByIdAndUpdate(user._id, { password: hash }, (err, user) => {
                if (err) {
                    return res.status(400).send({ message: "No se ha podido actualizar la contraseña" })
                }
                if (!user) {
                    return res.status(404).send({ message: "No se ha encontrado el usuario" })
                }
                sendMailRecoverPassword(email, newPassword);
                return res.status(200).send({ message: 'Contraseña actualizada' })
            });
        })
    })
}

const changePassword = (req, res) => {
    const user = req.user;
    const { password, newPassword, rePassword } = req.body;
    if (newPassword !== rePassword) {
        return res.status(400).send({ message: 'Las contraseñas no coinciden' })
    }
    User.findById(user, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al validar el usuario' })
        }
        if (!user) {
            return res.status(404).send({ message: 'El usuario no existe' })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(400).send({ message: 'Error al validar el usuario' })
            }
            if (!result) {
                return res.status(400).send({ message: 'Contraseña incorrecta' })
            }
            bcrypt.hash(newPassword, 10, (err, hash) => {
                if (err) {
                    return res.status(400).send({ message: 'Error al validar el usuario' })
                }
                User.findByIdAndUpdate(user._id, { password: hash }, (err, user) => {
                    if (err) {
                        return res.status(400).send({ message: 'No se ha podido actualizar la contraseña' })
                    }
                    if (!user) {
                        return res.status(404).send({ message: 'No se ha encontrado el usuario' })
                    }
                    return res.status(200).send({ message: 'Contraseña actualizada' })
                })
            })
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
    login,
    checkToken,
    logout,
    recoverPassword,
    changePassword
}