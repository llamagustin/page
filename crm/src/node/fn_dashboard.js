
//DASHBOARD

const sql_data_analytics = 
 `SELECT
  jsonb_build_object(
    'web', jsonb_build_object(
      'accepted', SUM(CASE WHEN tool->>'service' = 'web' AND status >= 200 AND status < 300 THEN 1 ELSE 0 END),
      'pending', SUM(CASE WHEN tool->>'service' = 'web' AND status >= 300 THEN 1 ELSE 0 END),
      'totalMoney', SUM(CASE WHEN tool->>'service' = 'web' THEN total ELSE 0 END),
      'pendingMoney', SUM(CASE WHEN tool->>'service' = 'web' AND status >= 300 THEN total ELSE 0 END)
    ),
    'shop', jsonb_build_object(
      'accepted', SUM(CASE WHEN tool->>'service' = 'shop' AND status >= 200 AND status < 300 THEN 1 ELSE 0 END),
      'pending', SUM(CASE WHEN tool->>'service' = 'shop' AND status >= 300 THEN 1 ELSE 0 END),
      'totalMoney', SUM(CASE WHEN tool->>'service' = 'shop' THEN total ELSE 0 END),
      'pendingMoney', SUM(CASE WHEN tool->>'service' = 'shop' AND status >= 300 THEN total ELSE 0 END)
    ),
    'rrss', jsonb_build_object(
      'accepted', SUM(CASE WHEN tool->>'service' = 'rrss' AND status >= 200 AND status < 300 THEN 1 ELSE 0 END),
      'pending', SUM(CASE WHEN tool->>'service' = 'rrss' AND status >= 300 THEN 1 ELSE 0 END),
      'totalMoney', SUM(CASE WHEN tool->>'service' = 'rrss' THEN total ELSE 0 END),
      'pendingMoney', SUM(CASE WHEN tool->>'service' = 'rrss' AND status >= 300 THEN total ELSE 0 END)
    ),
    'seo', jsonb_build_object(
      'accepted', SUM(CASE WHEN tool->>'service' = 'seo' AND status >= 200 AND status < 300 THEN 1 ELSE 0 END),
      'pending', SUM(CASE WHEN tool->>'service' = 'seo' AND status >= 300 THEN 1 ELSE 0 END),
      'totalMoney', SUM(CASE WHEN tool->>'service' = 'seo' THEN total ELSE 0 END),
      'pendingMoney', SUM(CASE WHEN tool->>'service' = 'seo' AND status >= 300 THEN total ELSE 0 END)
    ),
    'crm', jsonb_build_object(
      'accepted', SUM(CASE WHEN tool->>'service' = 'crm' AND status >= 200 AND status < 300 THEN 1 ELSE 0 END),
      'pending', SUM(CASE WHEN tool->>'service' = 'crm' AND status >= 300 THEN 1 ELSE 0 END),
      'totalMoney', SUM(CASE WHEN tool->>'service' = 'crm' THEN total ELSE 0 END),
      'pendingMoney', SUM(CASE WHEN tool->>'service' = 'crm' AND status >= 300 THEN total ELSE 0 END)
    ),
    'office', jsonb_build_object(
      'accepted', SUM(CASE WHEN tool->>'service' = 'office' AND status >= 200 AND status < 300 THEN 1 ELSE 0 END),
      'pending', SUM(CASE WHEN tool->>'service' = 'office' AND status >= 300 THEN 1 ELSE 0 END),
      'totalMoney', SUM(CASE WHEN tool->>'service' = 'office' THEN total ELSE 0 END),
      'pendingMoney', SUM(CASE WHEN tool->>'service' = 'office' AND status >= 300 THEN total ELSE 0 END)
    ),
    'total', SUM(total)
  ) AS service_count
FROM aythen.form
CROSS JOIN jsonb_array_elements(tools) AS tool;`



