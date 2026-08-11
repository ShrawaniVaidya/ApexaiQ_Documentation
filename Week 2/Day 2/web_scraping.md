# Web Scraping Assignment


## 1. Introduction to Web Scraping

### Theory

**Web scraping** is the automated process of extracting data from websites. Instead of manually copying information, a script fetches the page content, parses the HTML, and pulls out the required data.

A typical scraping workflow has four stages:

1. **Send a request** to the target URL and receive the HTML response.
2. **Parse the HTML** to locate the required elements (using tags, classes, IDs, or XPath).
3. **Extract and clean** the data (text, links, tables, attributes).
4. **Store the data** in a structured format (CSV, Excel, JSON, or a database).

### Static vs Dynamic Websites

| Type | Description | Tool of Choice |
|------|-------------|-----------------|
| Static | HTML content is available directly in the page source | `requests` + `BeautifulSoup` / `lxml` |
| Dynamic | Content is rendered by JavaScript after the page loads | `Selenium` (or `Playwright`) |

### Common Libraries

| Library | Purpose |
|---------|---------|
| `requests` | Send HTTP requests and fetch raw HTML |
| `BeautifulSoup` (bs4) | Parse and navigate HTML/XML using tags and CSS-like selectors |
| `lxml` | Fast HTML/XML parser; supports XPath queries |
| `Selenium` | Automates a real browser; handles JavaScript-rendered content |
| `pandas` | Store, clean, and analyze scraped data as DataFrames |

---

## 2. HTTP Requests with `requests`

### Theory

The `requests` library lets Python send HTTP requests (GET, POST, etc.) to a server and receive the response, which usually contains the raw HTML of the page.

### Installation

```bash
pip install requests
```

### Basic GET Request

```python
import requests

url = "https://example.com/products"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

response = requests.get(url, headers=headers)

print(response.status_code)  # 200 means success
print(response.text[:500])   # first 500 characters of HTML
```

### Passing Query Parameters

```python
params = {"category": "electronics", "page": 2}
response = requests.get(url, params=params, headers=headers)
print(response.url)  # shows the final URL with query params
```

### Sending a POST Request (e.g., login forms)

```python
payload = {"username": "myuser", "password": "mypass"}
response = requests.post("https://example.com/login", data=payload)
```

### Handling Timeouts and Errors

```python
try:
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()  # raises an error for 4xx/5xx responses
except requests.exceptions.RequestException as e:
    print("Request failed:", e)
```

### Using Sessions (maintain cookies across requests)

```python
session = requests.Session()
session.get("https://example.com/login")
session.post("https://example.com/login", data=payload)
response = session.get("https://example.com/dashboard")
```

---

## 3. BeautifulSoup

### Theory

**BeautifulSoup** is a Python library used to parse HTML/XML documents and navigate the parse tree using tag names, attributes, classes, and CSS selectors. It is best suited for static pages where content already exists in the raw HTML.

### Installation

```bash
pip install beautifulsoup4
```

### Creating a Soup Object

```python
from bs4 import BeautifulSoup
import requests

response = requests.get("https://example.com/products")
soup = BeautifulSoup(response.text, "html.parser")  # or "lxml"
```

### Finding Elements

```python
# find() -> first matching element
title = soup.find("h1")

# find_all() -> list of all matching elements
all_paragraphs = soup.find_all("p")

# Find by class
products = soup.find_all("div", class_="product-card")

# Find by id
header = soup.find(id="main-header")

# Find by attribute
link = soup.find("a", attrs={"data-id": "123"})
```

### CSS Selectors with `select()`

```python
# select() -> list of matches (like querySelectorAll)
prices = soup.select("div.product-card span.price")

# select_one() -> first match (like querySelector)
name = soup.select_one("h2.product-title")
```

### Extracting Text and Attributes

```python
print(title.text.strip())        # inner text
print(title.get_text())          # same as .text
print(link["href"])              # attribute value
print(link.get("href"))          # safer, returns None if missing
```

