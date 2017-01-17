// dependencies: node, fs and code in other files
const fs = require('fs');
const Encode = require('./encode.js');
const Decode = require('./decode.js');

//TEST GIVEN IMAGE
(function (asciiFile) {
  let art = '';
  // read sample ascii art into memory
  fs.readFile(asciiFile, 'ASCII', function (err,data) {
    if (err) {
      return console.log(err);
    }
    art = JSON.stringify(data);
    //console.log('read ASCII art into memory', art);
    testArt(art);
  });

  function testArt (art) {
    var myEncoding = new Encode(art);
    var code = myEncoding.encode();
    //console.log(code, 'code');
    var myDecoding = new Decode(code);
    var decode = myDecoding.decode();
    console.log(decode, 'decode');
    var results = (art === decode);
    results ? console.log('successful encoding') : console.log('failed encoding');
    return results
  }
}('./data.txt'));


// RUN TESTS ON STRINGS
var test0 = 'aaaaa334'
var test = 'aaaabb5'

const basic = ['a', 'aa', 'aaa', 'aaaa']
const basic_decode = ['a', 'aa', 'aa2', 'aa3']
const whiteSpace = ['       ']; // 7 spaces ==> '  6'

// more than 10 duplicates
const moreThan10 = ['aaaaaaaaaaaa', 'aaaaaaaaaaaaaa']; //12a and 14a
const moreThan10_decode = ['aa9aa', 'aa9aa3' ];

// Cases where input contains numbers and they do not indicate duplicates
const numbers = ['5566aaaaaaaaabc', 'aaaaaaa6bb2', 'aaaa3' ] //back to back, count equals next
const numbers_decode = ['55|66aa8bc', 'aa6|6bb|2', 'aa3|3']

// Bloated output ==> should return original

var runTests = function (tests, solutions) {
  var bool = true;
  tests.forEach(function(test, index) {
    var myEncoding = new Encode(test);
    var code = myEncoding.encode();
    if (code !== solutions[index]) {
      console.log(`This test case failed: ${test}`);
      bool = false;
    }
  });
  bool ? console.log('all tests passed') : console.log('some tests failed, try again')
  return bool;
}

var runEncode = function (tests) {
  var codes = [];
  tests.forEach(function(test, index) {
    var myEncoding = new Encode(test);
    var code = myEncoding.encode();
    codes.push(code);
  });
  return codes;
}

//console.log(runEncode(whiteSpace));  // ==> all tests passes
//runTests(basic, basic_decode);  // ==> all tests passes
//runTests(moreThan10, moreThan10_decode); // ==> all tests passed
//runTests(numbers, numbers_decode); // ==> all tests passed
//console.log(runEncode (numbers));
//var decode = myEncoding.decode(code);
// console.log(decode, 'decode');

var runDecode = function (tests) {
  var decodes = [];
  tests.forEach(function(test, index) {
    var myDecoding = new Decode();
    var decode = myDecoding.decode(test);
    decodes.push(decode);
  });
  console.log(decodes);
  return decodes;
}

// runDecode(['a', 'aa', 'aa2', 'aa3']);
// runDecode(['aa9aa', 'aa9aa3']);
// runDecode(['55|66aa8bc', 'aa6|6bb|2', 'aa3|3']);
