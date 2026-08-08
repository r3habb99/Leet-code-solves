<h2><a href="https://leetcode.com/problems/reverse-words-in-a-string">151. Reverse Words in a String</a></h2>

<p>Given an input string <code>s</code>, reverse the order of the <strong>words</strong>.</p>

<p>A <strong>word</strong> is defined as a sequence of non-space characters. The <strong>words</strong> in <code>s</code> will be separated by at least one space.</p>

<p>Return <em>a string of the words in reverse order concatenated by a single space.</em></p>

<p><b>Note</b> that <code>s</code> may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "the sky is blue"
<strong>Output:</strong> "blue is sky the"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "  hello world  "
<strong>Output:</strong> "world hello"
<strong>Explanation:</strong> Your reversed string should not contain leading or trailing spaces.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "a good   example"
<strong>Output:</strong> "example good a"
<strong>Explanation:</strong> You need to reduce multiple spaces between two words to a single space in the reversed string.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
	<li><code>s</code> contains English letters (upper-case and lower-case), digits, and spaces <code>' '</code>.</li>
	<li>There is <strong>at least one</strong> word in <code>s</code>.</li>
</ul>

<p>&nbsp;</p>
<p><b data-stringify-type="bold">Follow-up:&nbsp;</b>If the string data type is mutable in your language, can&nbsp;you solve it&nbsp;<b data-stringify-type="bold">in-place</b>&nbsp;with&nbsp;<code data-stringify-type="code">O(1)</code>&nbsp;extra space?</p>


---

# 🛍️ Reverse-Words-in-a-String | Explained

## 1. Problem Understanding

The problem **"Reverse Words in a String"** (LeetCode 151) requires us to transform an input string containing words and spaces such that the order of the words is completely reversed.

### Key Requirements & Constraints:
* **Input:** A string `s` consisting of printable ASCII characters (letters, digits, and spaces).
* **Output:** A single string where the sequence of words is reversed, separated by a single space.
* **Constraints:**
  1. $1 \le \text{s.length} \le 10^4$.
  2. `s` may contain leading or trailing spaces (e.g., `"  hello world  "`).
  3. `s` may contain multiple contiguous spaces between words (e.g., `"a   good   example"`).
  4. The returned string **must not** contain leading or trailing spaces.
  5. Multiple spaces between two words in the input string must be reduced to a single space in the output.
* **Core Objective:** Tokenize non-whitespace word sequences, reverse their ordering, and reconstruct the string with uniform single-space formatting.

---

## Approach 1: Built-in Method Chaining (Regex Split & Reverse)

### Intuition
Imagine a row of word blocks placed randomly on a table, surrounded by excess padding and variable gaps. 
1. First, you sweep away the padding at both ends (`trim`).
2. Next, you isolate each individual word block regardless of how many spaces separated them (`split(/\s+/)`).
3. Then, you reverse the sequence of those word blocks from right to left (`reverse`).
4. Finally, you space them out evenly with exactly one gap between adjacent blocks (`join(' ')`).

This approach leverages JavaScript's highly optimized built-in string and array engines to handle space trimming, regex tokenization, array reversal, and string concatenation in a clean functional chain.

### Algorithm Visualized

```mermaid
graph TD
    A["Input String: '  the sky  is blue  '"] -->|s.trim()| B["'the sky  is blue'"]
    B -->|split(/\s+/)| C["['the', 'sky', 'is', 'blue']"]
    C -->|reverse()| D["['blue', 'is', 'sky', 'the']"]
    D -->|join(' ')| E["Output String: 'blue is sky the'"]
```

### Approach
1. **Trim Edge Whitespace:** Strip leading and trailing spaces using `String.prototype.trim()`.
2. **Tokenize via Regex:** Split the trimmed string using the regular expression `/\s+/` (which matches one or more consecutive whitespace characters). This extracts only the non-empty words into an array and automatically ignores extra internal spaces.
3. **Reverse Word Tokens:** Reverse the order of elements in the resulting array in-place using `Array.prototype.reverse()`.
4. **Reconstruct String:** Join the reversed array elements into a single output string separated by `' '` using `Array.prototype.join(' ')`.

