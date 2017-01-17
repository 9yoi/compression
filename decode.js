var Decode = function (string) {

  var code = string;

  Decode.prototype.decode = function () {
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

module.exports = Decode;
