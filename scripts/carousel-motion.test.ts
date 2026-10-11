import assert from "node:assert/strict";
import test from "node:test";
import { dragReleasePage, settlingVelocity } from "../src/lib/carousel-motion";

test("release jitter cannot send a nearly centered next vial back", () => {
  assert.equal(dragReleasePage(0, 0.9, -4), 1);
  assert.equal(dragReleasePage(0, -0.9, 4), -1);
  assert.equal(dragReleasePage(7, 7.9, -4), 8);
  assert.equal(dragReleasePage(0, -0.51, 8), -1);
  assert.equal(dragReleasePage(0, 0.51, -8), 1);
  assert.equal(dragReleasePage(0, 0.9, 100), 1);
  assert.equal(dragReleasePage(0, -0.9, -100), -1);
  assert.equal(dragReleasePage(0, 1.9, 100), 2);
});

test("short tugs return, forward flicks advance, and deliberate reversal still works", () => {
  assert.equal(dragReleasePage(0, 0.2, 0), 0);
  assert.equal(dragReleasePage(0, -0.2, 0), 0);
  assert.equal(dragReleasePage(0, 0.2, 4), 1);
  assert.equal(dragReleasePage(0, -0.2, -4), -1);
  assert.equal(dragReleasePage(0, -0.7, -2), -1);
  assert.equal(dragReleasePage(0.8, 0.1, -2), 0);
  assert.equal(dragReleasePage(0, 0, 8), 0);
});

test("settling starts toward the target even when a drag or interrupted spring reverses", () => {
  assert.equal(settlingVelocity(0.9, 1, -4), 0);
  assert.equal(settlingVelocity(-0.9, -1, 4), 0);
  assert.equal(settlingVelocity(0.2, 1, -2), 0);
  assert.equal(settlingVelocity(1.1, 1, 2), 0);
  assert.equal(settlingVelocity(1, 1, 4), 0);
});

test("flick speed is bounded and tapers near the center while retaining spring momentum", () => {
  assert.equal(settlingVelocity(0, 1, 100), 8);
  assert.equal(settlingVelocity(0, -1, -100), -8);
  assert.ok(Math.abs(settlingVelocity(0.9, 1, 100) - 2) < 1e-12);
  assert.equal(settlingVelocity(0.2, 1, 3), 3);
});

test("a forward drag cannot lose its nearest page for any release speed across loop positions", () => {
  for (const origin of [-8, -1, 0, 7, 8, 16]) {
    for (const distance of [0.51, 0.7, 0.9, 1, 1.2, 1.51]) {
      for (const velocity of [-100, -8, -1, 0, 1, 8, 100]) {
        assert.ok(dragReleasePage(origin, origin + distance, velocity) >= Math.round(origin + distance));
        assert.ok(dragReleasePage(origin, origin - distance, velocity) <= Math.round(origin - distance));
      }
    }
  }
});