### Detailed Code Analysis

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};
```

* **Line 6 — `s.trim()`**:
  * **What it does:** Scans `s` from both ends and returns a new string with leading and trailing whitespaces removed.
  * **Why it is needed:** Prevents empty string tokens from being generated at the beginning or end of the string when splitting.
* **Line 6 — `.split(/\s+/)`**:
  * **What it does:** Evaluates the regex `/\s+/` where `\s` represents any whitespace character (space, tab, newline) and `+` is a quantifier for "one or more times". It breaks the string at every contiguous cluster of spaces and returns an array of substrings (words).
  * **Why it is needed:** Eliminates extra spaces between words and tokenizes valid words cleanly into an array structure.
* **Line 6 — `.reverse()`**:
  * **What it does:** Mutates the generated array in-place, reversing the positions of its elements (e.g., index `0` swaps with index `N-1`).
  * **Why it is needed:** Achieves the core requirement of reversing the word order.
* **Line 6 — `.join(' ')`**:
  * **What it does:** Iterates over the reversed array of word tokens and concatenates them into a single string, placing a single space character `' '` between each consecutive pair.
  * **Why it is needed:** Restores the token array back into the required output string format with standardized single-space delimiters.

---

## 4. Dry Run

Let's execute a detailed dry run using the input: `s = "  the sky  is blue  "`

### Step-by-Step State Tracking

| Execution Step | Function / Operation | Input to Operation | Output of Operation | Memory State / Data Produced |
| :--- | :--- | :--- | :--- | :--- |
| **0** | Initial State | N/A | `"  the sky  is blue  "` | Variable `s` assigned in heap memory |
| **1** | `s.trim()` | `"  the sky  is blue  "` | `"the sky  is blue"` | New intermediate string without outer spaces |
| **2** | `.split(/\s+/)` | `"the sky  is blue"` | `["the", "sky", "is", "blue"]` | Array of 4 word strings allocated |
| **3** | `.reverse()` | `["the", "sky", "is", "blue"]` | `["blue", "is", "sky", "the"]` | Array elements reversed in-place |
| **4** | `.join(' ')` | `["blue", "is", "sky", "the"]` | `"blue is sky the"` | Final single string created and returned |

### Edge Case Dry Run: Multiple Internal Spaces & Single Word

Input: `s = "  world  "`

1. `s.trim()` $\rightarrow$ `"world"`
2. `.split(/\s+/)` $\rightarrow$ `["world"]`
3. `.reverse()` $\rightarrow$ `["world"]`
4. `.join(' ')` $\rightarrow$ `"world"`
*Result is correct.*

---

## 5. Data Structures Used

1. **String (Primitive/Immutable object in JS)**:
   * **Usage:** Represents the input, intermediate trimmed string, and output.
   * **Operation:** Traversal and concatenation.
   * **Complexity:** Creation and string building take $O(N)$ time.
2. **Array (Dense Sequential List)**:
   * **Usage:** Stores extracted word tokens.
   * **Operation:** In-place element reversal via `reverse()`.
   * **Complexity:** `reverse()` runs in $O(K)$ time where $K$ is the number of words.
3. **RegExp (Regular Expression Object)**:
   * **Usage:** Pattern `/\s+/` used as a delimiter rule inside `split()`.
   * **Operation:** Deterministic Finite Automaton (DFA) string matching.
   * **Complexity:** Matches across the string length in $O(N)$ time.

---

## 6. Time Complexity Analysis

Let $N$ be the total length of the input string `s`, and $K$ be the number of extracted words ($K \le N$).

* **`s.trim()`**: Scans the string from left to right and right to left to locate non-whitespace boundaries. Creates a copy of the substring.
  $$\text{Time} = O(N)$$
* **`.split(/\s+/)`**: The V8 JavaScript regex engine parses the trimmed string of length $\le N$. It performs pattern matching for whitespace sequences and allocates substrings into an array.
  $$\text{Time} = O(N)$$
* **`.reverse()`**: Swaps elements in an array of size $K$. Performs $\lfloor K/2 \rfloor$ swaps. Since $K \le N$:
  $$\text{Time} = O(K) \subseteq O(N)$$
* **`.join(' ')`**: Iterates through the $K$ array elements and copies their characters into a new contiguous buffer of length $\le N$.
  $$\text{Time} = O(N)$$

**Total Time Complexity:** $\mathcal{O}(N)$

The algorithm executes in linear time proportional to the character length of the input string.

---

## 7. Space Complexity Analysis

Because strings are **immutable** in JavaScript, operations like `trim()`, `split()`, and `join()` cannot modify memory in-place and must allocate fresh memory.

1. **Trimmed String:** $O(N)$ space in the worst case (if no spaces exist).
2. **Token Array:** Stores $K$ words whose cumulative length is at most $N$. $O(N)$ space.
3. **Reversed Array:** Reused in-place, taking $O(1)$ extra space relative to the token array.
4. **Final Output String:** Allocates a string of length $\le N$. $O(N)$ space.

**Auxiliary Space Complexity:** $\mathcal{O}(N)$  
**Total Space Complexity:** $\mathcal{O}(N)$ (Input + Auxiliary)

---

## 8. Alternative Approaches

### Approach 2: Two-Pointer / Right-to-Left Manual Parsing (No Regex)

#### Intuition
Instead of using regular expressions and array methods, we can scan the string backwards starting from the last character. We locate word boundaries by identifying non-space characters and building words right-to-left.

#### Code
```javascript
var reverseWordsTwoPointer = function(s) {
    let result = [];
    let right = s.length - 1;

    while (right >= 0) {
        // Skip trailing spaces
        while (right >= 0 && s[right] === ' ') {
            right--;
        }
        if (right < 0) break;

        // Find the start of the word
        let left = right;
        while (left >= 0 && s[left] !== ' ') {
            left--;
        }

        // Push word to array
        result.push(s.slice(left + 1, right + 1));

        // Move right pointer past current word
        right = left;
    }

    return result.join(' ');
};
```

#### Complexity Analysis
* **Time Complexity:** $\mathcal{O}(N)$ — Every character in `s` is processed by the pointers at most twice.
* **Space Complexity:** $\mathcal{O}(N)$ — Stores extracted words in an array before joining.
* **Advantages:** Avoids Regular Expression overhead; easier to adapt to lower-level languages (C/C++).
* **Disadvantages:** Slightly more verbose procedural code.

---

### Approach 3: True In-Place Character Array Swapping (Language-Constrained Simulation)

#### Intuition
In languages with mutable strings (like C++), this problem can be solved in $\mathcal{O}(1)$ auxiliary space:
1. Reverse the entire string.
2. Reverse each individual word back to its correct orientation.
3. Shift characters left to clean up duplicate spaces.

In JavaScript, strings are immutable, so we must first convert `s` into an array of characters (`s.split('')`), perform the swaps, and join it back.

#### Code Simulation
```javascript
var reverseWordsInPlace = function(s) {
    // Convert immutable string to mutable character array
    let a = s.split('');
    let n = a.length;

    // Helper: Reverse substring in-place
    function reverse(arr, left, right) {
        while (left < right) {
            let temp = arr[left];
            arr[left++] = arr[right];
            arr[right--] = temp;
        }
    }

    // Step 1: Reverse entire character array
    reverse(a, 0, n - 1);

    // Step 2: Reverse each word in-place
    let i = 0, j = 0;
    while (i < n) {
        while (i < n && a[i] === ' ') i++; // Skip spaces
        if (i >= n) break;
        let start = j;
        while (i < n && a[i] !== ' ') {
            a[j++] = a[i++];
        }
        reverse(a, start, j - 1);
        if (i < n) a[j++] = ' '; // Add single space between words
    }

    // Step 3: Trim trailing extra space if exists
    return a.slice(0, j > 0 && a[j - 1] === ' ' ? j - 1 : j).join('');
};
```

#### Complexity Analysis
* **Time Complexity:** $\mathcal{O}(N)$
* **Space Complexity:** $\mathcal{O}(N)$ in JavaScript (due to string-to-array conversion). $\mathcal{O}(1)$ in C++.
* **Advantages:** Ideal for demonstrating deep algorithmic pointer manipulation in low-level technical interviews.
* **Disadvantages:** Overkill for standard JavaScript development.

---

## 9. Compare the Approaches

| Approach | Time Complexity | Auxiliary Space | Difficulty | Main Idea | When to Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Built-in Regex Method Chain (Original)** | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | Easy | Functional chain: `trim`, regex `split`, `reverse`, `join`. | Standard production JavaScript code; rapid coding interviews. |
| **2. Right-to-Left Manual Parsing** | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | Medium | Two pointers traversing backwards to extract words. | Demonstrating control over manual pointer iterations without Regex overhead. |
| **3. Array Character Swapping (In-Place Simulation)** | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ (JS)<br>$\mathcal{O}(1)$ (C++) | Hard | Reverse overall array, reverse each word, compact spaces. | Interviewer explicitly demands $\mathcal{O}(1)$ auxiliary space or prohibits built-in functions. |

### Recommendation
**Approach 1** is the **best choice** in a real-world JavaScript environment due to its brevity, readability, and leverage of V8 engine built-ins written in C++. However, in a strict coding interview setting, **Approach 2** is frequently requested to test algorithmic logic without relying on language utility methods.

---

## 10. Optimization Opportunities

**This solution is already asymptotically optimal in Time ($\mathcal{O}(N)$) and Space ($\mathcal{O}(N)$) for JavaScript.**

### Micro-optimizations to consider:
1. **Regex Overhead:** Compilation and execution of `/\s+/` carries a minor constant-factor performance penalty compared to simple character comparisons. Replacing `/\s+/` with a single manual linear pass (Approach 2) can yield minor runtime improvements in tight execution loops.
2. **Intermediate Allocation Reduction:** Chaining methods creates multiple short-lived objects (`trim` string, `split` array, `reverse` array, `join` string). While modern V8 Garbage Collectors (Generational GC) handle short-lived objects efficiently, manual parsing reduces total heap allocations.

---

## 11. Edge Cases

| Edge Case | Example Input | Expected Output | Behavior of Provided Code | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Leading & Trailing Spaces** | `"  hello world  "` | `"world hello"` | `trim()` removes outer spaces before splitting. | Passed |
| **Multiple Internal Spaces** | `"a   good   example"` | `"example good a"` | Regex `/\s+/` consumes variable-length spaces cleanly. | Passed |
| **Single Word with Spaces** | `"  hello  "` | `"hello"` | `trim()` results in `"hello"`, `split()` creates `["hello"]`, `join()` outputs `"hello"`. | Passed |
| **Single Character** | `"a"` | `"a"` | Handled cleanly; single element array reversed remains unchanged. | Passed |
| **Spaces Only** | `"     "` | `""` | `trim()` produces `""`, `split(/\s+/)` produces `[""]`, `join(' ')` outputs `""`. | Passed |
| **Digits & Punctuation** | `"123  456! "` | `"456! 123"` | Characters are preserved as non-whitespace word tokens. | Passed |

---

## 12. Bugs & Potential Issues

**No significant correctness issues found.**

The solution properly handles edge cases like leading/trailing spaces and multiple spaces between words due to the robustness of the regular expression `/\s+/`.

---

## 13. Code Quality Review

### Ratings
* **Correctness:** 10/10 — Passes all functional tests and edge cases.
* **Efficiency:** 9/10 — Asymptotically optimal $\mathcal{O}(N)$, though carries minor Regex execution overhead.
* **Readability:** 10/10 — Highly expressive, concise, self-documenting code.
* **Maintainability:** 10/10 — Uses canonical JavaScript standard library methods.
* **Overall Score:** **9.8 / 10**

---

## 14. Improved / Production-Ready Version

To elevate this to enterprise production standards, we can add explicit **type checking**, **null-coalescing/defensive guards**, and standard JSDoc documentation.

```javascript
/**
 * Reverses the order of words in a given string.
 *
 * @param {string} s - The input string containing words separated by spaces.
 * @returns {string} The string with words in reverse order, joined by a single space.
 * @throws {TypeError} If the input is not a string.
 */
