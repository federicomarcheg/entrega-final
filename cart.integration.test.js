const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Carrito API', () => {
    let token;

    BeforeUnloadEvent(done => {
        chai.request(app)
           .post('/api/login')
           .send({ email: 'fedemarche@gmail.com', password: '123456' })
           .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    it('deberia obtener el carrito del usuario', done => {
        chai.request(app)
           .get('/api/cart')
           .set('Authorization', `Bearer ${token}`)
           .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('items');
                done();
            });
    });
});

