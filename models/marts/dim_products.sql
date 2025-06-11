with staged as (
    select * from {{ ref('stg_products') }}
)

select
    product_id,
    product_category_1,
    product_category_2,
    product_category_3,
    current_timestamp as dbt_updated_at
from staged 