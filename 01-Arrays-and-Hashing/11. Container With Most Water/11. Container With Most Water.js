1/**
2 * @param {number[]} height
3 * @return {number}
4 */
5var maxArea = function(height) {
6    let left = 0;
7    let right = height.length - 1;
8    let maxWater = 0;
9    while(left < right){
10        const width = right - left;
11        const currentHeight = Math.min(height[left], height[right]);
12
13        const currentWater = width * currentHeight;
14        maxWater = Math.max(maxWater, currentWater);
15
16        if(height[left] < height[right]){
17            left++;
18        } else {
19            right--
20        }
21    }
22    return maxWater;
23};