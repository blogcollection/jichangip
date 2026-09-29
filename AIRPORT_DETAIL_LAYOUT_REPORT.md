# Airport Detail Layout Report

## Information architecture

Airport entity pages now follow this decision-first order:

1. Hero summary: name, alias, summary, price, primary tags and actions.
2. Suitable-for / considerations summary.
3. Node regions.
4. Usage fit: AI, streaming, line type and IP declaration.
5. Detailed structured information.
6. Purchase guidance.

## Display transforms

- Region mappings: Hong Kong→香港, Taiwan→台湾, Japan→日本, Singapore→新加坡, United States→美国, South Korea→韩国, Malaysia→马来西亚, Vietnam→越南, United Kingdom→英国, France→法国, Germany→德国, Thailand→泰国, Philippines→菲律宾, Indonesia→印度尼西亚, India→印度, Canada→加拿大, Australia→澳大利亚, Russia→俄罗斯, Turkey→土耳其.
- JSON-like region arrays are parsed into Chinese tag lists; the first eight are shown with a total-count note when required.
- ISO timestamps are displayed as `YYYY年M月D日`.
- `source_document_only_not_independently_verified` is displayed as “仅基于服务商资料，未做独立验证”.
- Empty and absent values display as “暂无资料”.

## Checked samples

- `/airports/速界/`
- `/airports/u1s1/`
- `/airports/wgetcloud-原-gacloud/`

The generated pages use the Chinese region display transform and avoid raw JSON, internal verification codes and raw ISO timestamps in the visible UI.

## Verification

- `npm run check`: PASS
- `npm run build`: PASS
- URL, canonical, source data and SEO configuration: unchanged.