const sql_data_salesOverview = 
 `SELECT CONCAT(ROUND(COALESCE((SUM(CASE WHEN status >= 200 AND status < 300 THEN budget ELSE 0 END) / NULLIF(SUM(CASE WHEN status >= 300 AND status < 400 THEN budget ELSE 0 END), 0)) * 100, 0)), '%') AS stats,
       row_to_json((SELECT d FROM (SELECT COUNT(CASE WHEN status >= 200 AND status < 300 THEN 1 ELSE NULL END) AS data, CONCAT(SUM(CASE WHEN status >= 200 AND status < 300 THEN budget ELSE 0 END), '€') AS total) AS d)) AS sell,
       row_to_json((SELECT d FROM (SELECT COUNT(CASE WHEN status >= 300 AND status < 400 THEN 1 ELSE NULL END) AS data, CONCAT(SUM(CASE WHEN status >= 300 AND status < 400 THEN budget ELSE 0 END), '€') AS total) AS d)) AS pendent
FROM aythen.users
WHERE status >= 200;`

const sql_statisticsVertical = 
`SELECT COUNT(*) FROM aythen.users 
WHERE status BETWEEN 200 AND 299;`


const sql_earningsReports = 
`SELECT 
    SUM(CASE WHEN status >= 200 AND status < 300 THEN (tool->>'cost')::numeric ELSE 0 END) AS gain_amount,
    SUM(CASE WHEN status >= 300 AND status < 400 THEN (tool->>'cost')::numeric ELSE 0 END) AS pendent_amount,
    SUM(CASE WHEN status >= 400 AND status < 500 THEN (tool->>'cost')::numeric ELSE 0 END) AS cancelled_amount,
    AVG((tool->>'cost')::numeric) AS stats,
    CONCAT('[', STRING_AGG(CAST(tool->>'cost' AS VARCHAR), ','), ']') AS data,
    CONCAT(ROUND(COALESCE(SUM(CASE WHEN status >= 200 AND status < 300 THEN (tool->>'cost')::numeric ELSE 0 END) / NULLIF(SUM((tool->>'cost')::numeric), 0), 0) * 100), '%') AS gain_progres,
    CONCAT(ROUND(COALESCE(SUM(CASE WHEN status >= 300 AND status < 400 THEN (tool->>'cost')::numeric ELSE 0 END) / NULLIF(SUM((tool->>'cost')::numeric), 0), 0) * 100), '%') AS pendent_progres,
    CONCAT(ROUND(COALESCE(SUM(CASE WHEN status >= 400 AND status < 500 THEN (tool->>'cost')::numeric ELSE 0 END) / NULLIF(SUM((tool->>'cost')::numeric), 0), 0) * 100), '%') AS cancelled_progres,
    SUM((tool->>'cost')::numeric) AS total
FROM aythen.form, jsonb_array_elements(tools) as tool;
`

const sql_supportTracker = 
`SELECT 
    SUM(CASE WHEN CAST(status AS CHAR(3)) LIKE '2%' THEN total ELSE 0 END) AS gain_amount,
    SUM(CASE WHEN CAST(status AS CHAR(3)) LIKE '3%' THEN total ELSE 0 END) AS pendent_amount,
    SUM(CASE WHEN CAST(status AS CHAR(3)) LIKE '4%' THEN total ELSE 0 END) AS cancelled_amount,
    AVG(total) AS stats,
    CONCAT('[', STRING_AGG(CAST(total AS VARCHAR), ','), ']') AS data,
    CONCAT(ROUND(COALESCE(SUM(CASE WHEN CAST(status AS CHAR(3)) LIKE '2%' THEN total ELSE 0 END) / NULLIF(SUM(total), 0), 0) * 100), '%') AS gain_progres,
    CONCAT(ROUND(COALESCE(SUM(CASE WHEN CAST(status AS CHAR(3)) LIKE '3%' THEN total ELSE 0 END) / NULLIF(SUM(total), 0), 0) * 100), '%') AS pendent_progres,
    CONCAT(ROUND(COALESCE(SUM(CASE WHEN CAST(status AS CHAR(3)) LIKE '4%' THEN total ELSE 0 END) / NULLIF(SUM(total), 0), 0) * 100), '%') AS cancelled_progres,
    SUM(total) AS total
FROM aythen.form;
`


//LEAD

const sql_leadsActive = `SELECT SUM(total) AS total_sum FROM aythen.form WHERE user_id = 'c82c5d22-68f8-49ae-a464-e3aadb8383cd' AND status >= 200 AND status < 300;`

