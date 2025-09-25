# Exercise: Run Length Encoding

Given a string, your task is to complete the function `encode` that returns the **run-length encoded** string for the given input.

> Example: if the input string is `wwwwaaadexxxxxx`, the function should return `w4a3d1e1x6`.
---

## Problem

Complete the function `encode` that takes a single argument — the **string to be encoded** — and returns the **encoded string**.

- Output format: each contiguous run becomes `character + count`  
  e.g., `"aaa"` → `"a3"`.

---
### Example 1
**Input**
str = "aaaabbbccc"

**Output**
a4b3c3


**Explanation**  
`a` is repeated 4 times consecutively, `b` 3 times, `c` also 3 times.
---

# SOLUTION

    1. array - Loop + array push + join - fast for large strings
    2. concat - Loop + string concatenation - fast on small strings
    3. regex - Regex grouping of runs: /(.)\1*/g - fast for medium strings

**Run Server**

`npm run dev`


**CURL calls**

`method` = `"array"` | `"concat"` | `"regex"`
```easycode
  curl -X POST http://localhost:3000/encode \
  -H "Content-Type: application/json" \
  -d '{"input":"wwwwaaadexxxxxx","method":"array"}'
```

**Benchmark**

```easycode
  curl -X POST http://localhost:3000/benchmark \
  -H "Content-Type: application/json" \
  -d '{"input":"wwwwaaadexxxxxx","iterations":10000}'
```
