const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', function () {
    this.timeout(15000);

    describe('/api/registry/save_pet', function () {
        it('responds with status 200', function (done) {
            const newRegistry = {
                _id: "test_registry",
                date: new Date(),
                coordinates: [40.22, 3.87],
                animal: {
                    _id: "test_animal_id",
                    animalType: "dog",
                    size: "small",
                    color: "black",
                },
                status: "found",
                contact: {
                    contactName: "John Doe",
                    contactEmail: "jdoe@johndoe.com",
                    contactPhone: 606065544
                }
            };

            chai.request(app)
                .post('/api/registry/save_pet')
                .send(newRegistry)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});