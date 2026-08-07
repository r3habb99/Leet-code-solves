1/**
2 * @param {number[]} flowerbed
3 * @param {number} n
4 * @return {boolean}
5 */
6var canPlaceFlowers = function(flowerbed, n) {
7    let count = n;
8    for(let i = 0; i < flowerbed.length ; i++){
9        if (count === 0) return true;
10        const isCurrentEmpty = flowerbed[i] === 0;
11        const isLeftEmpty = (i === 0) || (flowerbed[i - 1] === 0);
12        const isRightEmpty = (i === flowerbed.length - 1) || (flowerbed[i + 1] === 0);
13
14        if (isCurrentEmpty && isLeftEmpty && isRightEmpty) {
15        flowerbed[i] = 1;
16        count--;
17        }
18    }
19    return count <= 0;
20};