### Navigating the Tree

```python
parent = title.parent
next_sibling = title.find_next_sibling("p")
children = list(soup.find("div", class_="product-card").children)
```

### Practical Example: Scraping Product Listings

```python
from bs4 import BeautifulSoup
import requests

url = "https://example.com/products"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

products = []

for card in soup.select("div.product-card"):
    name = card.select_one("h2.product-title").get_text(strip=True)
    price = card.select_one("span.price").get_text(strip=True)
    link = card.select_one("a")["href"]

    products.append({
        "name": name,
        "price": price,
        "link": link
    })

print(products)
```

---

## 4. XPath and lxml

### Theory

**XPath** (XML Path Language) is a query language used to navigate elements in an HTML/XML document based on their position, attributes, or hierarchy. It is more powerful than CSS selectors for complex or deeply nested structures, and is used heavily with `lxml` and `Selenium`.

### Installation

```bash
pip install lxml
```

### XPath Syntax Basics

| Expression | Meaning |
|------------|---------|
| `/`        | Select from the root node |
| `//`       | Select nodes anywhere in the document |
| `.`        | Select the current node |
| `..`       | Select the parent of the current node |
| `@`        | Select an attribute |
| `*`        | Wildcard, matches any element |
| `[n]`      | Select the nth element (1-indexed) |
| `text()`   | Select the text content of an element |
| `contains()` | Select elements where an attribute/text contains a value |

### Common XPath Examples

```python
# Select all <div> elements with class "product-card"
"//div[@class='product-card']"

# Select the <h2> inside a div with class "product-card"
"//div[@class='product-card']//h2"

# Select an element by partial class match
"//div[contains(@class, 'product')]"

# Select the text of an element
"//h2[@class='product-title']/text()"

# Select the 2nd <li> in a list
"//ul/li[2]"

# Select an <a> tag whose href contains 'download'
"//a[contains(@href, 'download')]"

# Select an element by its attribute value
"//input[@id='email']"
```

### Using XPath with `lxml`

```python
from lxml import html
import requests

response = requests.get("https://example.com/products")
tree = html.fromstring(response.content)

names = tree.xpath("//h2[@class='product-title']/text()")
prices = tree.xpath("//span[@class='price']/text()")
links = tree.xpath("//div[@class='product-card']/a/@href")

for n, p, l in zip(names, prices, links):
    print(n.strip(), p.strip(), l)
```

### Using XPath with Selenium

```python
element = driver.find_element("xpath", "//button[@id='submit']")
elements = driver.find_elements("xpath", "//div[@class='product-card']")
```

---

## 5. Selenium (Dynamic / JavaScript-Rendered Pages)

### Theory

**Selenium** automates a real web browser (Chrome, Firefox, etc.), allowing it to load pages, execute JavaScript, click buttons, fill forms, and wait for content to render — exactly as a human user would. This makes it essential for scraping **dynamic websites** where data loads after the initial page load (via AJAX/JavaScript).

### Installation

```bash
pip install selenium
pip install webdriver-manager   # automatically manages browser drivers
```

### Setting Up the Driver

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

driver.get("https://example.com/products")
```

### Running in Headless Mode (no visible browser window)

```python
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--window-size=1920,1080")

driver = webdriver.Chrome(service=service, options=options)
```

### Locating Elements

```python
from selenium.webdriver.common.by import By

# By ID
element = driver.find_element(By.ID, "main-header")

# By class name
element = driver.find_element(By.CLASS_NAME, "product-title")

# By CSS selector
element = driver.find_element(By.CSS_SELECTOR, "div.product-card > h2")

# By XPath
element = driver.find_element(By.XPATH, "//div[@class='product-card']")

# Multiple elements
elements = driver.find_elements(By.CLASS_NAME, "product-card")
```

### Interacting with Elements

```python
search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("laptop")

button = driver.find_element(By.ID, "search-btn")
button.click()

