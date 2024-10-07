router.post('/checkout/shipping', async (req, res) => {
const { address, city, postalCode } = req.body;

const shippingDetails = { address, city, postalCode };
req.session.shippingDetails = shippingDetails;

res.json({ message: 'Detalles de envio guardados', shippingDetails});
});

router.post('checkout/payment', async (req, res) => {
    const { paymentMethod } = req.body;
    req.session.paymentMethod = paymentMethod;
    res.json({ message: 'Metodo de pago seleccionado', paymentMethod });
});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/checkout/payment/stripe', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.payments.create({ amount,
            currency: 'usd',
            automatic_payment_mothods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});