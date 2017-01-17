var Encode = function (art) {
  this.string = art; 
  this.encoded = '';
  this.counter = 0;
}

Encode.prototype.encode = function () {
  for (var i = 0; i < this.string.length; i++) {
    // first element
    if (i === 0) {
      this.encoded += this.string[i]; 
      continue;
    }
    // duplicate
    if (this.string[i] === this.string[i-1]) {
      this.counter ++;
    } 
    //counter reaches 10 duplicates
    if (this.counter === 10) {    
      this.add(i);
      continue;
    }  
    // different character shows up
    if (this.string[i] !== this.string[i-1]) {    
      this.add(i);
      continue;
    } 
    // add chunk when last element
    if (i === this.string.length - 1) {
      this.addLast(i);
    }
  }

  // prevent bloat. If encoding increases length, return original string
  if (this.encoded.length > this.string.length) {
    console.log('Compression created longer this.string ==>', this.encoded)
    console.log('Returning original input :', this.string);
    return this.string;
  }
  return this.encoded;
}

Encode.prototype.add = function (i) {
  // one unique character (abc) ==> add item
  if (this.counter === 0) {
    if (this.countEqualsNext(i) || this.backToBack(i, i)) {
      this.encoded += '|' + this.string[i];
    } else {
      this.encoded += this.string[i];
    }
  } 
  // 2 duplicates (aabb) ==> add item twice
  else if (this.counter === 1) {
    if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
      this.encoded += this.string[i-1] + '|' + this.string[i];
    } else {
      this.encoded += this.string[i-1] + this.string[i];
    } 
  }
  // counter === 10 ==> add and reset counter
  else if (this.counter === 10) {
    this.encoded += this.string[i-1] + (this.counter - 1) + this.string[i];
  }

  else if (this.counter === 1) {
    if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
      this.encoded += this.string[i-1] + '|' + this.string[i];
    } else {
      this.encoded += this.string[i-1] + this.string[i];
    } 
  }
  // more than 2 duplicates (aaa) ==> add item + counter
  else {    
    if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
      this.encoded += this.string[i-1] + this.counter + '|' + this.string[i];
    } else {
      this.encoded += this.string[i-1] + this.counter + this.string[i];
    }
  }
  this.counter = 0; //reset counter
  return this.encoded;
}

// add an escape character if there is a input number in the ASCII (number that does not indicate a duplicate in output) 
// case: 5566 ==> 55|66
// case2: aa6 ==> aa|6
Encode.prototype.backToBack = function (front, back) {
  var last = this.encoded[this.encoded.length - 1];
  //parseInt is needed to convert ' ' to 
  if (last === this.string[front] && !isNaN(parseInt(this.string[back]))) {
    return true;
  }
  return false;
}

//case: aaaaa3 ==> aa3|3
//add an escape character if count equals next element
Encode.prototype.countEqualsNext = function (i) {
  if (this.counter === parseInt(this.string[i])) {
    return true;
  }
  return false;
}

Encode.prototype.addLast = function (i) {
  // one unique character (abc)
  if (this.counter === 0) {
    this.encoded += this.string[i];
  } 
  // 2 duplicates (bb or bb8)
  else if (this.counter === 1) {
    // case: bb8
    if (this.string[i] !== this.string [i-1]) {
      if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
        this.encoded += this.string[i-1] + '|' + this.string[i];
      } else {
        this.encoded += this.string[i-1] + this.string[i];          
      }
    }
    //case: bb
    else {
      this.encoded += this.string[i];
    }
  }
  // more than 2 duplicates and last item is something new: aaaab ==> aa2b
  else if (this.string[i] !== this.string [i-1]) { 
    if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
      this.encoded += this.string[i-1] + this.counter + '|' + this.string[i];
    } else {
      this.encoded += this.string[i-1] + this.counter + this.string[i];
    }
  }
  // more than 2 duplicates and last item is the counter: aaaa ==> aa2
  else {
    if (this.countEqualsNext(i) || this.backToBack(i-1, i)) {
      this.encoded += this.string[i-1] + '|' + this.counter;
    }else {
      this.encoded += this.string[i-1] + this.counter;
    } 
  }
}

module.exports = Encode;
