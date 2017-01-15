##Encoding

ASCII images contain quite a bit of white space and contiguous repeated characters. My approach to encoding is to mark repeated characters as a number, reducing the number of characters and therefore the size.


###Cases

Single character
'a' ==> 'a'

Duplicates
'aa' ==> 'aa'
'aaa' ==> 'aa1'
'aaaa' ==> 'aa2'

'55' ==> 55
'555' ==> 551

Special Cases
Numbers after 2 numbers
'5566a7' ==> 55\66a (Use \ to escape)
'5555555555555' ==> 559551  (13 fives)


// 5 spaces
'     ' ==> '  3'


//prevent bloat
if length of output > length of original string, return original string
