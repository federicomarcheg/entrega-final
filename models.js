const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
});

module.exports = mongoose.model('UserActivation', userSchema);




const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, },
    price: { type: Number, required: true},
    stock: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'user' },

});

module.exports = mongoose.model('Product', productSchema);



const getProducts = async () => {
    try {
        const products = await Product.find({});
        return products;
    } catch (err) {
        console.error('Error al obtener productps:', error );
    }
};

const getOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate('items.product');
        return order;
    } catch (error) {
        console.error('Error al obtener orden:', error);

    }
};

const updateProductStock = async (productId, newStock) => {
    try {
        const product = await product.findByIdAndUpdate(
            productId,
            { stock: newStock },
            { new: true }
        );
        console.log('producto actualizado', product );
    } catch (error) {
        console.error('Error al actualizar producto:', error);
    }
};