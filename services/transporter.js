const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = (name) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    transporter.verify().then(() => {
        console.log('Servidor de correos listo');
    }).catch(err => {
        console.log("Error utilizar servidor de correos");
    })

    transporter.sendMail({
        from: `"Sistema de Gestión de Empresas" <${process.env.EMAIL}>`,
        to: [
            "ignaciogonzalez1609@gmail.com"
        ],
        subject: 'Nueva empresa registrada',
        text: `Se ha registrado la empresa ${name} a las ${new Date().toLocaleString()}`,
    }, (err, info) => {
        if (err) {
            return res.status(400).send({ message: 'Error al enviar el correo' });
        }
        return console.log('Correo enviado');
    })
}

const sendMailRecoverPassword = (email, password) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    transporter.verify().then(() => {
        console.log('Servidor de correos listo');
    }).catch(err => {
        console.log("Error utilizar servidor de correos");
    })

    transporter.sendMail({
        from: `"Sistema de Gestión de Empresas" <${process.env.EMAIL}>`,
        to: [
            email
        ],
        subject: 'Se ha realizado una recuperación de contraseña',
        text: `Se ha solicitado una recuperacion de contraseña a las ${new Date().toLocaleString()}, la nueva contraseña es: ${password}`,
    }, (err, info) => {
        if (err) {
            return res.status(400).send({ message: 'Error al enviar el correo' });
        }
        return console.log('Correo enviado');
    })

}

module.exports = {
    sendMail,
    sendMailRecoverPassword
};