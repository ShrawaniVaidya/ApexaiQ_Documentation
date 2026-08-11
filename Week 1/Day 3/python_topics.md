# Python Core Topics 

## 1. List Comprehension

### What is it?

A short and efficient way to create a list without writing a normal `for` loop.

**Normal loop:**
```python
numbers = []
for i in range(5):
    numbers.append(i)
```

**List comprehension:**
```python
numbers = [i for i in range(5)]
print(numbers)
```
Output:
```
[0, 1, 2, 3, 4]
```

### Syntax

```python
new_list = [expression for item in iterable]
```
- **expression** → what gets stored
- **item** → variable
- **iterable** → list, tuple, string, range, etc.

### Examples

**Squares**
```python
squares = [i*i for i in range(1, 6)]
print(squares)
```
```
[1, 4, 9, 16, 25]
```

**Even numbers**
```python
even = [i for i in range(20) if i % 2 == 0]
print(even)
```
```
[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

**Convert to uppercase**
```python
names = ["john", "alex", "emma"]
upper = [name.upper() for name in names]
print(upper)
```
```
['JOHN', 'ALEX', 'EMMA']
```

**Nested list comprehension (flatten a matrix)**
```python
matrix = [[1, 2], [3, 4]]
flat = [num for row in matrix for num in row]
print(flat)
```
```
[1, 2, 3, 4]
```

### Advantages
- Less code
- Faster than loops
- More readable (when kept simple)

### Disadvantages
Avoid writing huge, complex comprehensions — a normal loop is easier to understand.

```python
# Bad example — too dense
[x+y for x in a if x > 5 for y in b if y < 10]
```

---

## 2. Dictionary Comprehension

Works exactly like list comprehension but creates dictionaries.

### Syntax

```python
new_dict = {key: value for item in iterable}
```

### Examples

**Basic mapping**
```python
square = {i: i*i for i in range(5)}
print(square)
```
```
{0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

**Convert values to uppercase**
```python
names = ["john", "alex", "emma"]
result = {name: name.upper() for name in names}
print(result)
```
```
{'john': 'JOHN', 'alex': 'ALEX', 'emma': 'EMMA'}
```

**Filter a dictionary**
```python
marks = {"A": 85, "B": 40, "C": 90}
passed = {k: v for k, v in marks.items() if v >= 50}
print(passed)
```
```
{'A': 85, 'C': 90}
```

### Quick Comparison

| Type | Syntax |
|---|---|
| List comprehension | `[i*i for i in range(5)]` |
| Dict comprehension | `{i: i*i for i in range(5)}` |

---

## 3. Regular Expressions (Regex)

Used for **searching, matching, extracting, and replacing patterns in text**. Python provides this via the `re` module.

```python
import re
```

### Why use Regex?

Useful for validating/extracting structured text such as emails, phone numbers, PIN codes, passwords, URLs, and dates — without manually checking every character.

### Common Functions

**`re.search()`** — find first occurrence
```python
import re
text = "Python is amazing"
result = re.search("Python", text)
print(result)
```
```
<Match object>
```

**`re.findall()`** — return every match
```python
text = "cat bat rat"
print(re.findall("at", text))
```
```
['at', 'at', 'at']
```

**`re.match()`** — checks only from the beginning of the string
```python
re.match("Hello", "Hello World")   # Matches
re.match("World", "Hello World")   # Returns None
```

**`re.sub()`** — replace text
```python
text = "Python Java Python"
print(re.sub("Python", "C++", text))
```
```
C++ Java C++
```

**`re.split()`**
```python
text = "apple,banana,orange"
print(re.split(",", text))
```
```
['apple', 'banana', 'orange']
```

### Important Regex Symbols

| Symbol | Meaning |
|---|---|
| `\d` | Digit (0–9) |
| `\D` | Not a digit |
| `\w` | Word character (A–Z, a–z, 0–9, `_`) |
| `\s` | Whitespace |
| `^` | Start of string |
| `$` | End of string |
| `+` | One or more |
| `*` | Zero or more |
| `?` | Optional (zero or one) |

**Digit extraction example**
```python
re.findall(r"\d", "A12B34")
```
```
['1', '2', '3', '4']
```

**Email validation example**
```python
pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
# Matches: abc@gmail.com
```

---

## 4. Concurrent Programming

Concurrency means **handling multiple tasks during the same period**, even if they don't all run at the exact same instant — e.g. downloading a file, playing music, and typing a document all making progress together.

Python provides:
- `threading`
- `asyncio`
- `concurrent.futures`

### Threading Example

```python
import threading
import time

def task():
    for i in range(5):
        print(i)
        time.sleep(1)

t = threading.Thread(target=task)
t.start()

print("Main Program")
```
Output:
```
Main Program
0
1
2
3
4
```
The main thread keeps running while another thread executes `task()`.

### Advantages
- Better responsiveness
- Enables background tasks
- Well suited to network applications

### Problems to Watch For
- Race conditions
- Deadlocks
- Synchronization issues

---

## 5. Parallelization (ThreadPoolExecutor)

**Concurrency ≠ Parallelism**

Concurrency (tasks interleave):
```
Task1
Task2
Task1
Task2
```

Parallelism (tasks truly run at the same time, depending on hardware/workload):
```
CPU1 → Task1
CPU2 → Task2
```

### Why ThreadPoolExecutor?

Instead of manually creating multiple `Thread()` objects, a thread pool manages them automatically.

```python
from concurrent.futures import ThreadPoolExecutor
```

### Example

```python
from concurrent.futures import ThreadPoolExecutor
import time

def square(x):
    time.sleep(1)
    return x*x

with ThreadPoolExecutor(max_workers=3) as executor:
    result = executor.map(square, [1, 2, 3, 4, 5])

print(list(result))
```
Output:
```
[1, 4, 9, 16, 25]
```

### Benefits
- Easier than manual threading
- Better resource management
- Reuses threads instead of recreating them
- Cleaner code

### When to Use It

Good for I/O-bound work:
- File downloading
- API calls
- Database queries
- Image processing
- Web scraping

Not ideal for CPU-intensive tasks due to Python's Global Interpreter Lock (GIL). For CPU-bound work, `ProcessPoolExecutor` is usually the better choice.

---

## 6. Unit Testing

A unit test checks whether a **small piece (unit) of code** works correctly — usually one function = one unit.

### Example

```python
import unittest

def add(a, b):
    return a + b

class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)

if __name__ == "__main__":
    unittest.main()
```

### Common Assertions

| Assertion | Purpose |
|---|---|
| `self.assertEqual(a, b)` | Checks `a == b` |
| `self.assertTrue(condition)` | Checks condition is `True` |
| `self.assertFalse(condition)` | Checks condition is `False` |
| `self.assertIsNone(value)` | Checks value is `None` |
| `self.assertRaises(ValueError)` | Checks an exception is raised |

```python
with self.assertRaises(ValueError):
    int("abc")
```

### Why Unit Testing?

**Without testing:**
```
Change code → Something breaks → You don't know where
```

**With testing:**
```
Change code → Run tests → Know immediately if something failed
```

### Benefits
- Finds bugs early
- Makes refactoring safer
- Improves code quality
- Acts as documentation for expected behavior

---

## 7. Exception Handling

An exception is a **runtime error** that interrupts the normal flow of a program.

```python
10/0
```
```
ZeroDivisionError
```

### try–except

```python
try:
    x = 10/0
except ZeroDivisionError:
    print("Cannot divide by zero")
```
```
Cannot divide by zero
```

### Multiple Exceptions

```python
try:
    num = int(input())
except ValueError:
    print("Invalid Number")
except ZeroDivisionError:
    print("Divide by zero")
```

### else

Runs only if **no exception** occurs.

```python
try:
    print(10/2)
except:
    print("Error")
else:
    print("Success")
```
```
5.0
Success
```

### finally

Always executes, whether an exception occurs or not. Commonly used to close files, database connections, or release other resources.

```python
try:
    file = open("abc.txt")
except FileNotFoundError:
    print("Not Found")
finally:
    print("Closing Program")
```
```
Not Found
Closing Program
```

### raise

Manually raise an exception.

```python
age = -5
if age < 0:
    raise ValueError("Age cannot be negative")
```

---

## Summary Table

| Topic | Purpose | Common Use Cases |
|---|---|---|
| List Comprehension | Create lists concisely | Data transformation, filtering |
| Dictionary Comprehension | Create dictionaries concisely | Mapping, filtering key-value pairs |
| Regex | Pattern matching in text | Email, phone, password, log parsing |
| Concurrent Programming | Handle multiple tasks together | Web servers, network requests, background tasks |
| ThreadPoolExecutor | Manage multiple threads easily | API calls, file operations, web scraping |
| Unit Testing | Verify individual functions | Software testing, regression prevention |
| Exception Handling | Gracefully handle runtime errors | File I/O, user input, database and network operations |

These topics span everyday programming (comprehensions and exceptions), text processing (regex), performance (concurrency and thread pools), and software quality (unit testing). Understanding not just the syntax but *when* to use each technique matters for both interviews and real-world development.
