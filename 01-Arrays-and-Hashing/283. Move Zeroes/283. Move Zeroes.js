1/**
2 * @param {number[]} nums
3 * @return {void} Do not return anything, modify nums in-place instead.
4 */
5var moveZeroes = function(nums) {
6    let lastNonZeroFoundAt = 0;
7
8    for(let i = 0; i < nums.length; i++){
9        if(nums[i] !== 0){
10            nums[lastNonZeroFoundAt] = nums[i];
11            lastNonZeroFoundAt++;
12        }
13    }
14
15    for(let i = lastNonZeroFoundAt; i < nums.length; i++){
16        nums[i] = 0;
17    }
18};