search_box.clear()
```

### Waiting for Elements (Important for Dynamic Content)

Selenium can fail if it tries to find an element before the page finishes loading it. Two strategies:

**Implicit Wait** (applies globally)

```python
driver.implicitly_wait(10)  # waits up to 10 seconds for elements to appear
```

**Explicit Wait** (recommended, waits for a specific condition)

```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, 10)
element = wait.until(
    EC.presence_of_element_located((By.CLASS_NAME, "product-card"))
)
```

### Scrolling (for infinite-scroll pages)

```python
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
```

### Practical Example: Scraping a Dynamic Product Page

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless=new")

driver = webdriver.Chrome(options=options)
driver.get("https://example.com/products")

wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "product-card")))

cards = driver.find_elements(By.CLASS_NAME, "product-card")

products = []
for card in cards:
    name = card.find_element(By.CLASS_NAME, "product-title").text
    price = card.find_element(By.CLASS_NAME, "price").text
    products.append({"name": name, "price": price})

driver.quit()  # always close the browser session
print(products)
```

### Selenium + BeautifulSoup Combo

A common pattern: use Selenium only to render the JavaScript, then hand the rendered HTML to BeautifulSoup for easier parsing.

```python
from bs4 import BeautifulSoup

html = driver.page_source
soup = BeautifulSoup(html, "html.parser")
products = soup.select("div.product-card")
driver.quit()
```

---

## 6. Pandas DataFrames for Storing & Cleaning Scraped Data

### Theory

Once data is scraped, it is usually messy (missing values, inconsistent formatting, extra whitespace, mixed data types). **Pandas DataFrames** provide a tabular structure to organize, clean, and analyze this data efficiently.

### Installation

```bash
pip install pandas
```

### Creating a DataFrame from Scraped Data

```python
import pandas as pd

data = [
    {"name": "Laptop", "price": "$799.99", "rating": "4.5"},
    {"name": "Mouse", "price": "$19.99", "rating": "4.2"},
    {"name": "Keyboard", "price": "$49.99", "rating": None},
]

df = pd.DataFrame(data)
print(df)
```

### Inspecting Data

```python
df.head()          # first 5 rows
df.info()          # column types and non-null counts
df.describe()      # summary statistics for numeric columns
df.shape            # (rows, columns)
```

### Cleaning Data

```python
# Remove currency symbols and convert to float
df["price"] = df["price"].str.replace("$", "", regex=False).astype(float)

# Convert rating to numeric, invalid values become NaN
df["rating"] = pd.to_numeric(df["rating"], errors="coerce")

# Fill missing values
df["rating"] = df["rating"].fillna(df["rating"].mean())

# Drop rows with missing critical data
df.dropna(subset=["name", "price"], inplace=True)

# Remove duplicate rows
df.drop_duplicates(inplace=True)

# Strip whitespace from string columns
df["name"] = df["name"].str.strip()
```

### Filtering and Sorting

```python
expensive = df[df["price"] > 50]
top_rated = df.sort_values(by="rating", ascending=False)
```

### Adding Derived Columns

```python
df["price_category"] = df["price"].apply(
    lambda x: "Expensive" if x > 100 else "Affordable"
)
```

### Grouping and Aggregating

```python
summary = df.groupby("price_category")["price"].mean()
print(summary)
```

---

## 7. Exporting Data (CSV, Excel, JSON, Database)

### Theory

After cleaning, scraped data is typically exported to a file or database for further use.

### To CSV

```python
df.to_csv("products.csv", index=False, encoding="utf-8")
```

### To Excel

```python
df.to_excel("products.xlsx", index=False, sheet_name="Products")
```

### To JSON

```python
df.to_json("products.json", orient="records", indent=2)
```

### To a SQL Database (e.g., MySQL/SQLite)

```python
from sqlalchemy import create_engine

engine = create_engine("sqlite:///products.db")
df.to_sql("products", con=engine, if_exists="replace", index=False)
```

### Reading Data Back

```python
df_csv = pd.read_csv("products.csv")
df_excel = pd.read_excel("products.xlsx")
df_json = pd.read_json("products.json")
```

