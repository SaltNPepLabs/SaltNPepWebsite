import { test } from "node:test";
import assert from "node:assert/strict";
import { deliveryWindow, cutoffClock } from "../src/lib/delivery-window";
import { products } from "../src/lib/products";
import { getAvailableProductVariants,getVariantUnitPrice } from "../src/lib/product-variants";
import { loadConfig } from "./config";
const schedule={cutoffHour:15,cutoffMinute:0,orderDays:[0,1,2,3,4,5,6],deliveryDays:[0,1,2,3,4,5,6]};
test("delivery deadline uses Utah time in summer/winter and closes exactly at cutoff",()=>{
 assert.equal(deliveryWindow(new Date("2026-07-01T20:00:00Z"),schedule)?.remaining,3600000);
 assert.equal(deliveryWindow(new Date("2026-12-01T21:00:00Z"),schedule)?.remaining,3600000);
 assert.equal(deliveryWindow(new Date("2026-07-01T21:00:00Z"),schedule),null);
 assert.equal(deliveryWindow(new Date("2026-07-01T20:00:00Z"),{...schedule,deliveryDays:[1]}),null);
 assert.equal(deliveryWindow(new Date("2026-07-01T20:00:00Z"),{...schedule,orderDays:[]}),null);
});
test("no quantity discounts across any offered size; free shipping cannot be overridden by stale env",()=>{
 for(const product of products) for(const variant of getAvailableProductVariants(product)) for(const qty of [1,2,3,5,10,100]) assert.equal(getVariantUnitPrice(variant,qty),variant.price);
 assert.equal(loadConfig({SHIPPING_CENTS:"500"}).shippingCents,0);
});

test("11 a.m. clock switches at the exact cutoff and handles DST and year rollover",()=>{
 assert.equal(cutoffClock(new Date("2026-07-01T16:59:59Z")).beforeCutoff,true);
 assert.equal(cutoffClock(new Date("2026-07-01T17:00:00Z")).beforeCutoff,false);
 assert.equal(cutoffClock(new Date("2026-07-01T17:00:00Z")).localDeliveryDate,"2026-07-03");
 assert.equal(cutoffClock(new Date("2026-12-31T18:00:00Z")).localDeliveryDate,"2027-01-02");
 assert.equal(cutoffClock(new Date("2026-03-07T18:00:00Z")).remaining,23*3600000);
 assert.equal(cutoffClock(new Date("2026-10-31T17:00:00Z")).remaining,25*3600000);
});
