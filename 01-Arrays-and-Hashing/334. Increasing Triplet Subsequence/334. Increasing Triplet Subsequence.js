1/**
2 * @param {number[]} nums
3 * @return {boolean}
4 */
5var increasingTriplet = function(nums) {
6    let first = Infinity;
7    let second = Infinity;
8
9    for(const num of nums){
10        if(num <= first){
11            first = num;
12        } else if (num <= second){
13            second = num;
14        } else {
15            return true;
16        }
17    }
18    return false;
19};