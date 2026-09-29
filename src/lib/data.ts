import airportRows from '../data/airports.json';

export type Airport = {
  service_name: string; slug: string; aliases?: string; summary?: string; official_url?: string;
  affiliate_url?: string; line_architecture?: string; protocols?: string; node_regions_standardized?: string;
  client_support?: string; platforms?: string; device_or_usage_limits?: string; free_trial?: string;
  refund_policy?: string; discounts_or_coupon?: string; unlock_support_from_overview?: string;
  streaming_services_mentioned?: string; ai_services_mentioned?: string; lowest_direct_monthly_price_cny?: number | string;
  last_checked_at?: string; verification_status?: string; feature_bullets?: string; purchase_advice?: string;
  ip_profile?: string; native_ip_declared?: boolean; raw?: Record<string, unknown>
};
const priorityNames=['隐形人','暮光加速','飞猫云','微风网络','浪网','梯子云','灵动云','flyv'];
const priorityIndex=(airport:Airport)=>{const name=airport.service_name.toLowerCase();const index=priorityNames.findIndex(item=>name.includes(item.toLowerCase()));return index===-1?Number.MAX_SAFE_INTEGER:index};
export const airports = [...(airportRows as Airport[])].sort((a,b)=>priorityIndex(a)-priorityIndex(b));
export const clean = (value: unknown) => value === null || value === undefined || value === '' ? '暂无资料' : String(value);
export const list = (value: unknown) => { if(clean(value) === '暂无资料') return []; const text=String(value); try { const parsed=JSON.parse(text); if(Array.isArray(parsed)) return parsed.map(String).filter(Boolean); } catch {} return text.split(/[,，、;；|\n]/).map(x => x.trim()).filter(Boolean); };
export const has = (a: Airport, ...terms: string[]) => terms.some(term => JSON.stringify(a).toLowerCase().includes(term.toLowerCase()));
export const price = (a: Airport) => a.lowest_direct_monthly_price_cny !== undefined && a.lowest_direct_monthly_price_cny !== '' ? `¥${a.lowest_direct_monthly_price_cny}/月起` : '暂无资料';
export const related = (topic: string) => airports.filter(a => has(a, topic)).slice(0, 6);
export const nativeAirports = () => airports.filter(a => a.native_ip_declared || has(a, '原生ip', '原生 IP'));
export const regionSlug = (region: string) => ({ '香港':'hong-kong','Hong Kong':'hong-kong','日本':'japan','Japan':'japan','新加坡':'singapore','Singapore':'singapore','台湾':'taiwan','Taiwan':'taiwan','美国':'united-states','United States':'united-states' }[region] ?? '');
const regionNames:Record<string,string>={'Hong Kong':'香港','Taiwan':'台湾','Japan':'日本','Singapore':'新加坡','United States':'美国','South Korea':'韩国','Malaysia':'马来西亚','Vietnam':'越南','United Kingdom':'英国','France':'法国','Germany':'德国','Thailand':'泰国','Philippines':'菲律宾','Indonesia':'印度尼西亚','India':'印度','Canada':'加拿大','Australia':'澳大利亚','Russia':'俄罗斯','Turkey':'土耳其'};
export const regionName=(value:string)=>regionNames[value]??value;
export const regions=(value:unknown)=>list(value).map(regionName);
export const displayDate=(value:unknown)=>{if(!value)return '暂无资料';const match=String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);return match?`${match[1]}年${Number(match[2])}月${Number(match[3])}日`:clean(value)};
export const verificationLabel=(value:unknown)=>{const map:Record<string,string>={source_document_only_not_independently_verified:'仅基于服务商资料，未做独立验证',service_document:'服务商资料',independently_verified:'已独立验证'};return map[String(value)]??(value?clean(value):'仅基于服务商资料，未做独立验证')};
export const readable=(value:unknown)=>{const text=clean(value);if(text==='暂无资料')return text;try{const parsed=JSON.parse(text);return Array.isArray(parsed)?parsed.map(String).join('、'):text}catch{return text}};
