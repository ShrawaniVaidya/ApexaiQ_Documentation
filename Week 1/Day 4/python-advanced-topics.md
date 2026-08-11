# Python Advanced Topics — Reference Guide

---

# Section 1: Python Internals & Data Model

## 1.1 Python Memory Management

Python manages memory automatically using a combination of techniques:

- **Reference Counting**: Every object has a reference count. When it drops to zero, the object is deallocated immediately.
- **Garbage Collector (GC)**: Handles **cyclic references** (objects referencing each other) that reference counting alone can't clean up. Python's GC uses **generational garbage collection** (3 generations: 0, 1, 2) — younger objects are collected more frequently since most objects die young.
- **Private Heap**: All Python objects and data structures live in a private heap managed internally by the interpreter; the programmer never manipulates raw memory directly.
- **Memory Pools (pymalloc)**: For small objects (<512 bytes), CPython uses an internal allocator (`pymalloc`) that manages memory in pools/blocks/arenas to reduce fragmentation and overhead from frequent malloc/free calls.
- **Interning**: Small integers (-5 to 256) and some strings are cached/interned and reused rather than recreated, saving memory.

```python
import sys
a = []
print(sys.getrefcount(a))  # Reference count of object 'a'

import gc
gc.collect()  # Force a garbage collection cycle
```

**Key tools**: `gc` module (inspect/control GC), `sys.getsizeof()` (object size), `tracemalloc` (track memory allocations), `objgraph` (visualize reference graphs).

---

## 1.2 Object Identity, Mutability, and the Data Model

- **Identity** (`id(obj)`): A unique integer identifying an object during its lifetime (in CPython, this is its memory address). Checked with `is`.
- **Equality** (`==`): Checked via `__eq__`; compares *value*, not identity.
- **Mutability**:
  - **Immutable**: `int`, `float`, `str`, `tuple`, `frozenset`, `bytes` — can't be changed after creation; any "modification" creates a new object.
  - **Mutable**: `list`, `dict`, `set`, custom objects by default — can be changed in place.
- **The Data Model** (dunder/magic methods) governs how objects behave with built-in operations:
  - `__init__`, `__new__` — construction
  - `__repr__`, `__str__` — representation
  - `__eq__`, `__lt__`, `__hash__` — comparison and hashing
  - `__len__`, `__getitem__`, `__setitem__`, `__iter__` — container behavior
  - `__enter__`, `__exit__` — context managers
  - `__call__` — making instances callable

```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)
    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p1, p2 = Point(1, 2), Point(1, 2)
print(p1 == p2)   # True (value equality via __eq__)
print(p1 is p2)   # False (different identity)
```

**Pitfall**: Mutable default arguments (`def f(x=[])`) are created once and shared across calls — a classic bug source.

---

## 1.3 Descriptors and the Attribute Lookup Protocol

A **descriptor** is any object implementing `__get__`, `__set__`, or `__delete__`, letting you customize attribute access.

- **Non-data descriptor**: defines only `__get__` (e.g., functions/methods).
- **Data descriptor**: defines `__get__` and `__set__` (or `__delete__`) — takes priority over instance `__dict__`.

```python
class Positive:
    def __set_name__(self, owner, name):
        self.name = "_" + name
    def __get__(self, obj, objtype=None):
        return getattr(obj, self.name)
    def __set__(self, obj, value):
        if value < 0:
            raise ValueError("must be positive")
        setattr(obj, self.name, value)

class Product:
    price = Positive()
    def __init__(self, price):
        self.price = price
```

**Attribute lookup order** (`obj.attr`) roughly follows:
1. Data descriptors on the type (and its MRO)
2. Instance `__dict__`
3. Non-data descriptors / class attributes on the type
4. `__getattr__` (fallback if nothing found)

Descriptors power `property`, `classmethod`, `staticmethod`, and ORMs like Django/SQLAlchemy fields.

---

## 1.4 Metaclasses

A **metaclass** is "the class of a class" — it controls how classes themselves are created. By default, every class's metaclass is `type`.

```python
class Meta(type):
    def __new__(mcs, name, bases, namespace):
        namespace['created_by'] = 'Meta'
        return super().__new__(mcs, name, bases, namespace)

class MyClass(metaclass=Meta):
    pass

print(MyClass.created_by)  # 'Meta'
```

