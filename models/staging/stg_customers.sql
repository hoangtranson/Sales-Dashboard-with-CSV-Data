with source as (
    select * from {{ source('raw', 'raw_sales') }}
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