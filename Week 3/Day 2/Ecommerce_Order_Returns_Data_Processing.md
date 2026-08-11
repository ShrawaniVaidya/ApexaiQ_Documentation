# Data Processing Assignment: E-commerce Order Returns

## Problem Statement

An e-commerce company logs every product return in a spreadsheet — return ID, customer, product, return reason, refund amount, status, and date. Like most real-world operational data, this log has quality issues: missing values, duplicate entries, and inconsistent text formatting across different agents entering data. This assignment demonstrates the full data processing pipeline: identifying data quality issues in the raw log, cleaning the data, and producing a summary analysis (approval rate, refund totals, and return patterns).

## 1. Raw Data

Below is the original, uncleaned returns log (20 records).

| Return ID | Customer Name | Product | Return Reason | Refund Amount | Return Status | Return Date |
|---|---|---|---|---|---|---|
| R001 | Rohan Deshmukh | Wireless Earbuds | Defective product | 800 | Approved | 01-Aug-2026 |
| R002 | Sneha Kulkarni&nbsp;&nbsp; (trailing space) | Bluetooth Speaker | wrong item delivered | 1200 | approved | 01-Aug-2026 |
| R003 | Amit Joshi | Running Shoes | Size mismatch | 1500 | Rejected | 01-Aug-2026 |
| R004 | &nbsp;&nbsp;Priya Nair (leading space) | Kitchen Mixer | Defective Product | *(blank)* | Approved | 01-Aug-2026 |
| R005 | Karan Mehta | Cotton Saree | size mismatch | 950 | REJECTED | 02-Aug-2026 |
| R006 | Neha Singh | Laptop Bag | Wrong Item Delivered | 600 | Pending | 02-Aug-2026 |
| R007 | Vikas Patil | Smart Watch | Defective product | 2200 | Approved | 02-Aug-2026 |
| R007 *(duplicate)* | Vikas Patil | Smart Watch | Defective product | 2200 | Approved | 02-Aug-2026 |
| R008 | Ritu Sharma | Wireless Mouse | changed mind | 350 | rejected | 02-Aug-2026 |
| R009 | Suresh Rao | Office Chair | Damaged in transit | *(blank)* | Approved | 02-Aug-2026 |
| R010 | Anita Desai | Yoga Mat | size mismatch | 400 | Approved | 03-Aug-2026 |
| R011 | Manoj Kumar | Air Fryer | Defective Product | 3200 | Pending | 03-Aug-2026 |
| R012 | Divya Iyer | Backpack | wrong item delivered | 850 | Approved | 03-Aug-2026 |
| R013 | Rajesh Nair | Table Lamp | Defective product | 500 | rejected | 03-Aug-2026 |
| R014 | Pooja Verma | Formal Shirt | Size Mismatch | 700 | Approved | 03-Aug-2026 |
| R015 | Arjun Rathi | Headphones | *(blank)* | 1100 | Approved | 03-Aug-2026 |
| R016 | Kavita Joshi | Water Bottle | changed mind | 250 | Rejected | 04-Aug-2026 |
| R017 | Deepak Shah | Gaming Mouse | Defective product | 900 | approved | 04-Aug-2026 |
| R018 | Swati Kulkarni | Denim Jacket | wrong item delivered | 1300 | Approved | 04-Aug-2026 |
| R019 | Nitin Bhosale | Electric Kettle | Damaged in transit | 600 | Pending | 04-Aug-2026 |

### Data Quality Issues Identified

| Issue | Example | Count |
|---|---|---|
| Duplicate record | R007 appears twice, identical values | 1 |
| Missing Refund Amount | R004, R009 | 2 |
| Missing Return Reason | R015 | 1 |
| Inconsistent text casing (Return Reason) | "wrong item delivered" vs "Wrong Item Delivered" | multiple |
| Inconsistent text casing (Return Status) | "approved" / "Approved" / "REJECTED" / "rejected" | multiple |

## 2. Data Cleaning Steps

1. **Trimmed whitespace** — leading/trailing spaces removed from Customer Name (R002, R004).
2. **Standardized text casing** — Return Reason and Return Status values converted to consistent Title Case (e.g., "wrong item delivered" → "Wrong Item Delivered", "REJECTED" → "Rejected").
3. **Filled missing Refund Amount** — R004 and R009 were missing amounts; both were imputed as **₹1,165**, the average refund amount of all "Approved" returns (computed before deduplication).
4. **Filled missing Return Reason** — R015 had no reason recorded; filled as **"Not Specified"** rather than guessing.

