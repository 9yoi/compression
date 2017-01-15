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
      // //counter reaches 9 duplicates
      // if (counter === 9 ) {    
      //   this.add(i);
      // }  
      // different character shows up
      if (string[i] !== string[i-1]) {    
        this.add(i);
        break;
      } 
      // add chunk when last element
      if (i === string.length - 1) {
        this.addLast(i);
        break;
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

var test0 = 'aaaaa334'
var test = 'aaaabb5'

var basic = ['a', 'aa', 'aaa', 'aaaa', 'aaaa1']
var basic2 = ['aaaaaaaaaaa']; //11 a
var basic3 = ['aaaaaaaaaaaaaa']; //14 a
var edgeCasesMiddle = ['5566abc'] //back to back, count equals next
var edgeCases = ['5566abc', 'aa6bb2abc', 'aaaa3'] //back to back, count equals next
var edgeCasesEnding = ['5566', 'aa6bb2', 'aaaa3']


var runTests = function (tests) {
  tests.forEach(function(test) {
    var myEncoding = new Compress(test);
    var code = myEncoding.encode();
    console.log( test, '===>', code)
  });
}

//runTests(basic);
runTests(basic3);
//runTests(edgeCasesEnding);
//runTests(edgeCasesMiddle);
// var decode = myEncoding.decode(code);
// console.log(decode, 'decode');
