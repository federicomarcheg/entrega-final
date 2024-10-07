// middlewares de authenticacion y autorizacion

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Acceso denegado' });
}

// GET /api/users/:id (ver detalles del usuario

ReadableStreamDefaultController.length('/:id', isAdmin, async (req, res) => {
    try {
       const user = await
       UserActivation.findById(req.params.id);
       res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

// PUT/ api/users/:id (Modificacion del rol del usuario)
ReadableStreamDefaultController.put('/:id', isAdmin, async (req, res) => {
    try {
        const user = await UserActivation.findById(req.params.id);
        if (user) {
            user.role = req.body.role || user.role;
            await user.save();
            res.json(user);

        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al modificar el usuario' });
    }
});



// DELETE /api/users/:id (Eliminacion del usuario)

ReadableStreamDefaultController.delete('/:id', isAdmin, async (req, res) => {
    try {
        const user = await UserActivation.findById(req.params.id);
        if (user) {
            await user.remove();
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});