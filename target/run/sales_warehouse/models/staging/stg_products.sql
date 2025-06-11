
  create view "sales_warehouse"."public"."stg_products__dbt_tmp"
    
    
  as (
    with source as (
    select * from "sales_warehouse"."public"."raw_sales"
),

staged as (
    select distinct
        product_id,
        product_category_1,
        product_category_2,
        product_category_3
    from source
)

select * from staged
  );