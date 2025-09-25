# Exercise: Run Length Encoding

Given a string, your task is to complete the function `encode` that returns the **run-length encoded** string for the given input.

> Example: if the input string is `wwwwaaadexxxxxx`, the function should return `w4a3d1e1x6`.

_Run-length encoding (RLE) is a simple lossless compression method that represents consecutive repeated values (“runs”) as the value followed by its count._ :contentReference[oaicite:0]{index=0}

---

## Problem

Complete the function `encode` that takes a single argument — the **string to be encoded** — and returns the **encoded string**.

- Output format: each contiguous run becomes `character + count`  
  e.g., `"aaa"` → `"a3"`.

---

## Examples

### Example 1
**Input**
str = "aaaabbbccc"

**Output**
a4b3c3


**Explanation**  
`a` is repeated 4 times consecutively, `b` 3 times, `c` also 3 times.

---

### Example 2
**Input**

