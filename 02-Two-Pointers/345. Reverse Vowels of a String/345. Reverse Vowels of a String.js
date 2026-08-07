1/**
2 * @param {string} s
3 * @return {string}
4 */
5var reverseVowels = function(s) {
6    const vowels = new Set(['a','e','i','o','u','A', 'E', 'I', 'O', 'U']);
7    const chars = s.split('');
8
9    let left = 0;
10    let right = chars.length - 1;
11    while (left < right) {
12        // Increment left pointer until a vowel is found
13        while (left < right && !vowels.has(chars[left])) {
14            left++;
15        }
16        // Decrement right pointer until a vowel is found
17        while (left < right && !vowels.has(chars[right])) {
18            right--;
19        }
20        
21        // Swap the vowels
22        if (left < right) {
23            [chars[left], chars[right]] = [chars[right], chars[left]];
24            left++;
25            right--;
26        }
27    }
28
29    return chars.join('');
30};