## 3. Cleaned Data

| Return ID | Customer Name | Product | Return Reason | Refund Amount | Return Status | Return Date |
|---|---|---|---|---|---|---|
| R001 | Rohan Deshmukh | Wireless Earbuds | Defective Product | 800 | Approved | 01-Aug-2026 |
| R002 | Sneha Kulkarni | Bluetooth Speaker | Wrong Item Delivered | 1200 | Approved | 01-Aug-2026 |
| R003 | Amit Joshi | Running Shoes | Size Mismatch | 1500 | Rejected | 01-Aug-2026 |
| R004 | Priya Nair | Kitchen Mixer | Defective Product | 1165 | Approved | 01-Aug-2026 |
| R005 | Karan Mehta | Cotton Saree | Size Mismatch | 950 | Rejected | 02-Aug-2026 |
| R006 | Neha Singh | Laptop Bag | Wrong Item Delivered | 600 | Pending | 02-Aug-2026 |
| R007 | Vikas Patil | Smart Watch | Defective Product | 2200 | Approved | 02-Aug-2026 |
| R008 | Ritu Sharma | Wireless Mouse | Changed Mind | 350 | Rejected | 02-Aug-2026 |
| R009 | Suresh Rao | Office Chair | Damaged In Transit | 1165 | Approved | 02-Aug-2026 |
| R010 | Anita Desai | Yoga Mat | Size Mismatch | 400 | Approved | 03-Aug-2026 |
| R011 | Manoj Kumar | Air Fryer | Defective Product | 3200 | Pending | 03-Aug-2026 |
| R012 | Divya Iyer | Backpack | Wrong Item Delivered | 850 | Approved | 03-Aug-2026 |
| R013 | Rajesh Nair | Table Lamp | Defective Product | 500 | Rejected | 03-Aug-2026 |
| R014 | Pooja Verma | Formal Shirt | Size Mismatch | 700 | Approved | 03-Aug-2026 |
| R015 | Arjun Rathi | Headphones | Not Specified | 1100 | Approved | 03-Aug-2026 |
| R016 | Kavita Joshi | Water Bottle | Changed Mind | 250 | Rejected | 04-Aug-2026 |
| R017 | Deepak Shah | Gaming Mouse | Defective Product | 900 | Approved | 04-Aug-2026 |
| R018 | Swati Kulkarni | Denim Jacket | Wrong Item Delivered | 1300 | Approved | 04-Aug-2026 |
| R019 | Nitin Bhosale | Electric Kettle | Damaged In Transit | 600 | Pending | 04-Aug-2026 |

## 4. Analysis

### Key Metrics

| Metric | Value |
|---|---|
| Total Returns | 19 |
| Approved Returns | 11 |
| Rejected Returns | 5 |
| Pending Returns | 3 |
| Approval Rate | 57.9% |
| Total Refund Amount (Approved) | ₹11,780 |
| Average Refund – Approved | ₹1,070.91 |
| Average Refund – All Returns | ₹1,038.42 |
| Most Common Return Reason | Defective Product |

### Returns by Status

| Return Status | Count |
|---|---|
| Approved | 11 |
| Rejected | 5 |
| Pending | 3 |

### Returns by Reason

| Return Reason | Count |
|---|---|
| Defective Product | 6 |
| Wrong Item Delivered | 4 |
| Size Mismatch | 4 |
| Changed Mind | 2 |
| Damaged In Transit | 2 |
| Not Specified | 1 |

### Returns by Date

| Return Date | Return Count | Refund Total (₹) |
|---|---|---|
| 01-Aug-2026 | 4 | 4,665 |
| 02-Aug-2026 | 5 | 5,265 |
| 03-Aug-2026 | 6 | 6,750 |
| 04-Aug-2026 | 4 | 3,050 |

## 5. Conclusion

Out of 20 raw records, one duplicate was removed, two missing refund amounts were imputed using the average refund for approved returns, and one missing return reason was labeled "Not Specified" rather than guessed. After cleaning, the data shows an overall approval rate of 57.9%, with "Defective Product" as the leading return reason — suggesting quality control on that product category may need attention.

