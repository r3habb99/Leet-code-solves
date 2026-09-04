1/**
2 * @param {string} s
3 * @param {string} t
4 * @return {boolean}
5 */
6var isSubsequence = function(s, t) {
7    let sIndex = 0;
8    let tIndex = 0;
9
10    while(sIndex < s.length && tIndex < t.length){
11        if(s[sIndex] === t[tIndex]){
12            sIndex++;
13        }
14        tIndex++;
15    }
16    return sIndex === s.length;
17};