---

## 8. Handling Common Challenges

### robots.txt

Before scraping, check the site's crawling rules at `https://example.com/robots.txt`. It specifies which paths are allowed or disallowed for bots.

### User-Agent Headers

Many sites block requests without a browser-like `User-Agent`.

```python
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
```

### Rate Limiting / Being Polite

Add delays between requests to avoid overloading the server or getting blocked.

```python
import time
import random

for url in urls:
    response = requests.get(url, headers=headers)
    time.sleep(random.uniform(1, 3))  # random delay between 1-3 seconds
```

### Handling Pagination

```python
all_products = []

for page in range(1, 6):
    url = f"https://example.com/products?page={page}"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    cards = soup.select("div.product-card")
    if not cards:
        break
    all_products.extend(cards)
```

### Handling Login-Protected Pages

Use `requests.Session()` or Selenium to log in first, then reuse the authenticated session/browser for scraping subsequent pages.

### Retrying Failed Requests

```python
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()
retries = Retry(total=3, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
session.mount("https://", HTTPAdapter(max_retries=retries))
```

### Detecting Blocked / CAPTCHA Pages

Check the response status code and content length; a sudden drop in data or a 403/429 status often indicates blocking. Solutions include rotating proxies, rotating User-Agents, or slowing down requests. (Bypassing CAPTCHAs is generally against site terms and should be avoided.)

---

## 9. Best Practices and Ethics

- **Check `robots.txt` and Terms of Service** before scraping a website.
- **Do not overload servers** — add delays and avoid parallel hammering of a single domain.
- **Scrape only public data**; never attempt to access data behind authentication without permission.
- **Respect copyright and data privacy** — scraped data should not be redistributed or used in ways that violate the source site's rights.
- **Cache responses** during development/testing to avoid repeatedly hitting the live site.
- **Prefer official APIs** if the website provides one — they are more stable and reliable than scraping HTML.
- **Handle errors gracefully** so a single failed page doesn't crash the entire script.
- **Keep selectors maintainable** — website layouts change often, so write parsing logic that is easy to update.

---

## 10. Complete End-to-End Example

A combined example: use **Selenium** to render a dynamic page, **BeautifulSoup** to parse it, clean the data with **pandas**, and export it to CSV.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import pandas as pd
import time

# 1. Set up headless Selenium
options = Options()
options.add_argument("--headless=new")
driver = webdriver.Chrome(options=options)

# 2. Load the page and wait for content
driver.get("https://example.com/products")
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "product-card")))

# 3. Parse rendered HTML with BeautifulSoup
soup = BeautifulSoup(driver.page_source, "html.parser")
driver.quit()

records = []
for card in soup.select("div.product-card"):
    name = card.select_one("h2.product-title")
    price = card.select_one("span.price")
    rating = card.select_one("span.rating")

    records.append({
        "name": name.get_text(strip=True) if name else None,
        "price": price.get_text(strip=True) if price else None,
        "rating": rating.get_text(strip=True) if rating else None,
    })

# 4. Load into pandas and clean
df = pd.DataFrame(records)
df["price"] = df["price"].str.replace("$", "", regex=False).astype(float)
df["rating"] = pd.to_numeric(df["rating"], errors="coerce")
df.dropna(subset=["name", "price"], inplace=True)
df.drop_duplicates(inplace=True)

# 5. Export the cleaned data
df.to_csv("products_cleaned.csv", index=False)
print(df.head())
```

---

## Conclusion

Web scraping combines several tools, each suited to a different stage of the pipeline: `requests` fetches raw HTML, `BeautifulSoup` and `XPath`/`lxml` parse and extract data from static content, `Selenium` handles JavaScript-rendered dynamic pages, and `pandas` cleans, structures, and exports the final dataset. Understanding when to use each tool — and following ethical scraping practices like respecting `robots.txt` and rate-limiting requests — is essential for building reliable and responsible scraping pipelines.
