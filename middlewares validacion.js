const userSchema = new UserSchema ({
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        match: [/.+\@.+\..+/, 'El correo debe ser valido']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    }
});