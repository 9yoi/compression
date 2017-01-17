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
    var myDecoding = new Decode(code);
    var decode = myDecoding.decode();
    console.log(decode, 'decode');
    var results = (art === decode);
    results ? console.log('successful encoding of sample art') : console.log('failed encoding of sample art');
    return results
  }
}('./data.txt'));


// RUN TESTS ON STRINGS
const basic = ['a', 'aa', 'aaa', 'aaaa', '       '];
const basic_decode = ['a', 'aa', 'aa2', 'aa3', 'aa6']

// more than 10 duplicates
const moreThan10 = ['aaaaaaaaaaaa', 'aaaaaaaaaaaaaa']; //12a and 14a
const moreThan10_decode = ['aa9aa', 'aa9aa3' ];

// Cases where input contains numbers and they do not indicate duplicates
const numbers = ['5566aaaaaaaaabc', 'aaaaaaa6bb2', 'aaaa3', 'aaaaa334', 'aaaabb5' ] //back to back, count equals next
const numbers_decode = ['55|66aa8bc', 'aa6|6bb|2', 'aa3|3', 'aa4|33|4', 'aa3bb|5']

// Bloated output ==> should return original
const bloat = ['5566']; 
const bloat_decode = ['5566'] //instead of "55|66" as it is longer

// Encode, then decode. Check that decoded art is the same as input
var runTests = function (tests) {
  var bool = true;

  tests.forEach(function(test, index) {
    var myEncoding = new Encode(test);
    var code = myEncoding.encode();
    var myDecoding = new Decode(code);
    var decode = myDecoding.decode();

    if (tests[index] !== decode) {
      console.log(`This test case failed: ${test}`);
      bool = false;
    }
  });

  bool ? console.log('all tests passed') : console.log('some tests failed, try again')
  return bool;
}

runTests(basic, basic_decode);  // ==> all tests passes
runTests(moreThan10, moreThan10_decode); // ==> all tests passed
runTests(numbers, numbers_decode); // ==> all tests passed

