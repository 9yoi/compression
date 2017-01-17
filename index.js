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
    testArt(art);
  });

  function testArt (art) {
    var myEncoding = new Encode(art);
    var code = myEncoding.encode();
    var myDecoding = new Decode(code);
    var decode = myDecoding.decode();
    var results = (art === decode);
    results ? console.log('Successful encoding of sample ascii art') : console.log('failed encoding of sample art');
    return results
  }
}('./data.txt'));


// ADDITIONAL TEST CASES

// Basic test cases. Output ==>  ['a', 'aa', 'aa2', 'aa3', 'aa6']
const basic = ['a', 'aa', 'aaa', 'aaaa', '       '];
// More than 10 duplicates. Output ==> ['aa9aa', 'aa9aa3' ];
const moreThan10 = ['aaaaaaaaaaaa', 'aaaaaaaaaaaaaa']; //12a and 14a
// Cases where input contains numbers. Output ==> ['55|66aa8bc', 'aa6|6bb|2', 'aa3|3', 'aa4|33|4', 'aa3bb|5']
const numbers = ['5566aaaaaaaaabc', 'aaaaaaa6bb2', 'aaaa3', 'aaaaa334', 'aaaabb5' ]
// Cases where duplicates sum up to the number of the next input. Output ==> ['aa3|3']
const countEqualsNext = ['aaaa3']

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

  bool ? console.log(`All tests passed for ${tests}`) : console.log('Some tests failed, try again')
  return bool;
}

const testCases = [basic, moreThan10, numbers, countEqualsNext];

testCases.forEach(function(cases) {
  runTests(cases);
})

// Bloated output ==> should return original instead of encoding
// Output ==> '5566' instead of "55|66"
const bloat = '5566'; 
var myEncoding = new Encode(bloat);
myEncoding.encode();

