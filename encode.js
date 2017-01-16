let Compress = function (art) {
  const string = art; 
  let encoded = '';
  let decoded = '';
  let counter = 0;

  Compress.prototype.encode = function () {
    for (var i = 0; i < string.length; i++) {
      // first element
      if (i === 0) {
        encoded += string[i]; 
        continue;
      }
      // duplicate
      if (string[i] === string[i-1]) {
        counter ++;
      } 
      //counter reaches 10 duplicates
      if (counter === 10) {    
        this.add(i);
        continue;
      }  
      // different character shows up
      if (string[i] !== string[i-1]) {    
        this.add(i);
        continue;
      } 
      // add chunk when last element
      if (i === string.length - 1) {
        this.addLast(i);
      }
    }
    // prevent bloat. If encoding increases length, return original string
    if (encoded.length > string.length) {
      console.log('Failed: Compression returned a longer string')
      console.log('bloated output: ', encoded);
      return string;
    }
    return encoded;
  }

  Compress.prototype.add = function (i) {
    // one unique character (abc) ==> add item
    if (counter === 0) {
      if (this.countEqualsNext(i) || this.backToBack(i, i)) {
        encoded += '|' + string[i];
      } else {
        encoded += string[i];
      }
    } 
    // 2 duplicates (aabb) ==> add item twice
    else if (counter === 1) {
      if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
        encoded += string[i-1] + '|' + string[i];
      } else {
        encoded += string[i-1] + string[i];
      } 
    }
    // counter === 10 ==> add and reset counter
    else if (counter === 10) {
      console.log('10th');
      encoded += string[i-1] + (counter - 1) + string[i];
    }


    else if (counter === 1) {
      if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
        encoded += string[i-1] + '|' + string[i];
      } else {
        encoded += string[i-1] + string[i];
      } 
    }
    // more than 2 duplicates (aaa) ==> add item + counter
    else {    
      if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
        encoded += string[i-1] + counter + '|' + string[i];
      } else {
        encoded += string[i-1] + counter + string[i];
      }
    }
    counter = 0; //reset counter
    return encoded;
  }

  // case: 5566 ==> 55|66
  // case2: aa6 ==> aa|6
  // add an escape character if number comes after a double
  Compress.prototype.backToBack = function (front, back) {
    var last = encoded[encoded.length - 1];
    if (last === string[front] && !isNaN(string[back])) {
      return true;
    }
    return false;
  }

  //case: aaaaa3 ==> aa3|3
  //add an escape character if count equals next element
  Compress.prototype.countEqualsNext = function (i) {
    if (counter === parseInt(string[i])) {
      return true;
    }
    return false;
  }

  Compress.prototype.addLast = function (i) {
    // one unique character (abc)
    if (counter === 0) {
      encoded += string[i];
    } 
    // 2 duplicates (bb or bb8)
    else if (counter === 1) {
      // case: bb8
      if (string[i] !== string [i-1]) {
        if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
          encoded += string[i-1] + '|' + string[i];
        } else {
          encoded += string[i-1] + string[i];          
        }
      }
      //case: bb
      else {
        encoded += string[i];
      }
    }
    // more than 2 duplicates and last item is something new: aaaab ==> aa2b
    else if (string[i] !== string [i-1]) { 
      if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
        encoded += string[i-1] + counter + '|' + string[i];
      } else {
        encoded += string[i-1] + counter + string[i];
      }
    }
    // more than 2 duplicates and last item is the counter: aaaa ==> aa2
    else {
      if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
        encoded += string[i-1] + '|' + counter;
      }else {
        encoded += string[i-1] + counter;
      } 
    }
    console.log(encoded, i, 'addingLast');
  }

  Compress.prototype.decode = function (code) {
    var decode = '';
    var printRepeats = false;
    var copies = 0;
    var parent = ''
    
    for (var i = 0; i < code.length; i++) {
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

/*
  _            _       
 | |          | |      
 | |_ ___  ___| |_ ___ 
 | __/ _ \/ __| __/ __|
 | ||  __/\__ \ |_\__ \
  \__\___||___/\__|___/
  tests
*/

var test0 = 'aaaaa334'
var test = 'aaaabb5'

const basic = ['a', 'aa', 'aaa', 'aaaa']
const basic_decode = ['a', 'aa', 'aa2', 'aa3']

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
    var myEncoding = new Compress(test);
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
    var myEncoding = new Compress(test);
    var code = myEncoding.encode();
    codes.push(code);
  });
  return codes;
}

var runDecode = function (tests) {
  var decodes = [];
  tests.forEach(function(test, index) {
    var myEncoding = new Compress(test);
    var decode = myEncoding.decode();
    decodes.push(decode);
  });
  return decodes;
}

runDecode(['a', 'aa', 'aa2', 'aa3'])

//runTests(basic, basic_decode);  // ==> all tests passes
//runTests(moreThan10, moreThan10_decode); // ==> all tests passed
//runTests(numbers, numbers_decode); // ==> all tests passed
//console.log(runEncode (numbers));
//var decode = myEncoding.decode(code);
// console.log(decode, 'decode');
