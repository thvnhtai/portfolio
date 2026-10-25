const fmt = (d: Date, withSeconds: boolean) =>
  d.toLocaleTimeString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', ...(withSeconds ? { second: '2-digit' } : {}) });

export const hcmcTime = (d: Date, withSeconds = false): string => fmt(d, withSeconds);

export function isProbablyAwake(d: Date): boolean {
  const h = Number(d.toLocaleTimeString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', hour12: false }).slice(0, 2));
  return h >= 8 && h <= 22;
}
