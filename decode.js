var Decode = function (string) {

  const code = string;

  Decode.prototype.decode = function (code) {
    var decode = '';
    var printRepeats = false;
    var copies = 0;
    var parent = ''
    
    for (var i = 0; i < code.length; i++) {
      // if you find an escape character before a number
      if (code[i] === '|' && parseInt(code[i+1])) {
        continue;
      }
      if (printRepeats) {
        while (copies > 2) {
          decode += parent;
          copies --;
        }
        // reset
        parent = '';
        printRepeats = false;
      } else {
        decode += code[i];
      }
      // if you see 2 duplicates and the next item is a number: aa2
      // toggle boolean to print duplicates for next round
      if (!printRepeats && code[i] === code [i-1] && parseInt(code[i+1])) {
        printRepeats = true;
        parent = code[i];
        copies = parseInt(code[i+1]);
        decode += code[i];
      }

    }
    return decode;
  }
}

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

runDecode(['a', 'aa', 'aa2', 'aa3']);
runDecode(['aa9aa', 'aa9aa3']);
runDecode(['55|66aa8bc', 'aa6|6bb|2', 'aa3|3']);
// more than 10 duplicates
const moreThan10 = ['aaaaaaaaaaaa', 'aaaaaaaaaaaaaa']; //12a and 14a
const moreThan10_decode = ['aa9aa', 'aa9aa3'];

// Cases where input contains numbers and they do not indicate duplicates
const numbers = ['5566aaaaaaaaabc', 'aaaaaaa6bb2', 'aaaa3' ] //back to back, count equals next
const numbers_decode = ['55|66aa8bc', 'aa6|6bb|2', 'aa3|3']
