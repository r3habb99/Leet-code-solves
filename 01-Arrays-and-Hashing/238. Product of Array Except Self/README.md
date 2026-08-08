<h2><a href="https://leetcode.com/problems/product-of-array-except-self">238. Product of Array Except Self</a></h2>

<p>Given an integer array <code>nums</code>, return <em>an array</em> <code>answer</code> <em>such that</em> <code>answer[i]</code> <em>is equal to the product of all the elements of</em> <code>nums</code> <em>except</em> <code>nums[i]</code>.</p>

<p>The product of any prefix or suffix of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</p>

<p>You must write an algorithm that runs in&nbsp;<code>O(n)</code>&nbsp;time and without using the division operation.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> nums = [1,2,3,4]
<strong>Output:</strong> [24,12,8,6]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> nums = [-1,1,0,-3,3]
<strong>Output:</strong> [0,0,9,0,0]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-30 &lt;= nums[i] &lt;= 30</code></li>
	<li>The input is generated such that <code>answer[i]</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow up:</strong>&nbsp;Can you solve the problem in <code>O(1)</code>&nbsp;extra&nbsp;space complexity? (The output array <strong>does not</strong> count as extra space for space complexity analysis.)</p>


---

# 🛍️ Product-of-Array-Except-Self | Explained

## Approach 1: Two-Pass Prefix & Suffix Product (Space-Optimized)

### Intuition
Imagine you are sitting at a long dinner table with $N$ guests, and each guest has a number. For every guest, you want to find the combined product of everyone else's number **without asking that guest their own number** and **without using division**.

If division were allowed, you could multiply all numbers together and divide by each person's number. However, division is forbidden (and breaks down when a number is zero). 

Instead, notice that the total product for any position `i` is simply:
$$\text{Product Except } i = (\text{Product of all numbers to the left of } i) \times (\text{Product of all numbers to the right of } i)$$

By accumulating the left-hand products in a forward pass and then accumulating the right-hand products on the fly in a backward pass, we can compute the result in linear time using no extra memory beyond the output array.

### Algorithm Visualized

```mermaid
graph TD
    A[Input Array: nums = [1, 2, 3, 4]] --> B[Pass 1: Compute Prefix Products Left to Right]
    B --> C["answer[0] = 1 (no left elements)"]
    C --> D["answer[1] = 1 * 1 = 1"]
    D --> E["answer[2] = 1 * 2 = 2"]
    E --> F["answer[3] = 2 * 3 = 6"]
    F --> G["Intermediate answer: [1, 1, 2, 6]"]
    
    G --> H[Pass 2: Compute Suffix Products Right to Left & Accumulate]
    H --> I["i = 3: answer[3] = 6 * 1 = 6 | rightProduct = 1 * 4 = 4"]
    I --> J["i = 2: answer[2] = 2 * 4 = 8 | rightProduct = 4 * 3 = 12"]
    J --> K["i = 1: answer[1] = 1 * 12 = 12 | rightProduct = 12 * 2 = 24"]
    K --> L["i = 0: answer[0] = 1 * 24 = 24 | rightProduct = 24 * 1 = 24"]
    
    L --> M[Final Result: [24, 12, 8, 6]]
```

### Approach
1. **Prefix Pass (Left-to-Right):**
   - Initialize an `answer` array of length $N$.
   - Set `answer[0] = 1` because there are no elements to the left of index 0.
   - For every subsequent index `i`, set `answer[i] = answer[i - 1] * nums[i - 1]`.
   - At the end of this loop, `answer[i]` stores the product of all elements strictly to the left of `i`.

2. **Suffix Pass (Right-to-Left):**
   - Maintain a running scalar variable `rightProduct = 1` representing the accumulated product of elements to the right of current index `i`.
   - Iterate backward from index $N - 1$ down to $0$.
   - Multiply `answer[i]` by `rightProduct` to combine left and right products.
   - Update `rightProduct *= nums[i]` for the next index to the left.

3. Return `answer`.

