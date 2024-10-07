const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const isAuthenticated = require('..middleware/auth');
const stripe = require('stripe') ('123456');
const Order = require('../models/Order');
const isAdmin = require('../middlewares/admin');


//GET /api/users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'name email role');
        res.json(users);
    } catch (err) {
        res.status(500).json({message: 'Error al obtener usuarios' });
    }
});


router.post('/cart', isAuthenticated, async (req, res) => {
         const { productId, quantity } = req.body;
         const userId = req.user._id;

         try {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'producto no encontrado' });
            }
            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({ user: userId, items: [] });
            }
            const itemIndex = cart.item.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
            await Cart.save();

            res.status(200).json({ message: 'producto añadido al carrito', cart });
         } catch (err) {
            res.status(500).json({ message: 'Error al añadir producto al carrito', err });
         }
});

{
    "productId"; "id_del_producto",
    "quantity"; 1
}




router.get('/cart', isAuthenticated, async (req, res) => {
          const userId = req.user._id;

          try {
            const cart = await Cart.findOne({ user: userId }).populate('items.product');

            if (!cart || cart.items.length === 0) {
                return res.status(200).json({ message: 'tu carrito esta vacio' }); 
            }
            res.status(200).json(cart);
          } catch (error) {
            res.status(500).json({ message: 'Error al obtener el carrito', error });
          }
});




router.post('/checkout', async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Tu carrito esta vacio' });
    }

    let total = 0;
    cart.items.forEach(item => {
        total += item.product.price * item.quantity;
        
    

    const paymentIntent = await stripe.paymentIntents.create({ amount: Math.round(total * 100)}),
    currency: 'usd',
    description: `compra de ${cart.items.length} productos`,
    metadata: { userId: userId.toString() },
 
});

const newOrder = new Order ({
    user: userId,
    items: cart.items,
    total: total,
    status: 'pendiente',
    paymentIntentId: paymentIntent.id
});

await newOrder.save();

cart.items = [];
await cart.save();

res.status(200).json({ message: 'orden creada con exito, procede al pago ', paymentIntent.client_secret });

} catch (error) {
    res.status(500).json({ message: 'Error durante el checkout', error });
}


});



router.post('/orders', async (req, res) => {
 const userID = req.user._id;

 try {
    const cart = await Cart.findOne({ user: userID }).populate( 'items.product' );

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Tu carrito esta vacio, no se puede crear una orden' });
    }

    let total = 0;
    cart.items.forEach(item => {
        total += item.product.price * item.quantity;
    });

    const newOrder = new Order({
        user: userID,
        items: cart.items,
        total: total,
        status: 'pendiente',
    });

    await newOrder.save();

    cart.items = [];
    await cart.save();

    res.status(201).json({
        message: 'Order creada con exito', order: newOrder
    });
 } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden', error });
 }
});;


router.get('/orders', async (req, res) => {
const userId = req.user._id;

try {

    const orders = await Order.find({ user: userId });
    if (orders.length === 0) {
        return res.status(404).json({ message: 'no tienes ordenes todavia' });
    }
    res.status(200).json(orders);
} catch (error) {
    res.status(500).json({ message: 'Error al obtener tus ordenes', error });
}
});

router.get('/cart', async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.finOne({ userId: userId }).populate('items.productId');
        if(!cart || cart.items.length === 0) {
            return res.status(200).json({ message: "Tu carrito esta vacio." });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({error: "Hubo un error al obtener el carrito."  });
    }
});


