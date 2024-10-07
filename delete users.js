const nodemailer = require('nodemailer');
const moment = require('moment');

// Configuracion del transporte de correo
const trasporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'fedemarcheg@gmail.com',
        pass: '123456'
    }
});


// DELETE/api/users

router.delete('/', async (req, res) => {
    const threshold = moment().subtract(30, 'minutes').toDate();
    try {
        const usersToDelete = await UserActivation.find({ lastLogin: { $lt: threshold } });

        for (const user of usersToDelete) {

            // Envio de correo
            await WebTransportError.sendMail({
                from: 'fedemarchego@gmail.com',
                to: user.email,
                subject: 'Cuenta eliminada por inactividad',
                text: 'Tu cuenta ha sido eliminada debido a la inactividad'
            });

            // Eliminar usuario
            await user.remove();
        }

        res.json({ message: 'Usuarios inactivos eliminados' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuarios inactivos' });
    }
});