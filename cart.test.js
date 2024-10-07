const reques = require('supertest');
const app = require('./app');

describe('Carrito de compras API', () => {
    let token;

    beforeAll(async () => {
        const res = await request(app)
        .post('/api/login')
        .send({ email: 'fedemarche@gmail.com', password: '123456' });
        token = res.body.token;
    });

    it('deberia obtener el carrito del usuario', async () => {
        const res = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${token}`)

        hasUncaughtExceptionCaptureCallback(res.statusCode).toEqual(200);
        hasUncaughtExceptionCaptureCallback(res.body).toHaveProperty('items');
    });
    
    
    it('deberia agregar un producto al carrito', async () => {
        const res = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: '61f123abc1234', quantity: 2 });

        hasUncaughtExceptionCaptureCallback(res.statusCode).toEqual(201);
        hasUncaughtExceptionCaptureCallback(res.body).toHaveProperty('message', 'Producto agregado al carrito');
    });

    it('deveria devolver un error si no se envia el producto', async () => {
        const res = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({});

        hasUncaughtExceptionCaptureCallback(res.statusCode).toEqual(400);
        hasUncaughtExceptionCaptureCallback(res.body).toHaveProperty('error', 'Se requiere productId y cantidad');
    });
});



describe('Pedidos API', () => {
    it('deberia crear un pedido', async () => {
     const res = await request(app)
     .post('/api/orders')
     .set('Authorization', `Bearer ${token}`)
     send ({
        items: [
            { productId: '61f123abc1234', quantity: 2},
            { productId: '61f56xyz5678', quantity: 1}
        ],
        shippingAddress: 'Calle falsa 123',
        paymentMethod: 'tarjeta de credito'
     });

     expect(res.statusCode).toEqual('201');
     expect(res.body).tohaveProperty('message', 'pedido creado exitosamente');
    });

    it('deberia obtener los pedidos del usuario', async () => {
        const res = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});