### Detailed Code Analysis

The snippet provided contains scrambled elements (the function declaration and comments were pasted at the bottom, and the second loop body was truncated). Reassembling the intended logic gives the following deep-dive analysis:

- `const answer = new Array(n);`: Allocates memory for the result array of size `n`.
- `answer[0] = 1;`: Sets base case for left product accumulation.
- `for (let i = 1; i < n; i++)`: Populates prefix products.
  - `answer[i] = answer[i - 1] * nums[i - 1];`: Computes prefix product incrementally in $O(1)$ per step.
- `let rightProduct = 1;`: Tracks product of all elements to the right of index `i`.
- `for (let i = n - 1; i >= 0; i--)`: Backward iteration combining suffix product on the fly.
  - `answer[i] = answer[i] * rightProduct;`: Combines accumulated left product with accumulated right product.
  - `rightProduct *= nums[i];`: Updates running right product for the next leftward iteration.

### Code

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const answer = new Array(n);

    // Step 1: Compute prefix products
    // answer[i] contains the product of all elements to the left of i
    answer[0] = 1;
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    // Step 2: Compute suffix products on the fly and combine
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] = answer[i] * rightProduct;
        rightProduct *= nums[i];
    }

    return answer;
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(N)$ — Two sequential linear loops over an array of length $N$.
- **Space Complexity:** $\mathcal{O}(1)$ Auxiliary Space — The problem explicitly defines that the output array `answer` does not count towards extra space complexity. Only scalar variables (`n`, `rightProduct`, `i`) are used.

---

# Detailed Section-by-Section Review

## 1. Problem Understanding
* **Inferred Problem:** LeetCode #238 - "Product of Array Except Self" (Inferred from function name and logic).
* **Expected Input:** An integer array `nums` of length $N$ (where $N \ge 2$).
* **Expected Output:** An integer array `answer` where `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`.
* **Important Constraints:**
  - Must run in $\mathcal{O}(N)$ time complexity.
  - **Cannot use the division operation.**
  - Solution must fit within a standard 32-bit integer limits ( guaranteed by problem constraints ).
* **Core Objective:** Calculate left and right cumulative products without calculating full products or using division operations.

---

## 2. High-Level Approach
The core insight is that for any element at index `i`:
$$\text{Output}[i] = \prod_{k=0}^{i-1} \text{nums}[k] \times \prod_{k=i+1}^{N-1} \text{nums}[k]$$

Instead of using $O(N^2)$ brute-force multiplications or using $O(N)$ extra space for two auxiliary arrays (`prefix` and `suffix`), we re-use the output array `answer` to store prefix products in Pass 1, and then iterate backward in Pass 2 using a single variable (`rightProduct`) to accumulate suffix products dynamically.

---

## 3. Step-by-Step Code Explanation

```javascript
const n = nums.length;
const answer = new Array(n);
```
- Determines length `n`.
- Allocates an uninitialized array `answer` of size `n`.

```javascript
answer[0] = 1;
for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] * nums[i - 1];
}
```
- Sets `answer[0] = 1` as no elements exist to the left of index 0.
- Loops from index 1 to `n - 1`. Each position gets the product of the previous prefix product (`answer[i-1]`) and the previous element (`nums[i-1]`).

```javascript
let rightProduct = 1;
for (let i = n - 1; i >= 0; i--) {
    answer[i] = answer[i] * rightProduct;
    rightProduct *= nums[i];
}
```
- Sets `rightProduct = 1` as no elements exist to the right of index `n - 1`.
- Iterates backward from index `n - 1` down to `0`.
- Multiplies current left product in `answer[i]` by `rightProduct`.
- Updates `rightProduct` by multiplying it with `nums[i]`, preparing it for `i - 1`.

---

## 4. Dry Run

### Representative Example: `nums = [1, 2, 3, 4]`