**Common real-world uses**:
- Enforcing coding standards/interfaces automatically at class-creation time.
- ORMs (Django models, SQLAlchemy) — auto-registering fields.
- Singleton patterns, plugin/registry systems.
- `abc.ABCMeta` for abstract base classes.

**Rule of thumb**: "If you're not sure whether you need a metaclass, you don't." Prefer simpler tools (class decorators, `__init_subclass__`) when possible — metaclasses are powerful but reduce readability.

---

## 1.5 The Global Interpreter Lock (GIL)

The GIL is a mutex in **CPython** that allows only **one thread to execute Python bytecode at a time**, even on multi-core machines.

- **Why it exists**: Simplifies memory management (reference counting isn't thread-safe without it) and simplifies the C API.
- **Impact**:
  - CPU-bound multi-threaded code sees **little to no speedup** from threading.
  - I/O-bound code (network calls, file I/O) still benefits from threading, since the GIL is released during blocking I/O.
- **Workarounds**:
  - `multiprocessing` — separate processes, separate GILs, true parallelism.
  - C extensions (NumPy, etc.) release the GIL during heavy computation.
  - Alternative interpreters: **PyPy**, or the newer **free-threaded CPython (PEP 703)**, which is working toward an optional no-GIL build (available experimentally from Python 3.13+).

```python
import threading, time

def cpu_task():
    x = 0
    for _ in range(10**7):
        x += 1

start = time.time()
t1, t2 = threading.Thread(target=cpu_task), threading.Thread(target=cpu_task)
t1.start(); t2.start(); t1.join(); t2.join()
print(time.time() - start)  # Not meaningfully faster than running sequentially
```

---

## 1.6 Threading vs Multiprocessing vs Asyncio

| Model | Best For | Parallelism | Overhead | Shared State |
|---|---|---|---|---|
| **Threading** | I/O-bound tasks (network, disk) | Concurrent, not parallel (GIL-limited) | Low | Easy (shared memory) but needs locks |
| **Multiprocessing** | CPU-bound tasks | True parallelism (separate processes) | High (process spawn, IPC) | Hard (needs `Queue`, `Pipe`, shared memory) |
| **Asyncio** | High-volume I/O-bound tasks (many concurrent connections) | Single-threaded cooperative concurrency | Very low | Easy (single thread, no locks needed) |

```python
# Threading — good for I/O-bound
import threading
threading.Thread(target=fetch_url, args=(url,)).start()

# Multiprocessing — good for CPU-bound
from multiprocessing import Pool
with Pool(4) as p:
    results = p.map(cpu_heavy_fn, data)

# Asyncio — good for many concurrent I/O tasks
import asyncio
async def fetch(session, url):
    async with session.get(url) as resp:
        return await resp.text()
```

**Decision guide**:
- Lots of blocking network calls, moderate concurrency → **threading**
- Heavy CPU computation → **multiprocessing**
- Thousands of concurrent connections (e.g., web scraping, WebSocket servers) → **asyncio**

---

## 1.7 Race Conditions and Thread-Safety

A **race condition** occurs when multiple threads access shared data concurrently, and the outcome depends on timing/interleaving of operations.

```python
counter = 0
def increment():
    global counter
    for _ in range(100000):
        counter += 1  # NOT atomic: read-modify-write

# Running this with multiple threads produces an unpredictable final counter value
```

**Mitigation techniques**:
- `threading.Lock` / `RLock` — mutual exclusion around critical sections.
- `threading.Semaphore` — limit concurrent access to a resource.
- `queue.Queue` — thread-safe FIFO, ideal for producer-consumer patterns.
- Atomic operations where available (e.g., `itertools.count()`, `collections.Counter` are not automatically thread-safe — don't assume it).
- Prefer **immutable data** and **message passing** over shared mutable state when possible.

```python
lock = threading.Lock()
def safe_increment():
    global counter
    with lock:
        counter += 1
```

**Deadlocks**: occur when two or more threads wait on each other's locks indefinitely — avoid by always acquiring locks in a consistent global order, or using timeouts.

---

# Section 2: Networking, APIs, and HTTP

## 2.1 HTTP Session Management

Using `requests.Session()` (or `httpx.Client()`) instead of one-off requests improves performance and consistency:

- **Connection pooling / keep-alive** — reuses TCP connections instead of opening a new one per request.
- **Persistent cookies** — automatically handled across requests within the session.
- **Shared configuration** — default headers, auth, timeouts, and proxies set once.

```python
import requests

session = requests.Session()
session.headers.update({"Authorization": "Bearer TOKEN"})
session.timeout = 10

resp1 = session.get("https://api.example.com/users")
resp2 = session.get("https://api.example.com/orders")  # Reuses connection, headers, cookies
```

Always close sessions (or use `with requests.Session() as s:`) to release connections cleanly.

---

## 2.2 Authentication Mechanisms

| Mechanism | How It Works | Typical Use |
|---|---|---|
| **Basic Auth** | Username:password Base64-encoded in `Authorization` header | Simple internal APIs |
| **Bearer Token / API Key** | Static token sent in header (`Authorization: Bearer <token>`) | Most REST APIs |
| **OAuth 2.0** | Token obtained via authorization flow (client credentials, auth code, etc.), often short-lived with refresh tokens | Third-party API access (Google, GitHub, etc.) |
| **JWT (JSON Web Token)** | Self-contained signed token carrying claims; verified without a DB lookup | Stateless auth, microservices |
| **HMAC Signing** | Request signed with a shared secret; server recomputes signature to verify | Webhooks, financial APIs (e.g., AWS, Stripe) |
| **mTLS (Mutual TLS)** | Both client and server present certificates | High-security service-to-service auth |

```python
# Bearer token
requests.get(url, headers={"Authorization": f"Bearer {token}"})

# OAuth2 client credentials flow (simplified)
resp = requests.post(token_url, data={
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret,
})
access_token = resp.json()["access_token"]
```

---

## 2.3 Building Resilient API Clients

Production-grade API clients should handle failures gracefully:

- **Retries with exponential backoff** — for transient errors (5xx, timeouts, connection errors).
- **Timeouts** — always set connect/read timeouts; never call an API without one.
- **Circuit breakers** — stop calling a failing service temporarily to avoid cascading failures.
- **Idempotency** — ensure retried requests don't cause duplicate side effects (e.g., idempotency keys for POST).
- **Structured error handling** — distinguish between client errors (4xx, don't retry) and server errors (5xx, retry).
- **Rate limit handling** — respect `Retry-After` headers, implement client-side throttling.

```python
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()
retries = Retry(
    total=5,
    backoff_factor=0.5,
    status_forcelist=[429, 500, 502, 503, 504],
    allowed_methods=["GET", "POST"],
)
session.mount("https://", HTTPAdapter(max_retries=retries))
```

Libraries: `tenacity` (flexible retry decorators), `pybreaker` (circuit breaker pattern).

---

## 2.4 REST API Design Principles

- **Resource-oriented URLs**: `/users/123/orders`, not `/getUserOrders?id=123`.
- **Use HTTP verbs correctly**: `GET` (read), `POST` (create), `PUT` (full update), `PATCH` (partial update), `DELETE` (remove).
- **Statelessness**: each request contains all information needed; no server-side session state.
- **Proper status codes**: `200` OK, `201` Created, `204` No Content, `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found, `409` Conflict, `429` Too Many Requests, `500` Internal Server Error.
- **Versioning**: `/v1/users` or via headers — avoid breaking existing clients.
- **Pagination**: use `limit`/`offset` or cursor-based pagination for large collections.
- **HATEOAS** (optional, more RESTful purity): responses include links to related actions/resources.
- **Consistent error format**: a predictable JSON error shape (`{"error": {"code": ..., "message": ...}}`).
- **Filtering/sorting via query params**: `/orders?status=pending&sort=-created_at`.

---

## 2.5 Custom `requests` Adapters and Hooks

**Adapters** let you customize the transport layer (connection pooling, retries, custom TLS, mocking).

```python
from requests.adapters import HTTPAdapter

class LoggingAdapter(HTTPAdapter):
    def send(self, request, **kwargs):
        print(f"Sending request to {request.url}")
        return super().send(request, **kwargs)

session = requests.Session()
session.mount("https://", LoggingAdapter())
```

**Hooks** let you run callbacks on parts of the request lifecycle (currently `response` is supported):

```python
def log_response(response, *args, **kwargs):
    print(f"{response.status_code} — {response.url}")

session.hooks["response"].append(log_response)
```

Common use cases: request/response logging, metrics collection, automatic token refresh on 401, custom SSL contexts, mocking in tests (`requests-mock`, `responses`).

---

# Section 3: Design and Architecture

## 3.1 SOLID Principles in Python

| Principle | Meaning | Python Example |
|---|---|---|
| **S** — Single Responsibility | A class should have one reason to change | Separate `InvoiceCalculator` from `InvoicePrinter` |
| **O** — Open/Closed | Open for extension, closed for modification | Use inheritance/composition instead of editing existing classes |
| **L** — Liskov Substitution | Subtypes must be substitutable for their base types | A `Square` subclass shouldn't break behavior expected of `Rectangle` |
| **I** — Interface Segregation | Prefer many small, specific interfaces over one large one | Use small `Protocol`/ABCs rather than a bloated interface |
| **D** — Dependency Inversion | Depend on abstractions, not concrete implementations | Inject a `PaymentGateway` interface, not a specific `StripeClient` |

```python
from abc import ABC, abstractmethod

class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount): ...

class StripeGateway(PaymentGateway):
    def charge(self, amount):
        print(f"Charging ${amount} via Stripe")

class OrderProcessor:
    def __init__(self, gateway: PaymentGateway):  # Depends on abstraction
        self.gateway = gateway
```

---

## 3.2 Design Patterns in Python

| Pattern | Category | Purpose |
|---|---|---|
| **Singleton** | Creational | Ensure only one instance exists (often via module-level instance, or `__new__` override) |
| **Factory** | Creational | Centralize object creation logic |
| **Builder** | Creational | Construct complex objects step by step |
| **Adapter** | Structural | Make incompatible interfaces work together |
| **Decorator** | Structural | Add behavior dynamically (Python's `@decorator` syntax is a natural fit) |
| **Facade** | Structural | Simplify a complex subsystem behind one interface |
| **Strategy** | Behavioral | Swap algorithms/behavior at runtime |
| **Observer** | Behavioral | Notify multiple subscribers of state changes |
| **Context Manager** | Behavioral (Pythonic) | Manage resource setup/teardown (`with` statement) |

```python
# Strategy pattern using Python functions (no need for verbose class hierarchies)
def strategy_fast(data): ...
def strategy_accurate(data): ...

class Processor:
    def __init__(self, strategy):
        self.strategy = strategy
    def process(self, data):
        return self.strategy(data)
```

**Pythonic note**: Many classic GoF patterns are simplified in Python due to first-class functions, decorators, and duck typing — you often don't need the full class-based ceremony from Java/C++.

---

## 3.3 Composition vs Inheritance

- **Inheritance** ("is-a"): a subclass extends a base class's behavior. Risk: deep hierarchies become rigid and fragile ("fragile base class problem").
- **Composition** ("has-a"): a class holds references to other objects and delegates behavior to them. More flexible, easier to test and change.

```python
# Inheritance
class Car(Vehicle):
    ...

# Composition — generally preferred for flexibility
class Car:
    def __init__(self, engine: Engine):
        self.engine = engine
    def start(self):
        self.engine.ignite()
```

**Guideline**: "Favor composition over inheritance." Use inheritance mainly for genuine is-a relationships and small, stable hierarchies (e.g., exception classes); use composition to combine independent behaviors.

---

## 3.4 Dataclasses vs NamedTuples vs Pydantic Models

| Feature | `dataclass` | `NamedTuple` | Pydantic `BaseModel` |
|---|---|---|---|
| Mutability | Mutable by default (`frozen=True` for immutable) | Immutable | Mutable by default |
| Type validation | No runtime validation (just hints) | No runtime validation | **Runtime validation & coercion** |
| Performance | Fast, low overhead | Fastest (tuple-based) | Slower (validation overhead) |
| Serialization | Manual (`asdict()`) | Manual | Built-in `.model_dump()`, `.model_dump_json()` |
| Best for | Simple internal data structures | Lightweight, tuple-like immutable records | External data (API input/output, config validation) |

```python
from dataclasses import dataclass
from typing import NamedTuple
from pydantic import BaseModel

@dataclass
class User:
    name: str
    age: int

class UserTuple(NamedTuple):
    name: str
    age: int

class UserModel(BaseModel):
    name: str
    age: int  # Pydantic validates & coerces types at runtime, raises clear errors
```

**Rule of thumb**: internal, trusted data → `dataclass`; small immutable tuples → `NamedTuple`; validating external/untrusted input (API payloads, config files) → **Pydantic**.

---

# Section 4: Testing and Quality Assurance

## 4.1 Unit Testing Strategies

- Test **one unit of behavior** in isolation (function, method, small class).
- Follow **Arrange-Act-Assert (AAA)** structure.
- Use `pytest` (industry standard) or built-in `unittest`.
- Write tests for: happy path, edge cases, error/exception cases, boundary values.
- Keep tests **fast, deterministic, and independent** (no shared state or execution order dependency).

```python
import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("division by zero")
    return a / b

def test_divide_normal():
    assert divide(10, 2) == 5

def test_divide_by_zero_raises():
    with pytest.raises(ValueError):
        divide(10, 0)
```

Use **fixtures** (`@pytest.fixture`) for reusable setup, and **parametrize** for testing multiple inputs concisely:

```python
@pytest.mark.parametrize("a,b,expected", [(2, 3, 5), (-1, 1, 0), (0, 0, 0)])
def test_add(a, b, expected):
    assert a + b == expected
```

---

## 4.2 Mocking External Dependencies

Mocking isolates the code under test from external systems (databases, APIs, file systems, time).

```python
from unittest.mock import patch, MagicMock

def get_user_data(api_client, user_id):
    return api_client.get(f"/users/{user_id}")

def test_get_user_data():
    mock_client = MagicMock()
    mock_client.get.return_value = {"id": 1, "name": "Alice"}
    result = get_user_data(mock_client, 1)
    assert result["name"] == "Alice"
    mock_client.get.assert_called_once_with("/users/1")

# Patching a module-level dependency
@patch("myapp.services.requests.get")
def test_fetch(mock_get):
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {"ok": True}
    ...
```

**Best practices**:
- Mock at the **boundary** of your system (network calls, DB clients), not internal business logic.
- Use `pytest-mock`'s `mocker` fixture for cleaner syntax.
- Prefer dependency injection to make mocking straightforward (avoid patching deep internals).

---

## 4.3 Property-Based Testing

Instead of hand-picking test cases, **property-based testing** generates many random inputs and checks that a general *property* holds for all of them.

```python
from hypothesis import given, strategies as st

@given(st.lists(st.integers()))
def test_sorted_list_is_ordered(lst):
    result = sorted(lst)
    assert all(result[i] <= result[i+1] for i in range(len(result) - 1))

@given(st.integers(), st.integers())
def test_addition_commutative(a, b):
    assert a + b == b + a
```

**Library**: `hypothesis` is the standard Python tool. It also does **shrinking** — when it finds a failing case, it automatically simplifies it to the smallest reproducible example.

**Best for**: parsers, serializers, mathematical functions, anything with clear invariants (e.g., "encode then decode returns the original value").

---

## 4.4 Static Analysis and Type Checking

- **Type hints** (PEP 484) let you annotate expected types without changing runtime behavior:

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

- **Static type checkers** verify these hints without running the code:
  - **mypy** — the original, most widely used.
  - **pyright** — fast, used by VS Code's Pylance.
  - **pyre** — Meta's type checker.

```bash
mypy myapp/
```

- Other static analysis tools: `bandit` (security issues), `vulture` (dead code detection), `radon` (complexity metrics).
- Type checking catches bugs early (wrong argument types, `None` handling issues) without needing to run tests, and greatly improves IDE autocomplete/refactoring support.

---

## 4.5 Test Driven Development (TDD)

The **Red-Green-Refactor** cycle:

1. **Red**: Write a failing test for the next small piece of functionality.
2. **Green**: Write the minimum code needed to make the test pass.
3. **Refactor**: Clean up the code (and tests) while keeping tests green.

**Benefits**: forces clear requirements upfront, produces a comprehensive regression test suite "for free," encourages small, testable, decoupled design.

**Common criticism**: can slow initial development and doesn't fit all problem types well (e.g., exploratory/UI-heavy work) — many teams use TDD selectively for core business logic rather than everything.

---

# Section 5: Performance

## 5.1 Profiling Python Code

- **`cProfile`** — built-in deterministic profiler, shows function call counts and cumulative time.

```bash
python -m cProfile -s cumulative myscript.py
```

```python
import cProfile
cProfile.run('my_function()')
```

- **`line_profiler`** — line-by-line timing (great for pinpointing hot lines within a function).
- **`memory_profiler`** — tracks memory usage line by line.
- **`py-spy`** — sampling profiler that can attach to a running process without modifying code (great for production debugging).
- **`snakeviz`** — visualizes `cProfile` output as an interactive flame graph.

**Workflow**: profile before optimizing ("premature optimization is the root of all evil") — always measure to find the actual bottleneck rather than guessing.

---

## 5.2 Common Performance Pitfalls

- **String concatenation in a loop** (`s += x`) — creates a new string each time (O(n²)); use `"".join(list)` instead.
- **Using `list` where `set`/`dict` membership testing is needed** — `in` on a list is O(n); O(1) on a set/dict.
- **Repeated attribute/global lookups in hot loops** — cache as local variables.
- **Unnecessary object creation inside loops** — hoist invariant computations outside the loop.
- **Using Python loops instead of vectorized operations** — e.g., use NumPy/pandas vectorized operations instead of manual `for` loops over large datasets.
- **Overusing exceptions for control flow** — exceptions have overhead; fine for genuinely exceptional cases, not routine logic.
- **Not using `__slots__`** for classes with many instances — reduces per-instance memory overhead by avoiding a per-instance `__dict__`.

```python
class Point:
    __slots__ = ("x", "y")  # Saves memory vs default __dict__-based instances
    def __init__(self, x, y):
        self.x, self.y = x, y
```

---

## 5.3 Caching Strategies

- **`functools.lru_cache`** — in-memory memoization for pure functions with hashable arguments.

```python
from functools import lru_cache

@lru_cache(maxsize=256)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

- **`functools.cache`** (Python 3.9+) — unbounded version of `lru_cache`.
- **External caches**: **Redis** or **Memcached** for cross-process/distributed caching (e.g., caching API responses, DB query results).
- **Cache invalidation strategies**: TTL (time-to-live) expiry, explicit invalidation on writes, cache-aside pattern (check cache → miss → fetch from source → populate cache).
- **HTTP caching**: `ETag`/`Cache-Control` headers for client/CDN-level caching of API responses.

**Caveat**: "There are only two hard things in Computer Science: cache invalidation and naming things" — always have a clear invalidation strategy, or caches become a source of stale-data bugs.

---

# Section 6: Data Handling

## 6.1 JSON Parsing and Validation Pitfalls

- **Silent type coercion issues**: JSON has no distinction between `int`/`float` consistently across languages; numbers with many digits can lose precision.
- **`None`/`null` handling**: JSON `null` maps to Python `None` — code must handle missing/null fields explicitly.
- **Duplicate keys**: standard `json` module silently keeps the *last* occurrence of a duplicate key — can hide malformed data.
- **Large numbers**: JSON numbers beyond `2^53` can lose precision when parsed as floats in some contexts — use strings for large IDs where needed.
- **Encoding issues**: always specify UTF-8 explicitly; malformed encoding can cause silent data corruption.
- **Trusting unvalidated input**: never assume incoming JSON matches your expected schema — validate before use (`pydantic`, `jsonschema`, or manual checks) to avoid `KeyError`/`TypeError` crashes deep in business logic.

```python
import json
from pydantic import BaseModel, ValidationError

class Order(BaseModel):
    id: int
    total: float

try:
    order = Order.model_validate_json(raw_json)
except ValidationError as e:
    print(e.errors())
```

---

## 6.2 Serialization Formats Compared

| Format | Human-Readable | Size | Speed | Schema Support | Typical Use |
|---|---|---|---|---|---|
| **JSON** | Yes | Medium | Medium | Weak (needs external schema) | Web APIs, config |
| **XML** | Yes | Large | Slow | Strong (XSD) | Legacy enterprise systems, SOAP |
| **YAML** | Yes | Medium | Slow | Weak | Config files (Kubernetes, CI/CD) |
| **Protocol Buffers (protobuf)** | No | Small | Very fast | Strong (schema-first, `.proto`) | High-performance microservices (gRPC) |
| **MessagePack** | No | Small | Fast | Weak | Compact binary alternative to JSON |
| **Avro** | No | Small | Fast | Strong (schema evolution) | Big data pipelines (Kafka) |
| **Pickle** | No | Medium | Fast | None (Python-specific, insecure for untrusted data) | Internal Python object caching only |

**Security note**: never `pickle.loads()` data from an untrusted source — it can execute arbitrary code.

---

## 6.3 Virtual Environments and Dependency Management

- **`venv`** (built-in) — creates isolated Python environments per project.

```bash
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
.venv\Scripts\activate      # Windows
```

- **`pip` + `requirements.txt`** — basic dependency listing (no built-in lockfile/dependency resolution guarantees).
- **`pip-tools`** (`pip-compile`) — generates a fully pinned `requirements.txt` from a high-level `requirements.in`.
- **Poetry** — modern dependency management + packaging + virtual env management combined, with a lockfile (`poetry.lock`).
- **uv** — very fast, modern drop-in alternative for `pip`/`venv`/`poetry`-like workflows (Rust-based).
- **conda** — popular in data science; manages non-Python dependencies too (C libraries, etc.).

**Best practice**: always pin exact versions in a lockfile for reproducible builds, and separate dev dependencies (testing, linting) from runtime dependencies.

---

# Section 7: Security

## 7.1 Secure Credential Handling

- **Never hardcode secrets** (API keys, passwords, tokens) in source code or commit them to version control.
- Use **environment variables** for local/simple cases (`os.environ.get("API_KEY")`), loaded via `.env` files with `python-dotenv` (and `.env` in `.gitignore`).
- For production, use dedicated **secret managers**: AWS Secrets Manager, HashiCorp Vault, Azure Key Vault, GCP Secret Manager.
- **Rotate secrets regularly** and use short-lived credentials where possible (e.g., temporary AWS STS tokens).
- **Least privilege**: credentials should have the minimum permissions needed.
- Scan repos for accidentally committed secrets with tools like `gitleaks` or `truffleHog`.
- Avoid logging secrets — sanitize/redact sensitive fields before logging.

```python
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ["API_KEY"]  # Raises KeyError if missing — fail loudly, don't default silently
```

---

## 7.2 Logging Best Practices

- Use the standard **`logging`** module, not `print()`, for anything beyond quick debugging.
- Use appropriate **log levels**: `DEBUG` < `INFO` < `WARNING` < `ERROR` < `CRITICAL`.
- **Never log sensitive data** (passwords, tokens, full credit card numbers, PII) — redact or mask it.
- Use **structured logging** (JSON logs) in production for easier parsing/searching (e.g., via `structlog` or `python-json-logger`).
- Include **context**: request IDs, user IDs (non-sensitive), timestamps, module names — enables tracing a request across a distributed system.
- Configure logging **centrally** (once at app startup), not ad hoc in every module.
- Avoid excessive logging in hot loops — it can become a performance bottleneck itself.

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

logger.info("User %s logged in", user_id)
logger.error("Payment failed for order %s", order_id, exc_info=True)
```

---

# Section 8: Code Quality and Conventions

## 8.1 PEP 8 and Pythonic Code Conventions

**PEP 8** is Python's official style guide. Key points:

- 4 spaces per indentation level (no tabs).
- Line length: 79 characters (many teams relax this to 88–100 with `black`).
- `snake_case` for functions/variables, `PascalCase` for classes, `UPPER_CASE` for constants.
- Two blank lines between top-level functions/classes; one blank line between methods.
- Explicit imports; avoid `from module import *`.
- Use `is`/`is not` for `None` comparisons, not `==`.

**"Pythonic" idioms**:
```python
# Pythonic
squares = [x**2 for x in range(10)]
for i, value in enumerate(items):
    ...
with open("file.txt") as f:
    data = f.read()

# Not Pythonic
squares = []
for x in range(10):
    squares.append(x**2)
```

Refer to **PEP 20 (The Zen of Python)** — `import this` — for the underlying philosophy ("Readability counts", "Explicit is better than implicit").

---

## 8.2 Docstring Standards and Documentation Practices

- **PEP 257** defines basic docstring conventions (triple quotes, first line summary, etc.).
- Common docstring styles:

**Google style**:
```python
def add(a: int, b: int) -> int:
    """Add two numbers.

    Args:
        a: First number.
        b: Second number.

    Returns:
        The sum of a and b.
    """
    return a + b
```

**NumPy style**:
```python
def add(a, b):
    """
    Add two numbers.

    Parameters
    ----------
    a : int
    b : int

    Returns
    -------
    int
        The sum of a and b.
    """
    return a + b
```

- Use tools like **Sphinx** (with `sphinx.ext.napoleon` for Google/NumPy styles) or **MkDocs** to auto-generate documentation sites from docstrings.
- Document **why**, not just **what**, where the reasoning isn't obvious from the code itself.

---

## 8.3 Code Formatting and Linting Tools

| Tool | Purpose |
|---|---|
| **black** | Opinionated, automatic code formatter — enforces one consistent style, no configuration debates |
| **isort** | Automatically sorts and groups imports (stdlib, third-party, local) |
| **flake8** | Style guide enforcement (PEP 8) + basic error detection (combines pycodestyle, pyflakes) |
| **pylint** | Deep static analysis — style, errors, code smells, refactoring suggestions (more thorough, more verbose) |
| **ruff** | Extremely fast (Rust-based) linter that reimplements much of flake8/isort/pylint's rules; increasingly replacing multiple tools at once |

```bash
black .
isort .
ruff check .
```

**Modern trend**: many teams are consolidating onto **ruff** alone (formatting + linting + import sorting) for speed and simplicity, replacing the flake8+isort+pylint combo.

---

## 8.4 Naming Conventions and Code Readability

- **Variables/functions**: `snake_case`, descriptive (`user_count`, not `uc` or `x`).
- **Classes**: `PascalCase` (`OrderProcessor`).
- **Constants**: `UPPER_SNAKE_CASE` (`MAX_RETRIES = 3`).
- **Private/internal**: prefix with a single underscore (`_internal_helper`) by convention (not enforced); double underscore (`__attr`) triggers name mangling for stronger internal-use signaling.
- **Booleans**: name them as questions/predicates (`is_active`, `has_permission`).
- **Avoid abbreviations** unless extremely common (`id`, `url`, `num`).
- **Function names as verbs** (`calculate_total`), **class names as nouns** (`Invoice`).
- Favor **clarity over cleverness** — code is read far more often than it's written.

---

## 8.5 Pre-commit Hooks and Automated Code Quality Gates

**`pre-commit`** framework runs checks automatically before each commit, catching issues before they enter version control.

`.pre-commit-config.yaml` example:
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 24.4.2
    hooks:
      - id: black
  - repo: https://github.com/pycqa/isort
    rev: 5.13.2
    hooks:
      - id: isort
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.5.0
    hooks:
      - id: ruff
```

```bash
pip install pre-commit
pre-commit install       # Sets up the git hook
pre-commit run --all-files
```

**Benefits**: catches formatting/lint issues before code review, keeps CI green, enforces consistency across all contributors without relying on manual discipline. Often paired with **CI-level quality gates** (GitHub Actions, GitLab CI) that re-run the same checks server-side as a safety net.

---

## 8.6 Code Review Best Practices and Style Guides at Scale

- **Automate what can be automated** (formatting, linting, type checking) — reviewers should focus on logic, design, and correctness, not style nitpicks.
- **Small, focused PRs** — easier and faster to review thoroughly than large, sprawling changes.
- **Clear PR descriptions** — what changed, why, and how it was tested.
- **Constructive, specific feedback** — explain *why* a change is suggested, not just *what* to change.
- **Define a team style guide** (often based on PEP 8 + tool configs) so debates are settled by consistent tooling, not opinion in every review.
- **Use checklists** for common concerns: tests included, docs updated, no secrets committed, error handling present.
- **Timely reviews** — long review turnaround times block progress and encourage large batch changes, which are harder to review well.
- At scale (large orgs), consider **CODEOWNERS** files to route reviews to the right people, and **required status checks** (CI, linting, coverage thresholds) before merge.

---

## Quick Reference Summary

| Category | Topics Covered |
|---|---|
| **Internals** | Memory management, data model, descriptors, metaclasses, GIL, concurrency models, thread safety |
| **Networking/APIs** | Sessions, auth, resilient clients, REST design, custom adapters/hooks |
| **Design & Architecture** | SOLID, design patterns, composition vs inheritance, dataclasses/NamedTuples/Pydantic |
| **Testing** | Unit testing, mocking, property-based testing, static analysis, TDD |
| **Performance** | Profiling, pitfalls, caching |
| **Data Handling** | JSON pitfalls, serialization formats, dependency management |
| **Security** | Credential handling, logging |
| **Code Quality** | PEP 8, docstrings, formatting/linting, naming, pre-commit hooks, code review |
