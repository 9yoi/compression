# ASCII art encoding
ASCII images contain quite a bit of white space and contiguous repeated characters. My approach to encoding is to mark repeated characters as a number, reducing the number of characters and therefore the size.

## Examples

#### Single character
* a ==> a

#### Duplicates
Duplicates would be counted and indicated after a "double" of the character

* aa ==> aa
* aaa ==> aa2
* aaaa ==> aa3
* 55 ==> 55

#### More than 10 duplicates
The counter for duplicates is capped at 9 as the decoding function reads one element at a time in the string

* aaaaaaaaaaaa ==> aa9aa  (12 a)
* aaaaaaaaaaaaaa ==> aa9aa3 (14a)

#### Numbers in the input that follows a double
Use '|' to escape cases when the number is part of the input and does not indicate duplicates

* 5566aaaaaaaaabc ==> 55|66aa8bc
* aaaaaaa6bb2 ==> aa6|6bb|2
* aaaa3 ==> aa3|3
* aaaaa334 ==> 'aa4|33|4'
* aaaabb5 ==> 'aa3bb|5'

#### Duplicates sum up to next input
Use '|' to escape cases when the count of duplicates sum up to the next number

* aaaa3 ==> aa3|3

#### Bloat
If length of output > length of original string, return original string

* 5566 ==> 5566 instead of 55|66

## Tests

Test cases are written in index.js for sample ascii art given in data.txt and all the test cases stated above. To run tests: 

    npm start

## Performance

For sample artwork in data.txt containing 100 X 100 ASCII characters

Input Size: 10,000 bytes
Output Size: 5,582 bytes

Size Reduction: 44%

## Potential Improvements

If inputs contain a lot of contiguous duplicates that often go above 9 duplicates, consider using another way of denoting repeats that allow for counter to go above 9

e.g. a(104) ==> 104 repeats of a
