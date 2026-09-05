<h2><a href="https://leetcode.com/problems/max-number-of-k-sum-pairs">0000. Max Number Of K Sum Pairs</a></h2>

<p>You are given an integer array <code>nums</code> and an integer <code>k</code>.</p>

<p>In one operation, you can pick two numbers from the array whose sum equals <code>k</code> and remove them from the array.</p>

<p>Return <em>the maximum number of operations you can perform on the array</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4], k = 5
<strong>Output:</strong> 2
<strong>Explanation:</strong> Starting with nums = [1,2,3,4]:
- Remove numbers 1 and 4, then nums = [2,3]
- Remove numbers 2 and 3, then nums = []
There are no more pairs that sum up to 5, hence a total of 2 operations.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,1,3,4,3], k = 6
<strong>Output:</strong> 1
<strong>Explanation:</strong> Starting with nums = [3,1,3,4,3]:
- Remove the first two 3's, then nums = [1,4,3]
There are no more pairs that sum up to 6, hence a total of 1 operation.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>


---

# 🛍️ Max-Number-Of-K-Sum-Pairs | Explained

## Approach 1: Single-Pass Hash Map (Frequency Matching)

### Intuition
Imagine you are running a coat check at an event where every attendee has a numbered token, and you need to pair people up whose tokens sum to exactly $k$. 

As each person arrives with their token `num`, you immediately calculate what partner token they need: `target = k - num`. Instead of searching through the entire room of future arrivals, you look at your desk where you keep track of un-paired tokens seen so far. 
- If a token equal to `target` is sitting on your desk, you immediately pair them up, remove that matching token from your desk (decrement count), and count one successful operation.
- If no matching `target` is waiting, this person cannot pair up yet. You place their token `num` on the desk (increment count) so a future attendee can potentially pair with them.

Because pairs are consumed greedily upon the first viable match, no element