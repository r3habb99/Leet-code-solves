1/**
2 * @param {string} s
3 * @return {string}
4 */
5var reverseWords = function(s) {
6    return s.trim().split(/\s+/).reverse().join(' ');
7};