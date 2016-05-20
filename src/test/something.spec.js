var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;



var request = require('supertest');


describe('This is something fun',
function(){

it("should verify that true is true",
function(done){

expect(true).to.be.true;
done();

});

it("should verify that true is true",
function(done){
expect(false).to.be.true;
done();



});

});
