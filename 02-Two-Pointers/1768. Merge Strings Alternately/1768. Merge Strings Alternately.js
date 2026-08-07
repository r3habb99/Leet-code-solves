1/**
2 * @param {string} word1
3 * @param {string} word2
4 * @return {string}
5 */
6var mergeAlternately = function(word1, word2) {
7    let merged = [];
8    let maxlength = Math.max(word1.length, word2.length);
9
10    for(let i = 0; i < maxlength; i++){
11        if(i < maxlength){
12            merged.push(word1[i]);
13        }
14        if(i < maxlength){
15            merged.push(word2[i]);
16        }
17
18    }
19    return merged.join('');
20};