1/**
2 * @param {number[]} candies
3 * @param {number} extraCandies
4 * @return {boolean[]}
5 */
6var kidsWithCandies = function(candies, extraCandies) {
7    let maxCandies = Math.max(...candies);
8    return candies.map(candy => candy + extraCandies >= maxCandies);
9};