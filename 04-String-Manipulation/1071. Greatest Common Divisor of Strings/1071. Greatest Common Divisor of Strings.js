1/**
2 * @param {string} str1
3 * @param {string} str2
4 * @return {string}
5 */
6var gcdOfStrings = function(str1, str2) {
7    if(str1 + str2 !== str2 + str1){
8        return '';
9    }
10    let gcdlength = gcd(str1.length,str2.length);
11    return str1.slice(0, gcdlength);
12};
13function gcd(a,b){
14    return b === 0 ? a : gcd(b, a % b);
15}