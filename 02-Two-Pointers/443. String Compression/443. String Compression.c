1/**
2 * @param {character[]} chars
3 * @return {number}
4 */
5var compress = function(chars) {
6    let write = 0;
7    let read = 0;
8
9    while(read < chars.length){
10        let currentChar = chars[read];
11        let count = 0;
12
13        while(read < chars.length && chars[read] === currentChar){
14            read++;
15            count++;
16        }
17        chars[write] = currentChar;
18        write++;
19
20        if(count > 1){
21            let countStr = count.toString();
22            for(let i = 0; i < countStr.length; i++){
23                chars[write] = countStr[i];
24                write++;
25            }
26        }
27    }
28    return write;
29};