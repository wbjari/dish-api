const server = require('../index');
const models = require('../lib/models');
const helpers = require('./helpers');

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

// describe('Meals', () => {
//   before((done) => {
//
//     // remove meal (if exists)
//     models.Meal.findOneAndRemove({name: helpers.mealTemplate.name})
//     .then(() => {
//
//       // remove user (if exists)
//       models.User.findOneAndRemove({email: helpers.userTemplate.email})
//       .then(() => {
//         chai.request(server)
//           .post('/api/users')
//           .send(helpers.userTemplate)
//           .then((user) => {
//
//             // authenticate user
//             helpers.setAuth(
//               chai.request(server)
//                 .get('/api/users/' + user._id),
//               user._id
//             )
//           })
//           .end((err, res) => {
//             helpers.checkErr(err);
//             res.should.have.status(201);
//             done();
//           });
//         });
//       });
//     });
//
//   it('should create a meal', (done) => {
//     chai.request(server)
//       .post('/api/meal')
//       .send(helpers.mealTemplate)
//       .end((err, res) => {
//         helpers.checkErr(err);
//         res.should.have.status(201);
//         done();
//       });
//   });
//
//   it('should get a meal', (done) => {
//     models.Meal.find({name: helpers.mealTemplate.name})
//       .then((meal) => {
//         helpers.setAuth(
//           chai.request(server)
//             .get('/api/d/' + meal._id),
//               meal._id,
//               false
//         ).end((err) => {
//           if (err === undefined) {
//             throw err;
//           }
//           done();
//         });
//       });
//   });
// });
