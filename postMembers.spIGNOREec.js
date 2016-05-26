

var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;
var request = require('supertest');
var config = require("../../config.json");
var Promise = require("bluebird");




describe("POST api/members", function () {

  var token = {};
  var members = {};
  var testingData = require("../../Sample.spec.js");

  beforeEach(function (done) {

     request(config.api)
       .post('/oauth2/token')
       .send(config.cred)
       .expect(200)
       .expect('Content-Type', /json/)
       .end(function (err, res) {

         if (err) {

           done(err);

         }
         else {
         token = res.body.access_token;
         done();
         }

       });

  });
  afterEach(function () { });



//   it("Should be able to add a member", function (done) {
//
//   var member = require('../member/member.json').member;
//   var testingDataa = require("../../Sample.spec.js");
//   var out;
//   testingDataa.AddTestingMember()
//   .then( function(result){  return new Promise(function(resolve,reject){
//                            member.email = result.primaryemailaddress;
//                            member.firstName = result.firstname;
//                            member.lastName = result.lastname;
//                            member.phone = result.primaryphonenumber;
//                            member.username = result.username;
//                            member.password = result.password;
//                            member.Member_IDNum = result.Member_IDNum;
//      request(config.api)
//      .post('/api/members')
//      .send(member)
//      .set('Authorization', 'Bearer ' + token)
//      .expect(200)
//      .end(function (err, res) {
//
//        if (err) {
//         console.log("Fail!!!!!!" +err);
//         reject(err);
//        }
//        else{
//             response = res.body;
//             expect(true).to.be.true;
//             resolve(response);
//        }
//         });
//        });
// })
// .then(function(result, reject) {
//       return new Promise(function(resolve){
//         member.ipcode = result.id;
//         member.status = 2;
//         resolve(result.id);
//       });
// })
// .then(function(result) {
//       return testingData.UpdateMember(member);
// })
// .then(function(){
//   done();
// })
// });

it("Should return an error when email is null", function (done) {

var member = require('../member/member.json').member;
var testingDataa = require("../../Sample.spec.js");
var out;
testingDataa.AddTestingMember()
.then( function(result){  return new Promise(function(resolve,reject){
                         member.firstName = result.firstname;
                         member.lastName = result.lastname;
                         member.phone = result.primaryphonenumber;
                         member.username = result.username;
                         member.password = result.password;
                         member.Member_IDNum = result.Member_IDNum;
   request(config.api)
   .post('/api/members')
   .send(member)
   .set('Authorization', 'Bearer ' + token)
   .expect(422)
   .end(function (err, res) {
     if (err) {
      console.log(err);
      reject(err);
     }
     else{
          response = res.body;
          assert.equal(response.error.message,"The `Member` instance is not valid. Details: `email` can't be blank (value: \"\").");
          resolve(response);
     }
      });
     });
})
.then(function(result, reject) {
    return new Promise(function(resolve){
      resolve(result.id);
    });
})
.then(function(result) {
    return testingData.UpdateMember(member);
})
.then(function(){
done();
})
});

it("Should return an error when username is null", function (done) {

var member = require('../member/member.json').member;
var testingDataa = require("../../Sample.spec.js");
var out;
testingDataa.AddTestingMember()
.then( function(result){  return new Promise(function(resolve,reject){
                         member.firstName = result.firstname;
                         member.lastName = result.lastname;
                         member.phone = result.primaryphonenumber;
                         member.email = result.primaryemailaddress;
                         member.username = "";
                         member.password = result.password;
                         member.Member_IDNum = result.Member_IDNum;
   request(config.api)
   .post('/api/members')
   .send(member)
   .set('Authorization', 'Bearer ' + token)
   .expect(422)
   .end(function (err, res) {
     if (err) {
      console.log(err);
      reject(err);
     }
     else{
          response = res.body;
          assert.equal(response.error.message,"The `Member` instance is not valid. Details: `username` can't be blank (value: \"\").");
          resolve(response);
     }
      });
     });
})
.then(function(result, reject) {
    return new Promise(function(resolve){
      resolve(result.id);
    });
})
.then(function(result) {
    return testingData.UpdateMember(member);
})
.then(function(){
done();
})
});

});