const sql_simpleStatisticsDemoCards = `SELECT SUM(total * 0.1) AS total_sum FROM aythen.form WHERE user_id = 'c82c5d22-68f8-49ae-a464-e3aadb8383cd' AND status = 200;`

const sql_leadsRevenueDiary_series = `SELECT SUM(total * 0.1) AS total_sum FROM aythen.form 
WHERE user_id = 'c82c5d22-68f8-49ae-a464-e3aadb8383cd' 
AND status = 200 
AND EXTRACT(MONTH FROM "createdAt") = 12;`

// const sql_leadsServicesStates_series = `SELECT jsonb_build_object('web', COALESCE(SUM((tools->>'cost')::int) FILTER (WHERE tools->>'service' = 'web'), 0),
//                           'shop', COALESCE(SUM((tools->>'cost')::int) FILTER (WHERE tools->>'service' = 'shop'), 0),
//                           'seo', COALESCE(SUM((tools->>'cost')::int) FILTER (WHERE tools->>'service' = 'seo'), 0),
//                           'office', COALESCE(SUM((tools->>'cost')::int) FILTER (WHERE tools->>'service' = 'office'), 0),
//                           'crm', COALESCE(SUM((tools->>'cost')::int) FILTER (WHERE tools->>'service' = 'crm'), 0),
//                           'rrss', COALESCE(SUM((tools->>'cost')::int) FILTER (WHERE tools->>'service' = 'rrss'), 0)) AS services_costs
// FROM aythen.form
// WHERE user_id = 'c82c5d22-68f8-49ae-a464-e3aadb8383cd'
//   AND status = 200
//   AND EXTRACT(MONTH FROM "createdAt"::date) = 3;`
  
const sql_leadsServicesStates_series = `
SELECT
    COALESCE(ROUND(SUM(CASE WHEN tag = 'web' THEN cost ELSE 0 END) / SUM(cost) * 100), 0) AS web,
    COALESCE(ROUND(SUM(CASE WHEN tag = 'shop' THEN cost ELSE 0 END) / SUM(cost) * 100), 0) AS shop,
    COALESCE(ROUND(SUM(CASE WHEN tag = 'rrss' THEN cost ELSE 0 END) / SUM(cost) * 100), 0) AS rrss,
    COALESCE(ROUND(SUM(CASE WHEN tag = 'seo' THEN cost ELSE 0 END) / SUM(cost) * 100), 0) AS seo,
    COALESCE(ROUND(SUM(CASE WHEN tag = 'crm' THEN cost ELSE 0 END) / SUM(cost) * 100), 0) AS crm,
    COALESCE(ROUND(SUM(CASE WHEN tag = 'office' THEN cost ELSE 0 END) / SUM(cost) * 100), 0) AS office
FROM (
    SELECT JSONB_ARRAY_ELEMENTS(tools) AS tool
    FROM aythen.form
) AS tools_expanded
CROSS JOIN LATERAL (
    SELECT
        tool ->> 'tag' AS tag,
        (tool ->> 'cost')::numeric AS cost
) AS services
WHERE tag IN ('web', 'shop', 'rrss', 'seo', 'crm', 'office')
`

const sql_leadsServices_series = `
select
  ARRAY[
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 1 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 2 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 3 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 4 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 5 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 6 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 7 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 8 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 9 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 10 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 11 and tag = 'web' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 12 and tag = 'web' THEN cost END), 0)
  ] AS web,
  ARRAY[
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 1 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 2 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 3 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 4 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 5 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 6 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 7 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 8 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 9 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 10 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 11 and tag = 'shop' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 12 and tag = 'shop' THEN cost END), 0)
  ] AS shop,
  ARRAY[
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 1 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 2 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 3 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 4 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 5 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 6 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 7 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 8 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 9 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 10 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 11 and tag = 'seo' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 12 and tag = 'seo' THEN cost END), 0)
  ] AS seo,
  ARRAY[
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 1 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 2 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 3 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 4 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 5 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 6 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 7 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 8 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 9 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 10 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 11 and tag = 'rrss' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 12 and tag = 'rrss' THEN cost END), 0)
  ] AS rrss,
  ARRAY[
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 1 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 2 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 3 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 4 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 5 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 6 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 7 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 8 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 9 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 10 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 11 and tag = 'crm' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 12 and tag = 'crm' THEN cost END), 0)
  ] AS crm,
  ARRAY[
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 1 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 2 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 3 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 4 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 5 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 6 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 7 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 8 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 9 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 10 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 11 and tag = 'office' THEN cost END), 0),
  	COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "createdAt") = 12 and tag = 'office' THEN cost END), 0)
  ] AS office
FROM (
    SELECT JSONB_ARRAY_ELEMENTS(tools) AS tool,"createdAt" 
    FROM aythen.form
) AS tools_expanded
CROSS JOIN LATERAL (
    SELECT
        tool ->> 'tag' AS tag,
        (tool ->> 'cost')::numeric AS cost
) AS services;
`