function reverseWords(s) {
    // Defensive input check
    if (typeof s !== 'string') {
        throw new TypeError(`Expected string input, received ${typeof s}`);
    }

    // Fast-path for empty or whitespace-only strings
    const trimmed = s.trim();
    if (!trimmed) {
        return '';
    }

    return trimmed.split(/\s+/).reverse().join(' ');
}
```

### Key Differences (Before $\rightarrow$ After):
1. **Added Type Validation:** Throws a clear `TypeError` if non-string input is provided.
2. **Fast-path Guard:** Exits early with `""` if the string contains only spaces, avoiding unnecessary array allocations.
3. **Explicit Function Declaration:** Preferred over `var` arrow functions for named stack traces in production logs.

---

## 15. Interview Explanation (60–90 Second Pitch)

> "To reverse the words in a string while handling variable spaces, my primary strategy is to clean, tokenize, reverse, and join.
>
> In JavaScript, I use a method chain:
> First, I call `.trim()` on the input string to strip leading and trailing whitespace. Next, I tokenize the string using `.split(/\s+/)`. The regular expression `\s+` is key here because it matches one or more consecutive space characters, treating multiple spaces as a single delimiter and preventing empty strings from diluting our array.
>
> Once I have an array of clean word tokens, I call `.reverse()` to flip their ordering in linear time. Finally, I join the reversed array elements with a single space separator using `.join(' ')`.
>
> The overall time complexity is $O(N)$ because `trim`, `split`, `reverse`, and `join` each perform a single pass over the data. The space complexity is $O(N)$ to store the token array and intermediate strings due to string immutability in JavaScript.
>
> If an interviewer asks to perform this in $O(1)$ auxiliary space, I would explain that while JavaScript strings are immutable requiring $O(N)$ space, we could simulate it by using a two-pointer approach or an in-place character swap if string mutation were supported."

---

## 16. Interview Questions & Answers

### Q1: What does the `+` inside the regex `/\s+/` do, and what happens if you remove it?
**Answer:** The `+` quantifier matches **one or more** consecutive whitespace characters. If you remove it and use `.split(/\s/)`, the string will split on *every single* space. As a result, input with multiple adjacent spaces (like `"a   b"`) would produce empty string tokens `""` in the array, causing incorrect multiple spaces in the final output.

### Q2: Is there a way to solve this problem without using Regular Expressions?
**Answer:** Yes. We can use a two-pointer approach scanning from right to left. We scan backwards, skip trailing spaces, locate the start and end of each word using index pointers, extract the word with `slice()`, and push it to a result array. Finally, we join the array with `' '`.

### Q3: Why can't we solve this in $\mathcal{O}(1)$ auxiliary space in JavaScript?
**Answer:** Strings are **immutable primitives** in JavaScript. Any string transformation method (like `trim()`, `slice()`, or concatenation) creates a brand-new string in memory. To achieve true $\mathcal{O}(1)$ space complexity, the underlying language must support mutable character arrays/strings in contiguous memory (such as `std::string` in C++).

### Q4: How does `Array.prototype.reverse()` work under the hood in V8?
**Answer:** `reverse()` mutates the array in-place by swapping symmetric elements around the midpoint. It performs $K/2$ element swaps (where $K$ is array length), using a temporary variable for the swap. This runs in $O(K)$ time and $O(1)$ auxiliary space.

### Q5: What is the worst-case scenario for space consumption in this solution?
**Answer:** The worst-case space scenario occurs when the input string consists of $N$ characters with single spaces separating single-letter words (e.g., `"a b c d e ..."`). Here, the token array stores $N/2$ elements, requiring maximum auxiliary allocations for the array elements alongside the input and output strings.

---

## 17. Concepts to Learn & Master

1. **JavaScript String Immutability** (*Beginner*): Understanding how primitive strings are stored in memory and why operations allocate new string instances.
2. **Regular Expressions (`/\s+/`)** (*Intermediate*): Knowing how regex DFAs match whitespace patterns and how non-regex split alternatives compare.
3. **Two-Pointer Technique** (*Intermediate*): Traversal strategies using left/right indices to isolate sub-sequences without intermediate array allocations.
4. **In-Place Array Swapping** (*Intermediate*): Reversing memory regions in-place without auxiliary data structures.

---

## 18. Final Summary

* **What the code does:** Trims surrounding whitespace, splits the string into words while ignoring multiple internal spaces, reverses the word order, and rejoins them with single spaces.
* **Main technique:** Declarative Method Chaining with Regex Tokenization.
* **Time Complexity:** $\mathcal{O}(N)$
* **Space Complexity:** $\mathcal{O}(N)$
* **Best Alternative:** Right-to-Left Two-Pointer Manual Iteration (avoids Regex overhead).
* **Biggest Improvement:** Adding runtime type checks and early exit guards for whitespace-only strings.
* **Interview Difficulty:** **Medium**
* **Key Interview Takeaway:** Mastering method chaining shows strong knowledge of language idioms, but being prepared to explain two-pointer manual parsing proves deep fundamental algorithmic skills.