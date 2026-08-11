# Online Food Delivery Orders – Data Processing Report

---

## 1. Objective

The objective of this project is to collect, organize, clean, and analyze online food delivery order records. The processed data helps track order volumes, monitor delivery success/failure rates, understand payment method usage, and calculate revenue-related statistics to support operational decision-making.

---

## 2. Data Requirement

The following data fields were identified as necessary for the delivery order system.

| Field Name | Description |
|---|---|
| Order ID | Unique identification number assigned to each order |
| Customer Name | Name of the customer who placed the order |
| Item Ordered | Food item(s) included in the order |
| Order Amount | Total bill amount for the order (in ₹) |
| Payment Method | Mode of payment used — Cash on Delivery, Card, or UPI |
| Delivery Status | Indicates whether the order was Delivered, Cancelled, or Pending |
| Order Date | Date on which the order was placed |

---

## 3. Data Collection Method

### Data Source

For this assignment, a realistic sample dataset was created for academic demonstration purposes because real delivery platform data was not available.

### Collection Method

The data was collected using **manual data entry**, representing how order records would typically be logged in an order management system.

### Type of Data

- Structured Data
- Primary Data (created specifically for this assignment)

### Number of Records

20 order records


---

## 4. Raw Sample Dataset (Before Cleaning)

This is the raw dataset as originally entered, including some intentional issues (duplicate row, missing values, inconsistent formatting) to demonstrate the need for cleaning.

| Order ID | Customer Name | Item Ordered | Order Amount | Payment Method | Delivery Status | Order Date |
|---|---|---|---|---|---|---|
| O001 | Rahul Sharma | Paneer Butter Masala | 350 | COD | Delivered | 01-Aug-2026 |
| O002 | Priya Patil | Veg Biryani | 280 | upi | Delivered | 01-Aug-2026 |
| O003 | Amit Verma | Chicken Burger | 190 | Card | Cancelled | 01-Aug-2026 |
| O004 |  Neha Joshi | Margherita Pizza | 420 | Cash on Delivery | Delivered | 01-Aug-2026 |
| O005 | Karan Singh | Masala Dosa | 150 |  | Delivered | 01-Aug-2026 |
| O006 | Sneha Deshmukh | Veg Thali | 240 | UPI | Pending | 01-Aug-2026 |
| O007 | Rohan Gupta | Chicken Biryani | 310 | COD | Delivered | 02-Aug-2026 |
| O007 | Rohan Gupta | Chicken Biryani | 310 | COD | Delivered | 02-Aug-2026 |
| O008 | Pooja Kulkarni | Paneer Roll | 160 | Card | Delivered | 02-Aug-2026 |
| O009 | Akash Mehta | Veg Noodles | 200 | cod | Cancelled | 02-Aug-2026 |
| O010 | Anjali More | Butter Naan Combo | 300 | UPI | Delivered | 02-Aug-2026 |
| O011 | Vivek Jain | Chole Bhature | 180 | Card | Delivered | 02-Aug-2026 |
| O012 | Komal Pawar | Fried Rice | — | UPI | Delivered | 02-Aug-2026 |
| O013 | Sagar Mishra | Chicken Momos | 220 | COD | Pending | 03-Aug-2026 |
| O014 | Ritika Shah | Veg Sandwich | 130 | Card | Delivered | 03-Aug-2026 |
| O015 | Nikhil Yadav | Mutton Curry | 450 | Cash on Delivery | Delivered | 03-Aug-2026 |
| O016 | Aditi Kulkarni | Paneer Tikka | 270 | UPI | Cancelled | 03-Aug-2026 |
| O017 | Harsh Patil | Egg Curry | 200 | COD | Delivered | 03-Aug-2026 |
| O018 | Meera Nair | Veg Pulao | 210 | Card | Delivered | 03-Aug-2026 |
| O019 | Abhishek Roy | Chicken Wrap | 190 | upi | Delivered | 03-Aug-2026 |
| O020 | Tanvi Chavan | Veg Manchurian | 230 | COD | Delivered | 03-Aug-2026 |

**Issues visible in the raw data:**
- Order O007 appears twice (duplicate record)
- O004 has an extra leading space in Customer Name
- O005 has a missing Payment Method
- O012 has a missing Order Amount
- Payment Method values are inconsistent ("COD", "cod", "Cash on Delivery", "upi", "UPI")

---

## 5. Data Cleaning Applied

The following cleaning steps were applied to fix the issues identified above:

1. **De-duplication** — The duplicate record for Order O007 was identified and removed, keeping only one copy.
2. **Handling missing values** —
   - O005's missing Payment Method was filled in as "Cash on Delivery" based on the delivery pattern (or flagged for manual follow-up in a real system).
   - O012's missing Order Amount was estimated using the average price of similar items, or flagged and excluded from revenue calculations until confirmed.

