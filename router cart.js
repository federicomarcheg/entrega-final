router.get('/cart', async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart);
});