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
      // last element 
      if (i === string.length - 1) {
        this.addLast(i);
        break;
      }
     // conditions to add chunks: 
     // different character shows up, counter reaches 10 duplicates
      if (string[i] !== string[i-1] || counter === 10 ) {    
        this.add(i);
      }
    }
    // prevent bloat. If encoding increases length, return original string
    if (encoded.length > string.length) {
      console.log('Failed: Compression returned a longer string')
      return string;
    }
    return encoded;
  }

  Compress.prototype.add = function (i) {
    // one unique character (abc) ==> add item
    if (counter === 0) {
      if (this.countEqualsNext(i) || this.backToBack(i)) {
        encoded += '|' + string[i];
      } else {
        encoded += string[i];
      }
    } 
    // 2 duplicates (aabb) ==> add item twice
    else if (counter === 1) {
      encoded += string[i-1] + string[i];     
    }
    // more than 2 duplicates (aaa) ==> add item + counter
    else {    
      if (this.countEqualsNext(i) || this.backToBack(i)) {
        encoded += string[i-1] + counter + '|' + string[i];
      } else {
        encoded += string[i-1] + counter + string[i];
      }
    }
    counter = 0; //reset counter
    console.log(encoded, 'adding')
    return encoded;
  }

  // case: 5566 ==> 55|66
  // add an escape character if you get back to back numbers
  Compress.prototype.backToBack = function (i) {
    if (!isNaN(string[i-1]) && !isNaN(string[i])) {
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
    if (this.countEqualsNext(i)) {
      encoded += string[i-1] + counter + '|' + string[i];
    }
    // one unique character (abc) or two dups ==> add item
    else if (counter === 0 || counter === 1) {
      encoded += string[i];
    } 
    // more than 2 duplicates and last item is different: aaaa ==> aa2
    else if (string[i] !== string [i-1]) { 
      encoded += string[i-1] + counter + string[i]
    }
    // more than 2 duplicates and last item is the same: aaaab ==> aa2b
    else {      
      encoded += string[i-1] + counter;
    }
  }

  Compress.prototype.decode = function (code) {
    var decode = '';
    var printRepeats = false;
    var copies = 0;
    var parent = ''
    
    for (var i = 0; i < code.length; i++) {
      if (printRepeats) {
        console.log(copies, 'copies', i);
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
        console.log(copies, 'adding copies')
        decode += code[i];
      }

    }
    return decode;
  }

}

var test0 = 'aaaaa334'
var test = 'aaaabb5'
var myEncoding = new Compress(test);
var code = myEncoding.encode();
console.log(code, 'code')
var decode = myEncoding.decode(code);
console.log(decode, 'decode');