#### Step 1: Prefix Loop (Left to Right)
| Step | `i` | `nums[i]` | `answer[i]` Computation | `answer` Array State | Explanation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Init | - | - | `answer[0] = 1` | `[1, empty, empty, empty]` | Base prefix value set |
| 1 | 1 | 2 | `answer[1] = answer[0] * nums[0] = 1 * 1 = 1` | `[1, 1, empty, empty]` | Prefix product before index 1 |
| 2 | 2 | 3 | `answer[2] = answer[1] * nums[1] = 1 * 2 = 2` | `[1, 1, 2, empty]` | Prefix product before index 2 |
| 3 | 3 | 4 | `answer[3] = answer[2] * nums[2] = 2 * 3 = 6` | `[1, 1, 2, 6]` | Prefix product before index 3 |

#### Step 2: Suffix Loop (Right to Left)
| Step | `i` | `nums[i]` | `rightProduct` (before) | `answer[i] * rightProduct` | `answer` State | `rightProduct` (after) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 3 | 4 | 1 | `6 * 1 = 6` | `[1, 1, 2, 6]` | `1 * 4 = 4` |
| 2 | 2 | 3 | 4 | `2 * 4 = 8` | `[1, 1, 8, 6]` | `4 * 3 = 12` |
| 3 | 1 | 2 | 12 | `1 * 12 = 12` | `[1, 12, 8, 6]` | `12 * 2 = 24` |
| 4 | 0 | 1 | 24 | `1 * 24 = 24` | `[24, 12, 8, 6]` | `24 * 1 = 24` |

**Final Output:** `[24, 12, 8, 6]`

### Edge Case Example: Array with Zeros (`nums = [-1, 1, 0, -3, 3]`)
- **Prefix Pass:** `[1, -1, -1, 0, 0]`
- **Suffix Pass:** 
  - `i=4`: `answer[4] = 0 * 1 = 0`, `rightProduct = 3`
  - `i=3`: `answer[3] = 0 * 3 = 0`, `rightProduct = -9`
  - `i=2`: `answer[2] = -1 * -9 = 9`, `rightProduct = 0` (zero encountered, all further right products become 0)
  - `i=1`: `answer[1] = -1 * 0 = 0`, `rightProduct = 0`
  - `i=0`: `answer[0] = 1 * 0 = 0`, `rightProduct = 0`
- **Output:** `[0, 0, 9, 0, 0]` (Correct: index 2 product is $(-1) \times 1 \times (-3) \times 3 = 9$, all others are 0).

---

## 5. Data Structures Used

* **Array (`answer`):**
  - **Purpose:** Holds prefix products initially, and final answer eventually.
  - **Operations:** Index access/assignment (`answer[i]`).
  - **Complexity:** $\mathcal{O}(1)$ access and update.
  - **Alternatives:** None needed (required by output contract).

---

## 6. Time Complexity Analysis

- **Loop 1 (Prefix Pass):** Iterates from $1$ to $N - 1 \implies N - 1$ steps. Each step executes 1 constant time multiplication $\mathcal{O}(1)$.
- **Loop 2 (Suffix Pass):** Iterates from $N - 1$ down to $0 \implies N$ steps. Each step executes 2 constant time multiplications $\mathcal{O}(1)$.
- **Total Operations:** $(N - 1) + N = 2N - 1$ operations.

**Total Time Complexity:** $\mathcal{O}(N)$

---

## 7. Space Complexity Analysis

- **Input Array:** `nums` of size $N$ ($\mathcal{O}(N)$ space).
- **Output Array:** `answer` of size $N$. Per problem specs, response arrays are **excluded** from auxiliary memory calculations.
- **Auxiliary Variables:** `n`, `rightProduct`, `i` $\implies \mathcal{O}(1)$ space.

**Total Auxiliary Space Complexity:** $\mathcal{O}(1)$

---

## 8. Alternative Approaches

### Approach A: Brute Force (Nested Loops)
* **Idea:** For each index `i`, loop through the entire array and compute the product of all elements where $j \neq i$.
* **Time Complexity:** $\mathcal{O}(N^2)$
* **Space Complexity:** $\mathcal{O}(1)$ auxiliary space.
* **Drawbacks:** TLE (Time Limit Exceeded) for $N > 10^4$.