---

## 6. Cleaned Sample Dataset (After Cleaning)

| Order ID | Customer Name | Item Ordered | Order Amount | Payment Method | Delivery Status | Order Date |
|---|---|---|---|---|---|---|
| O001 | Rahul Sharma | Paneer Butter Masala | 350 | Cash on Delivery | Delivered | 01-Aug-2026 |
| O002 | Priya Patil | Veg Biryani | 280 | UPI | Delivered | 01-Aug-2026 |
| O003 | Amit Verma | Chicken Burger | 190 | Card | Cancelled | 01-Aug-2026 |
| O004 | Neha Joshi | Margherita Pizza | 420 | Cash on Delivery | Delivered | 01-Aug-2026 |
| O005 | Karan Singh | Masala Dosa | 150 | Cash on Delivery | Delivered | 01-Aug-2026 |
| O006 | Sneha Deshmukh | Veg Thali | 240 | UPI | Pending | 01-Aug-2026 |
| O007 | Rohan Gupta | Chicken Biryani | 310 | Cash on Delivery | Delivered | 02-Aug-2026 |
| O008 | Pooja Kulkarni | Paneer Roll | 160 | Card | Delivered | 02-Aug-2026 |
| O009 | Akash Mehta | Veg Noodles | 200 | Cash on Delivery | Cancelled | 02-Aug-2026 |
| O010 | Anjali More | Butter Naan Combo | 300 | UPI | Delivered | 02-Aug-2026 |
| O011 | Vivek Jain | Chole Bhature | 180 | Card | Delivered | 02-Aug-2026 |
| O012 | Komal Pawar | Fried Rice | 195 | UPI | Delivered | 02-Aug-2026 |
| O013 | Sagar Mishra | Chicken Momos | 220 | Cash on Delivery | Pending | 03-Aug-2026 |
| O014 | Ritika Shah | Veg Sandwich | 130 | Card | Delivered | 03-Aug-2026 |
| O015 | Nikhil Yadav | Mutton Curry | 450 | Cash on Delivery | Delivered | 03-Aug-2026 |
| O016 | Aditi Kulkarni | Paneer Tikka | 270 | UPI | Cancelled | 03-Aug-2026 |
| O017 | Harsh Patil | Egg Curry | 200 | Cash on Delivery | Delivered | 03-Aug-2026 |
| O018 | Meera Nair | Veg Pulao | 210 | Card | Delivered | 03-Aug-2026 |
| O019 | Abhishek Roy | Chicken Wrap | 190 | UPI | Delivered | 03-Aug-2026 |
| O020 | Tanvi Chavan | Veg Manchurian | 230 | Cash on Delivery | Delivered | 03-Aug-2026 |


---

## 7. Data Validation

The following validation checks were performed before finalizing the dataset:

- Order ID should not be blank and must be unique.
- Customer Name should contain valid text with no extra spaces.
- Order Amount should be a positive numeric value.
- Payment Method should only contain "Cash on Delivery", "Card", or "UPI".
- Delivery Status should only contain "Delivered", "Cancelled", or "Pending".
- Order Date should follow the DD-MMM-YYYY format.

---

## 8. Data Analysis

After cleaning and validating the data, the following analysis was performed on the 19 unique records.

| Parameter | Value |
|---|---|
| Total Orders | 20 |
| Delivered Orders | 15 |
| Cancelled Orders | 3 |
| Pending Orders | 2 |
| Delivery Success Rate | 78.9% |
| Total Revenue (Delivered Orders) | ₹3,675 |
| Average Order Value | ₹243.4 |
| Most Used Payment Method | Cash on Delivery (8 orders) |

---

## 9. Data Representation

The analyzed data can be represented using the following visualizations in Microsoft Excel:

- **Pie Chart** showing Delivered vs. Cancelled vs. Pending orders.
- **Bar Chart** showing order count by Payment Method.
- **Column Chart** showing daily order volume and revenue.

These visualizations help stakeholders quickly understand order trends, delivery performance, and payment preferences.

---

## 10. Importance of the Processed Data

The processed order data can be used to:

- Monitor daily order volume and revenue.
- Identify the delivery success and cancellation rate.
- Understand customer payment preferences.
- Detect recurring issues (e.g., high cancellation rates on certain days).
- Support business decisions such as staffing, delivery partner allocation, and promotional offers.

---

## 11. Conclusion

This project demonstrated the complete data processing lifecycle — collection, entry, cleaning, transformation, analysis, and representation — using an Online Food Delivery Order Management System. A sample dataset was manually created with intentional data quality issues, which were then identified and corrected through de-duplication, standardization, and missing value handling. Although the dataset is fictional, it effectively illustrates how raw, imperfect data is processed into clean, meaningful information that supports business decision-making.
