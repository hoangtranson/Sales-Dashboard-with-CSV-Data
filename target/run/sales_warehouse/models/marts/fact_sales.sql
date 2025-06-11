
  
    

  create  table "sales_warehouse"."public"."fact_sales__dbt_tmp"
  
  
    as
  
  (
    with source as (
    select * from "sales_warehouse"."public"."raw_sales"
),

sales as (
    select
        user_id as customer_id,
        product_id,
        purchase_amount,
        -- Add any additional metrics or calculations here
        current_timestamp as dbt_updated_at
    from source
)

select * from sales
  );
  