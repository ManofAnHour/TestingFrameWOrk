var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;



var request = require('supertest');
var http = require("http");
var exports = module.exports = {};
var HH = {};
var OutpUt = {};


var IsMember = function(res){
  res.body.should.have.property("status",1);
};




var getCall = function GetCall(ID, callback)
{

  var toke = {};
  request("pcty7647.brierley.com")
    .get("/MemberTest/Api/Member?i="+ID)
    .expect(200)
    .expect(IsMember)
    .end(function (err, res) {

      if (err) {
       console.log(err);

      }
      else{
      OutpUt = res.body;
      if (OutpUt !== null) {

        expect(true).to.be.true;
        HH = res.body;
      //  console.log("HHHH" + toke);
        return callback(HH);
      }
      }

});
return callback(HH);
};

function AddTestingMemberqq(dd)
{
  return new Promise(function(resolve,reject)
  {
    var HH = {};
  request("pcty7647.brierley.com")
    .put("/MemberTest/Api/Member?i=0")
    .expect(200)
    .end(function (err, res) {

      if (err) {
       reject(err);

      }
      else{
      OutpUt = res.body;
      if (OutpUt !== null) {

        expect(true).to.be.true;
        HH = res.body;
        dd = res.body;
        resolve(HH);
      }
      }

});
});
};

var AddTestingMember = function AddTestingMember(ID, callback)
{
  request("pcty7647.brierley.com")
    .put("/MemberTest/Api/Member?i=0")
    .expect(200)
    .expect(IsMember)
    .end(function (err, res) {

      if (err) {
       console.log(err);

      }
      else{
      OutpUt = res.body;
      if (OutpUt !== null) {

        expect(true).to.be.true;
        HH = res.body;
        return callback(HH);
      }
      }

});
return callback(HH);
};


function UpdateMember(Mem)
{
  return new Promise(function (resolve , reject)
  {
    var HH = {};
    if (Mem.ipcode === null || Mem.ipcode == 0 || Mem.ipcode == undefined)
    {
       Mem.status = -1;
    }
    else if (Mem.ipcode != null && Mem.ipcode.length >= 1 && Mem.ipcode != 0)
    {
      Mem.status = 1;
    }

  request("pcty7647.brierley.com")
    .put("/MemberTest/Api/Member")
    .send(Mem)
    .expect(200)
    .end(function KK(err, res) {

      if (err)
      {
       reject(err);
      }
      else{
      OutpUt = res.body;

      if (OutpUt !== null) {
        expect(true).to.be.true;
        HH = res.body;
    //    console.log(HH)

        resolve(HH);
        }

      }


});
});
};


// var body;
//   var options = {
//     "method": "GET",
//     "hostname": "pcty7647.brierley.com",
//     "port": null,
//     "path": "/MemberTest/Api/Member?i="+ID,
//     "headers": {
//       "cache-control": "no-cache",
//       "postman-token": "f217601f-db7f-4cd2-a5ad-0311ab72f10a"
//     }
//   };
//
//   var req = http.request(options, function (res) {
//     var chunks = [];
//
//     res.on("data", function (chunk) {
//       chunks.push(chunk);
//     });
//
//     res.on("end", function () {
//
//       body = Buffer.concat(chunks);
//       console.log(body.toString());
//       parsed = JSON.parse(body);
//       //   OutpUt = body;
//       //  return OutpUt;
//     });
//   });
//
//   req.end();
//   return(parsed);
//};



exports.getCall = getCall;
exports.UpdateMember = UpdateMember;
exports.AddTestingMember = AddTestingMemberqq;
