
  
    

  create  table "sales_warehouse"."public"."dim_products__dbt_tmp"
  
  
    as
  
  (
    with staged as (
    select * from "sales_warehouse"."public"."stg_products"
)

select
    product_id,
    product_category_1,
    product_category_2,
    product_category_3,
    current_timestamp as dbt_updated_at
from staged
  );
  