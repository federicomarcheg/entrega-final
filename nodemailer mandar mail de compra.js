const nodemailer = require('nodemailer');

const trasporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

const mailOptions = {
    form: 'fedemarchegan@gmail.com',
    to: requestAnimationFrame.user.email,
    subject: 'confirmacion de pedido ',
    text: `Gracias por tu compra! Tu pedido ha sido procesado con exito. Total: $${totalAmount/ 10000}`,
};

trasporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Correo enviado: ' + info.responce);
});