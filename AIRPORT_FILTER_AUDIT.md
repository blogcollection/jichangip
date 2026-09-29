# Airport Filter Audit

## Root cause

The former inline script had a JavaScript syntax error and used Chinese display labels to search serialized raw data. As a result, the handler did not reliably execute and standardised English region values could not match Chinese filter labels.

## Implementation

- Updated `src/pages/airports/index.astro`.
- Every airport card wrapper now emits explicit `data-native`, `data-iepl`, `data-iplc`, `data-chatgpt`, `data-netflix` and `data-regions` attributes.
- Native JavaScript implements a keyboard-accessible single-select button filter, `aria-pressed` state, live count and an empty-state reset action.
- Filtering hides or reveals the complete card wrapper, allowing the existing grid to reflow naturally.

## Actual source-data counts

| Filter | Count |
| --- | ---: |
| 全部 | 31 |
| 原生 IP 声明 | 14 |
| IEPL | 13 |
| IPLC | 14 |
| ChatGPT | 29 |
| Netflix | 26 |
| 香港 | 23 |
| 日本 | 23 |
| 新加坡 | 23 |
| 台湾 | 22 |
| 美国 | 23 |

## Verification

- All filter buttons are real `button` elements and use `aria-pressed`.
- Region filters match standardised internal values (`Hong Kong`, `Japan`, `Singapore`, `Taiwan`, `United States`) while retaining Chinese UI labels.
- The 0-result state is implemented and offers a “查看全部机场” reset.
- Natural flex-wrap filter layout and the grid's existing mobile single-column rule keep the control usable at mobile widths.
- Filter-related console errors: none after the syntax repair.
- `npm run check`: PASS.
- `npm run build`: PASS.