### Approach B: Division Method
* **Idea:** Compute total product of all elements. Then for each element, `answer[i] = totalProduct / nums[i]`.
* **Time Complexity:** $\mathcal{O}(N)$
* **Space Complexity:** $\mathcal{O}(1)$
* **Drawbacks:** Expressly prohibited by problem statement. Fails completely on inputs containing `0` (division by zero error).

### Approach C: Two Separate Prefix & Suffix Arrays
* **Idea:** Create two extra arrays `L` and `R` of size $N$. `L[i]` stores prefix product, `R[i]` stores suffix product. Combine `answer[i] = L[i] * R[i]`.
* **Time Complexity:** $\mathcal{O}(N)$
* **Space Complexity:** $\mathcal{O}(N)$ auxiliary space.
* **Drawbacks:** Uses $2N$ additional space instead of $O(1)$ auxiliary space.

---

## 9. Compare the Approaches

| Approach | Time | Space (Auxiliary) | Difficulty | Main Idea | When to Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Brute Force** | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | Easy | Nested loop multiplication | $N \le 100$ only |
| **Division** | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ | Easy | Total product divided by self | Never (violates rules, breaks on 0) |
| **Two Auxiliary Arrays** | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | Easy/Medium | Explicit left/right arrays | When memory is unlimited |
| **Optimal Two-Pass (Current)** | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ | Medium | Prefix pass in answer, suffix scalar variable | **Always (Optimal standard)** |

---

## 10. Optimization Opportunities

**"This solution is already asymptotically optimal."**

- **Time Complexity:** Cannot be better than $\mathcal{O}(N)$ because every array element must be visited at least once.
- **Space Complexity:** Cannot be lower than $\mathcal{O}(1)$ extra auxiliary space.
- **Micro-optimizations:** Pass 1 and Pass 2 can be combined into a single loop using two pointers (one moving left-to-right, one right-to-left), but this yields identical $\mathcal{O}(N)$ performance and $\mathcal{O}(1)$ auxiliary space while slightly reducing code readability.

---

## 11. Edge Cases

1. **Array with Single Zero (`[1, 2, 0, 4]`):** Handled correctly. Result index at zero location will equal product of all non-zero numbers ($8$). All other positions become $0$.
2. **Array with Multiple Zeros (`[1, 0, 3, 0]`):** Handled correctly. Every element becomes $0$.
3. **Negative Numbers (`[-1, -2, -3, -4]`):** Multiplication signs preserve parity correctly.
4. **Minimum Array Length ($N = 2$):** Correctly returns `[nums[1], nums[0]]`.

---

## 12. Bugs & Potential Issues

The raw code snippet provided in the input prompt contained structural/pasting errors:
1. **Scrambled Snippet Order:** The line `const n = nums.length; var productExceptSelf = function(nums) { */ * @return ...` was pasted at the bottom instead of the top.
2. **Truncated Loop Body:** The second `for` loop body was cut off mid-declaration without closing braces or a `return` statement.

**Functional Code Correctness:** Once assembled properly, **no logical bugs exist**.

---

## 13. Code Quality Review

* **Readability:** 9/10 — Simple forward and backward passes.
* **Naming:** 9/10 — `rightProduct` and `answer` are clear descriptive names.
* **Maintainability:** 10/10 — Clean procedural flow without complex dependencies.
* **Efficiency:** 10/10 — Single pass equivalent time, minimal overhead.

### Quality Scores
- **Correctness:** 10/10 (When assembled properly)
- **Efficiency:** 10/10
- **Readability:** 9/10
- **Maintainability:** 10/10
- **Overall Score:** 9.75/10

---

## 14. Improved Version

Here is the clean, fully functional production-grade implementation:

```javascript
/**
 * Computes the product of all elements except self for each index.
 * 
 * @param {number[]} nums - Input array of integers
 * @return {number[]} - Output array where answer[i] = product of all nums except nums[i]
 */
function productExceptSelf(nums) {
    const n = nums.length;
    const answer = new Array(n);

    // Pass 1: Compute prefix products directly into the answer array
    answer[0] = 1;
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    // Pass 2: Compute suffix products on the fly and combine with prefix products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return answer;
}
```

### Key Changes Made (Before → After)
- **Before:** Scrambled lines, missing second loop body, cut-off code.
- **After:** Clean function standard definition with explicit return statement.
- **Before:** `answer[i] = answer[i] * rightProduct;`
- **After:** `answer[i] *= rightProduct;` (Concise syntax).

---

## 15. Interview Explanation (60–90 Seconds)

> "To solve 'Product of Array Except Self' in $\mathcal{O}(N)$ time without using division, we can decompose the problem: the result at any index $i$ is the product of all numbers to its left multiplied by the product of all numbers to its right.
> 
> We can optimize space by using our output array to hold the left prefix products first. We do a left-to-right pass where each index stores the cumulative product of all preceding elements. 
> 
> Then, we execute a backward pass from right to left. We use a single scalar variable, `rightProduct`, to keep track of the cumulative product of elements to the right. As we iterate backward, we multiply the existing left product in our output array by `rightProduct`, and update `rightProduct` for the next position.
> 
> This runs in $\mathcal{O}(N)$ time with two sequential passes and uses $\mathcal{O}(1)$ auxiliary space since the output array doesn't count toward extra memory usage."

---

## 16. Interview Questions They May Ask

### Q1: Why can't we use division?
**Answer:** Beyond the explicit problem constraint prohibiting it, division fails if the array contains `0` (division by zero error). Even if handled carefully with zero counts, division introduces edge cases that multi-pass cumulative multiplication naturally avoids.

### Q2: Is it possible to solve this in a single loop pass?
**Answer:** Yes, by keeping two pointers (one moving left-to-right updating prefix products and another right-to-left updating suffix products simultaneously) inside one loop. However, the theoretical complexity remains $O(N)$ operations.

### Q3: How does this handle zero values in `nums`?
**Answer:** Automatically and naturally. If one zero exists, every output element except the index of that zero becomes zero. If two or more zeros exist, all output elements become zero. The multiplication logic handles this without special branching.

### Q4: Does the output array count toward space complexity?
**Answer:** Standard technical interview conventions (and LeetCode rules) exclude the returned output memory structure when analyzing space complexity unless stated otherwise. Therefore, auxiliary space is $O(1)$.

### Q5: What happens if inputs cause 32-bit integer overflow?
**Answer:** In JavaScript, numbers are double-precision floating points (safe integer up to $2^{53}-1$). In languages like C++ or Java, standard 32-bit `int` could overflow, requiring `long long` / `long`.

---

## 17. Concepts I Should Learn

- **Prefix & Suffix Patterns** — *Intermediate*
- **Space Optimization Techniques (In-place array re-use)** — *Intermediate*
- **Two Pointers / Multi-Pass Traversal** — *Beginner*
- **Handling Zero/Edge Constraints without Branching** — *Intermediate*

---

## 18. Final Summary

* **What the code does:** Computes the product of all elements except the current element for each index without division.
* **Main technique:** Two-pass dynamic computation (Prefix pass stored in output array, Suffix pass aggregated via scalar variable).
* **Time Complexity:** $\mathcal{O}(N)$
* **Space Complexity:** $\mathcal{O}(1)$ auxiliary space
* **Best Alternative:** Explicit `prefix[]` and `suffix[]` arrays (easier to read, but requires $\mathcal{O}(N)$ extra space).
* **Biggest Improvement:** Restructuring scrambled input code into a production-ready function structure.
* **Interview Difficulty:** Medium
* **Key Interview Takeaway:** When extra space is constrained to $\mathcal{O}(1)$, reuse output structures as state storage for intermediate steps.