
  create view "sales_warehouse"."public"."stg_customers__dbt_tmp"
    
    
  as (
    with source as (
    select * from "sales_warehouse"."public"."raw_sales"
),

staged as (
    select distinct
        user_id,
        gender,
        age,
        occupation,
        city_category,
        stay_in_current_city_years,
        marital_status
    from source
)

select * from staged
  );