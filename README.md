# 📊 Sales Dashboard with CSV Data

## 🎯 Project Goal
Build a basic data warehouse with ETL pipeline using sales data from CSVs.

## 🛠️ Tech Stack
- **ETL**: Node.js
- **Data Warehouse**: PostgreSQL
- **Transformations**: dbt
- **Visualization**: Metabase

## 📝 Implementation Steps


Run Metabase

```
brew install openjdk@21

sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk

echo 'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

MB_JETTY_PORT=3001 java -jar metabase.jar
```

### 1. Data Acquisition
- Download dummy sales data (e.g., Kaggle's Sales Dataset) https://www.kaggle.com/datasets/rajeshrampure/black-friday-sale

### 2. ETL Pipeline (Node.js)
- Parse CSV using csv-parser
- Load data into `raw_sales` table in PostgreSQL

### 3. Data Transformation (dbt)
- Create clean dimensional models:
  - `dim_customers`
  - `dim_products`
  - `fact_sales`
- Add calculated fields:
  - Total revenue
  - Discounts

### 4. Dashboard Creation (Metabase)
- Sales by product
- Monthly trends
- Top 10 customers

## 📚 Key Concepts
- ETL (Extract, Transform, Load)
- Fact/Dimension modeling
- Data warehouse loading
- Data visualization