const sql_leadsAnalyticsSales_series = `
WITH tool_sums AS (
  SELECT 
    COALESCE(SUM(CASE WHEN tool ->> 'tag' = 'web' THEN (tool ->> 'cost')::numeric END), 0) AS web_sum,
    COALESCE(SUM(CASE WHEN tool ->> 'tag' = 'shop' THEN (tool ->> 'cost')::numeric END), 0) AS shop_sum,
    COALESCE(SUM(CASE WHEN tool ->> 'tag' = 'seo' THEN (tool ->> 'cost')::numeric END), 0) AS seo_sum,
    COALESCE(SUM(CASE WHEN tool ->> 'tag' = 'rrss' THEN (tool ->> 'cost')::numeric END), 0) AS rrss_sum,
    COALESCE(SUM(CASE WHEN tool ->> 'tag' = 'crm' THEN (tool ->> 'cost')::numeric END), 0) AS crm_sum,
    COALESCE(SUM(CASE WHEN tool ->> 'tag' = 'office' THEN (tool ->> 'cost')::numeric END), 0) AS office_sum,
    SUM(CASE WHEN tool ->> 'cost' IS NOT NULL THEN (tool ->> 'cost')::numeric END) AS total_sum
  FROM aythen.form
  CROSS JOIN LATERAL JSONB_ARRAY_ELEMENTS(tools) AS tool
  WHERE user_id = 'ef76a3f5-cecf-4fc3-8ff1-319d0e14f16a'
)
SELECT 
  ARRAY[
    ROUND(COALESCE(web_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(shop_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(seo_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(rrss_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(crm_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(office_sum, 0) / total_sum * 100, 2)
  ] AS total,
  ARRAY[
    ROUND(COALESCE(web_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(shop_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(seo_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(rrss_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(crm_sum, 0) / total_sum * 100, 2),
    ROUND(COALESCE(office_sum, 0) / total_sum * 100, 2)
  ] AS individual
FROM tool_sums;
`

const sql_leadsActive_series = `
SELECT *, (SELECT COUNT(*)
          FROM aythen.users
          WHERE reseller @> '[{"id": "85ccf577-bcb3-496f-89da-dc141d72185c"}]'
          ) AS stats
FROM aythen.users
WHERE status BETWEEN 300 AND 399
AND reseller @> '[{"id": "85ccf577-bcb3-496f-89da-dc141d72185c"}]'
ORDER BY "createdAt" DESC
LIMIT 10;
`

// const sql_leadsWhitdrawal_series = ``


module.exports = {
    sql_data_analytics: sql_data_analytics,
    sql_data_salesOverview: sql_data_salesOverview,
    sql_statisticsVertical: sql_statisticsVertical,
    sql_earningsReports: sql_earningsReports,
    sql_supportTracker: sql_supportTracker,
    
    sql_leadsActive: sql_leadsActive,
    sql_simpleStatisticsDemoCards: sql_simpleStatisticsDemoCards,
    sql_leadsRevenueDiary_series: sql_leadsRevenueDiary_series,
    sql_leadsServicesStates_series: sql_leadsServicesStates_series,
    sql_leadsServices_series: sql_leadsServices_series,
    sql_leadsAnalyticsSales_series: sql_leadsAnalyticsSales_series,
    sql_leadsActive_series: sql_leadsActive_series
}