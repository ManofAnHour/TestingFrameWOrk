"use strict";

var expect = require("chai").expect;
var request = require("supertest");

var data = require("./data.json");

describe("Get /Members/{id}/loyaltyCards/Balance", function deleteMembersIDLoyaltyCardFKSpec() {

  var token = {};
  var putResponse = {};
  var getResponse = {};

  var LoyaltyCard1 = {};
  var LoyaltyCard2 = {};

  var memberID = "";
  var VirtualCardID = "";
  var pointTypeId = "";
  var pointEventId = "";
  var LLOL = "K";

  beforeEach(function grantToken(done) {

    request(data.api)
      .post("/oauth2/token")
      .send(data.cred)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function onError(err, res) {

        if (err) {
          done(err);
        }

        token = res.body.access_token;
        data.cred.token = token;
        done();

      });

  });

  afterEach(function revokeToken(done) {

    // console.log(data.cred);

    request(data.api)
      .post("/oauth2/revoke HTTP/1.1")
      .send(data.cred)
      .end(function onError(err, res) {

        if (err) {
          done(err);
        }

        token = res.body.access_token;
        data.cred.token = token;
        done();

      });

  });

  it("Create a new member",
    function POSTMembers(done) {
      data.member.email = data.member.email+LLOL;
      request(data.api)
        .post("/api/Members")
        .set({
          "Authorization": "Bearer " + token,
          "Accept": "application/json"
        })
        .type("json")
        .send(data.member)
        .expect(200)
        .end(function onError(err, res) {

          if (err) {
            done(err);
          }
          else {
          putResponse = res.body;
          memberID = putResponse.id;

          done();
          }
        });
    });
  it("Should verify that the member was actually added",
      function putMembers(done) {

        request(data.api)
          .get("/api/Members/"+memberID)
          .set({
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
          })
          .type("json")
          .expect(200)
          .end(function onError(err, res) {

            if (err) {
              done(err);
            }

            else{
            getResponse = res.body;
            expect(getResponse.email).to.equal(data.member.email);
            done();
            }
          });
      });
  it("Create first LoyaltyCard for newly created member",
          function putMembers(done) {

          LoyaltyCard1 = {
                            "cardType": 0,
                            "memberId": memberID,
                            "cardNumber" : "11507300012",
                            "isPrimary": 1,
                            "status": 1
                          }
            request(data.api)
              .post("/api/LoyaltyCards")
              .set({
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
              })
              .type("json")
              .send(LoyaltyCard1)
              .expect(200)
              .end(function onError(err, res) {

                if (err) {
                  done(err);
                }

                else{
                getResponse = res.body;
              //  console.log(getResponse);
                expect(getResponse.accountNumber).to.equal(LoyaltyCard1.accountNumber);
                LoyaltyCard1.id = getResponse.id;

                done();
                }
              });
          });
  it("Create second LoyaltyCard for newly created member",
                  function putMembers(done) {

                  LoyaltyCard2 = {
                                    "cardType": 0,
                                    "memberId": memberID,
                                    "cardNumber" : "11507300013",
                                    "isPrimary": 0,
                                    "status": 1
                                  }

                    request(data.api)
                      .post("/api/LoyaltyCards")
                      .set({
                        "Authorization": "Bearer " + token,
                        "Accept": "application/json"
                      })
                      .type("json")
                      .send(LoyaltyCard2)
                      .expect(200)
                      .end(function onError(err, res) {

                        if (err) {
                          done(err);
                        }

                        else{
                        getResponse = res.body;
                    //    console.log(getResponse);
                        expect(getResponse.accountNumber).to.equal(LoyaltyCard2.accountNumber);
                        LoyaltyCard2.id = getResponse.id;
                        VirtualCardID = LoyaltyCard2.id;
                        done();
                        }
                      });
                  });
  it("Verify member has two cards",
    function GETLoyaltyCardsOfMemberByMemberID(done) {
      request(data.api)
        .get("/api/Members/"+memberID+"/loyaltyCards")
        .set({
          "Authorization": "Bearer " + token,
          "Accept": "application/json"
        })
        .type("json")
        .expect(200)
        .end(function onError(err, res) {

          if (err) {
            done(err);
          }
          else{
          getResponse = res.body;
          expect(getResponse.length).to.equal(2);

          done();
          }
        });

    });

  it("Get pointTypeId for Base Points",
    function GETPointTypeIDForBasePoints(done){
    var PointTypeName = "BasePoints"
    request(data.api)
      .get("/api/PointTypes/findOne?filter[where][name]="+PointTypeName)
      .set({
        "Authorization": "Bearer " + token,
        "Accept": "application/json"
      })
      .type("json")
      .expect(200)
      .end(function onError(err, res) {

        if (err) {
          done(err);
        }
        else{
        getResponse = res.body;
        pointTypeId = getResponse.id;
        done();
        }
      });
   });
  it("Get pointEventId for Base Points",
      function GETPointEventIDForBasePoints(done){
          var PointEventName = "PurchaseActivity"
            request(data.api)
            .get("/api/PointEvents/findOne?filter[where][name]="+PointEventName)
            .set({
        "Authorization": "Bearer " + token,
        "Accept": "application/json"
      })
      .type("json")
      .expect(200)
      .end(function onError(err, res) {

        if (err) {
          done(err);
        }
        else{
        getResponse = res.body;
        pointEventId = getResponse.id;
        done();
        }
      });
  });


  it("Add some points to one of the cards",
                    function putMembers(done) {

                    var PointTransaction1 = {
                                              "expirationDate": "2016-05-16",
                                              "pointAwardDate": "2016-05-16",
                                              "pointEventId": pointEventId,
                                              "points": 15,
                                              "pointTypeId": pointTypeId,
                                              "transactionDate": "2016-05-16",
                                              "loyaltyCardId": VirtualCardID
                                             }

                      request(data.api)
                        .post("/api/LoyaltyPoints")
                        .set({
                          "Authorization": "Bearer " + token,
                          "Accept": "application/json"
                        })
                        .type("json")
                        .send(PointTransaction1)
                        .expect(200)
                        .end(function onError(err, res) {

                          if (err) {
                            done(err);
                          }

                          else{
                          getResponse = res.body;
                          console.log(getResponse);
                      //    expect(getResponse.accountNumber).to.equal(LoyaltyCard2.accountNumber);
                    //      LoyaltyCard2.id = getResponse.id;
                  //        VirtualCardID = LoyaltyCard2.id;
                          done();
                          }
                        });
                    });


  it("Should delete " + data.api + "/Members/{id}/loyaltyCards{fk}",
      function deleteLoyaltyCardsOfMemberByMemberID(done) {



        request(data.api)
          .delete("/api/Members/"+memberID+"/loyaltyCards/"+VirtualCardID)
          .set({
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
          })
          .type("json")
          .send(LoyaltyCard2)
          .expect(204)
          .end(function onError(err, res) {

            if (err) {
              done(err);
            }
            else{
              done();
            }
          });
      });

  it("Should only return one card",
          function getLoyaltyCardsOfMemberByMemberID(done) {
            request(data.api)
              .get("/api/Members/"+memberID+"/loyaltyCards")
              .set({
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
              })
              .type("json")
              .expect(200)
              .end(function onError(err, res) {

                if (err) {
                  done(err);
                }
                else{
                  getResponse = res.body;

                  expect(getResponse.length).to.equal(1);
                  expect(getResponse.id).to.not.equal(VirtualCardID)
                done();
                }
              });

          });


  it("Delete the members cards",
          function getLoyaltyCardsOfMemberByMemberID(done) {
            request(data.api)
              .delete("/api/Members/"+memberID+"/loyaltyCards")
              .set({
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
              })
              .type("json")
              .expect(204)
              .end(function onError(err, res) {

                if (err) {
                  done(err);
                }
                else{
                done();
                }
              });

          })
  it("Delete the newly created member",
    function deleteMemberId(done) {

      request(data.api)
        .delete("/api/Members/" + memberID)
        .set({
          "Authorization": "Bearer " + token,
          "Accept": "application/json"
        })
        .send({})
        .end(function onError(err, res) {

          if (err) {

            done(err);

          }

          expect(res.body.count).to.equal(1);

          done();

        });

    });

});
