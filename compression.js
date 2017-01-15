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
      encoded += string[i];
    } 
    // process edgeCases if found and return
    else if (this.backToBack(i)) {
      encoded += string[i-1] + "|" + string[i];
    }
    else if (this.countEqualsNext(i)) {
      encoded += string[i-1] + (counter - 1 ) + "|" + string[i];
    }
    // 2 duplicates (aabb) ==> add item twice
    else if (counter === 1) {
      encoded += string[i-1] + string[i];
    }
    // more than 2 duplicates (aaa) ==> add item + counter
    else {      
      encoded += string[i-1] + (counter - 1) + string[i];
      console.log(encoded, 'here');
    }

    counter = 0; //reset counter
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
    if ((counter - 1) === string[i]) {
      return true;
    }
    return false;
  }

  Compress.prototype.addLast = function (i) {
    if (this.countEqualsNext) {
      encoded += string[i-1] + (counter - 1) + "|" + string[i];
    }
    // one unique character (abc) or two dups ==> add item
    else if (counter === 0 || counter === 1) {
      encoded += string[i];
    } 
    // more than 2 duplicates and last item is different: aaaa ==> aa2
    else if (string[i] !== string [i-1]) { 
      encoded += string[i-1] + (counter - 1) + string[i]
    }
    // more than 2 duplicates and last item is the same: aaaab ==> aa2b
    else {      
      encoded += string[i-1] + (counter - 1);
    }
  }

  Compress.prototype.decode = function (string) {

  }

}

var test0 = 'aaaa2'
var test = 'aaaaabbbb'
var myEncoding = new Compress(test0);
console.log(myEncoding.encode(), 'final');
