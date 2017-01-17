var Encode = function (art) {
  const string = art; 
  let encoded = '';
  let counter = 0;

  Encode.prototype.encode = function () {
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
      console.log('Compression created longer string ==>', encoded)
      console.log('Returning original input :', string);
      return string;
    }
    return encoded;
  }

  Encode.prototype.add = function (i) {
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

  // add an escape character if there is a input number in the ASCII (number that does not indicate a duplicate in output) 
  // case: 5566 ==> 55|66
  // case2: aa6 ==> aa|6
  Encode.prototype.backToBack = function (front, back) {
    var last = encoded[encoded.length - 1];
    //parseInt is needed to convert ' ' to 
    if (last === string[front] && !isNaN(parseInt(string[back]))) {
      return true;
    }
    return false;
  }

  //case: aaaaa3 ==> aa3|3
  //add an escape character if count equals next element
  Encode.prototype.countEqualsNext = function (i) {
    if (counter === parseInt(string[i])) {
      return true;
    }
    return false;
  }

  Encode.prototype.addLast = function (i) {
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
  }
}

module.exports = Encode;
