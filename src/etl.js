const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');
const path = require('path');

// Database configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sales_warehouse',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres'
});

// Create raw_sales table
const createTableQuery = `
CREATE TABLE IF NOT EXISTS raw_sales (
  user_id INTEGER,
  product_id VARCHAR(20),
  gender VARCHAR(1),
  age VARCHAR(10),
  occupation INTEGER,
  city_category VARCHAR(1),
  stay_in_current_city_years VARCHAR(10),
  marital_status INTEGER,
  product_category_1 INTEGER,
  product_category_2 INTEGER,
  product_category_3 INTEGER,
  purchase_amount DECIMAL(10,2)
);`;

// Drop existing table
const dropTableQuery = `DROP TABLE IF EXISTS raw_sales;`;

async function dropTable() {
  try {
    await pool.query(dropTableQuery);
    console.log('Existing table dropped successfully');
  } catch (err) {
    console.error('Error dropping table:', err);
    process.exit(1);
  }
}

async function createTable() {
  try {
    await pool.query(createTableQuery);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
    process.exit(1);
  }
}

async function loadData() {
  const results = [];
  const csvFilePath = path.join(__dirname, '..', 'black-friday-sale.csv');

  // Read and parse CSV
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', resolve)
      .on('error', reject);
  });

  // Insert data in batches
  const batchSize = 1000;
  for (let i = 0; i < results.length; i += batchSize) {
    const batch = results.slice(i, i + batchSize);
    const values = batch.map(row => [
      parseInt(row.User_ID),
      row.Product_ID,  // Keep as string
      row.Gender,
      row.Age,
      parseInt(row.Occupation),
      row.City_Category,
      row.Stay_In_Current_City_Years,
      parseInt(row.Marital_Status),
      parseInt(row.Product_Category_1),
      row.Product_Category_2 ? parseInt(row.Product_Category_2) : null,
      row.Product_Category_3 ? parseInt(row.Product_Category_3) : null,
      parseFloat(row.Purchase)
    ]);

    const query = `
      INSERT INTO raw_sales (
        user_id, product_id, gender, age, occupation,
        city_category, stay_in_current_city_years,
        marital_status, product_category_1,
        product_category_2, product_category_3,
        purchase_amount
      ) VALUES ${values.map((_, index) => 
        `($${index * 12 + 1}, $${index * 12 + 2}, $${index * 12 + 3}, 
          $${index * 12 + 4}, $${index * 12 + 5}, $${index * 12 + 6}, 
          $${index * 12 + 7}, $${index * 12 + 8}, $${index * 12 + 9}, 
          $${index * 12 + 10}, $${index * 12 + 11}, $${index * 12 + 12})`
      ).join(',')}`;

    try {
      await pool.query(query, values.flat());
      console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(results.length / batchSize)}`);
    } catch (err) {
      console.error('Error inserting batch:', err);
      process.exit(1);
    }
  }
}

async function main() {
  try {
    // await dropTable();
    await createTable();
    await loadData();
    console.log('ETL process completed successfully');
  } catch (err) {
    console.error('Error in ETL process:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main(); 