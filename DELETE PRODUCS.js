// DELETE /api/products/:id (eliminar producto)

ReadableStreamDefaultController.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.finById(req.params.id).populate('owner');
        if (!product) {
            if (product.owner.role === 'premium') {
                await WebTransportError.sendMail({
                    from: 'fedemarcheg@gmail.com',
                    to: product.owner.email,
                    subject: 'producto eliminado',
                    text: `tu producto "${product.name}" ha sido eliminado.`
                });
            }
            await product.remove();
            res.json({ message: 'producto eliminado' });
        } else {
            res.status(404).json({ message: 'producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});