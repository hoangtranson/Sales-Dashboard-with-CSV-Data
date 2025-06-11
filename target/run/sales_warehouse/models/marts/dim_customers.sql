
  
    

  create  table "sales_warehouse"."public"."dim_customers__dbt_tmp"
  
  
    as
  
  (
    with staged as (
    select * from "sales_warehouse"."public"."stg_customers"
)

select
    user_id as customer_id,
    gender,
    age,
    occupation,
    city_category,
    stay_in_current_city_years,
    marital_status,
    current_timestamp as dbt_updated_at
from staged
  );
  