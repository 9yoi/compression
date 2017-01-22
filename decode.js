var Decode = function (string) {
  this.code = string;
}

Decode.prototype.decode = function () {
  var decode = '';
  var printRepeats = false;
  var copies = 0;
  var parent = ''
  
  for (var i = 0; i < this.code.length; i++) {
    // if you find an escape character before a number
    if (this.code[i] === '|' && parseInt(this.code[i+1])) {
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
      decode += this.code[i];
    }
    // if you see 2 duplicates and the next item is a number: aa2
    // toggle boolean to print duplicates for next round
    if (!printRepeats && this.code[i] === this.code [i-1] && parseInt(this.code[i+1])) {
      printRepeats = true;
      parent = this.code[i];
      copies = parseInt(this.code[i+1]);
      decode += this.code[i];
    }

  }
  return decode;
}

module.exports = Decode;
