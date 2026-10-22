export interface DeliverySchedule { cutoffHour: number; cutoffMinute: number; orderDays: number[]; deliveryDays: number[] }
export const deliveryTimeZone = "America/Denver";
// Owner-confirmed seven-day service; holiday exceptions are disclosed before ordering.
export const deliverySchedule: DeliverySchedule = { cutoffHour: 11, cutoffMinute: 0, orderDays: [0,1,2,3,4,5,6], deliveryDays: [0,1,2,3,4,5,6] };
export function deliveryWindow(now: Date, schedule: DeliverySchedule) {
  if (!Number.isFinite(now.getTime()) || !Number.isInteger(schedule.cutoffHour) || schedule.cutoffHour < 0 || schedule.cutoffHour > 23 || !Number.isInteger(schedule.cutoffMinute) || schedule.cutoffMinute < 0 || schedule.cutoffMinute > 59) return null;
  const formatter = new Intl.DateTimeFormat("en-US", { timeZone: deliveryTimeZone, year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23" });
  const parts = (date: Date) => Object.fromEntries(formatter.formatToParts(date).filter(p => p.type !== "literal").map(p => [p.type, Number(p.value)]));
  const local = parts(now);
  const day = new Date(Date.UTC(local.year,local.month-1,local.day));
  if (!schedule.orderDays.includes(day.getUTCDay()) || !schedule.deliveryDays.includes((day.getUTCDay()+1)%7)) return null;
  const targetWall = Date.UTC(local.year,local.month-1,local.day,schedule.cutoffHour,schedule.cutoffMinute);
  let instant = targetWall;
  for (let i=0;i<3;i++) { const p=parts(new Date(instant)); instant += targetWall - Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second); }
  const remaining = instant-now.getTime();
  if (remaining <= 0) return null;
  return { remaining, deadline: new Date(instant), deliveryDate: new Date(day.getTime()+86400000).toISOString().slice(0,10) };
}

// Calendar-day calculation of the owner-confirmed 11 a.m. rule.
// This informational clock is not a checkout or a booked delivery slot.
export function cutoffClock(now: Date) {
 const formatter = new Intl.DateTimeFormat("en-US", {timeZone:deliveryTimeZone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});
 const parts=(date:Date)=>Object.fromEntries(formatter.formatToParts(date).filter(p=>p.type!=="literal").map(p=>[p.type,Number(p.value)]));
 const local=parts(now); const beforeCutoff=local.hour<11;
 const base=Date.UTC(local.year,local.month-1,local.day);
 const targetWall=base+(beforeCutoff?0:86400000)+11*3600000;
 let target=targetWall;
 for(let i=0;i<3;i++){const p=parts(new Date(target));target+=targetWall-Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second);}
 return {beforeCutoff,remaining:Math.max(0,target-now.getTime()),localDeliveryDate:new Date(base+(beforeCutoff?1:2)*86400000).toISOString().slice(0,10)};
}
