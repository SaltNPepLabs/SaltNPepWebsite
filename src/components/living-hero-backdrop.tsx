"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";

type Grain = { x: number; y: number; size: number; sprite: number; phase: number; speedX: number; speedY: number; dx: number; dy: number; angle: number; opacity: number; depth: number };

// One slow air current, with small depth-dependent variations rather than independent bobbing.
function makeGrains(phone: boolean): Grain[] {
  let seed = phone ? 8713 : 2917;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const airborne = Array.from({ length: phone ? 180 : 570 }, (_, i) => {
    const side = i % 2;
    // Loose overlapping ribbons, with pockets and gaps rather than an even curtain.
    const u = Math.pow(random(), .72);
    const y = .025 + u * (phone ? .76 : .67);
    const strand = i % 3;
    const sweep = .035 + .15 * u * u;
    const curl = Math.sin(u * 7.2 + side * .7 + strand * .35) * (phone ? .055 : .043);
    const center = sweep + curl + strand * .014;
    const diffuse = i % 7 === 0;
    const spread = (random() + random() + random() - 1.5) * (diffuse ? (phone ? .12 : .09) : (phone ? .055 : .025) + .015 * u);
    const edge = Math.max(.004, Math.min(phone ? .28 : .26, center + spread));
    return { x: side ? 1 - edge : edge, y,
      size: phone ? 4 + Math.pow(random(), 2) * 10 : 2 + Math.pow(random(), 3.5) * 16,
      sprite: Math.floor(random() * 16), phase: random() * Math.PI * 2,
      speedX: (phone ? .095 : .065) + random() * .04, speedY: (phone ? .08 : .055) + random() * .035,
      dx: 11 + random() * (phone ? 9 : 10), dy: (phone ? 10 : 9) + random() * (phone ? 8 : 9),
      angle: random() * 6.28, opacity: .5 + random() * .38, depth: .45 + random() * .55 };
  });

  // Rebuild the former baked-in scatter as independently animated grains too.
  // Wave and floor particles use the same flow, with restrained paths near surfaces.
  const surface = Array.from({ length: phone ? 220 : 700 }, (_, i) => {
    const floor = i % 2 === 0;
    const edge = Math.min(.30, .025 + Math.pow(random(), 2.3) * (floor ? .28 : .20));
    const x = i % 4 < 2 ? edge : 1 - edge;
    const horizon = phone ? .815 : .715;
    const waveTop = (phone ? .64 : .37) + Math.min(1, edge / .27) * (phone ? .175 : .345);
    const y = floor ? horizon + Math.sqrt(random()) * (1 - horizon) : waveTop + random() * Math.max(.005, horizon - waveTop);
    const near = floor && y > .93 && edge < .17;
    return {
      ...airborne[i % airborne.length], x, y,
      size: near ? 3 + Math.pow(random(), 3) * 11 : 1.8 + Math.pow(random(), 3.5) * 9,
      sprite: Math.floor(random() * 16), phase: random() * Math.PI * 2,
      dx: (phone ? 7 : 4) + random() * 6, dy: (phone ? 6 : 3) + random() * 5,
      depth: .45 + random() * .55, opacity: .45 + random() * .35,
    };
  });
  // Phone-only pockets follow the existing curling ribbons: fuller toward the
  // waves, with open gaps between them and no additional foreground label cover.
  const pockets: Grain[] = [];
  if (phone) {
    const anchors = airborne.filter((grain, i) => i % 5 === 0 && grain.y > .22 && grain.y < .76);
    for (const anchor of anchors) {
      const count = anchor.y > .5 ? 5 : 3;
      for (let i = 0; i < count; i++) {
        const x = anchor.x + (random() + random() - 1) * .075;
        pockets.push({
          ...anchor,
          x: anchor.x < .5 ? Math.max(.008, Math.min(.28, x)) : Math.max(.72, Math.min(.992, x)),
          y: anchor.y + (random() + random() - 1) * .045,
          size: 3.8 + Math.pow(random(), 1.6) * 7,
          sprite: Math.floor(random() * 16),
          phase: anchor.phase + (random() - .5) * .6,
          angle: random() * Math.PI * 2,
          opacity: .58 + random() * .28,
          depth: .55 + random() * .4,
        });
      }
    }
  }
  return [...airborne, ...surface, ...pockets];
}

/** A stationary scene plate plus independently moving photographic grain sprites. */
export function LivingHeroBackdrop({ className, foreground = false, position }: { className: string; foreground?: boolean; position?: MotionValue<number> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: foreground });
    if (!ctx) return;
    const mobile = matchMedia("(max-width: 760px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let plate: HTMLImageElement, atlas: HTMLImageElement;
    let grains: Grain[] = [], ready = false, disposed = false, inView = true;
    let frame = 0, last = 0, seconds = 0, version = 0, width = 1, height = 1, ratio = 1;
    let parallax = 0;
    const unsubscribe = position?.on("change", value => { parallax = Math.sin(value * .55) * .7; });
    const draw = () => {
      if (!ready) return;
      const scale = Math.max(width / plate.width, height / plate.height);
      const pw = plate.width * scale, ph = plate.height * scale;
      const ox = (width - pw) / 2, oy = (height - ph) / 2;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.globalAlpha = 1;
      if (foreground) ctx.clearRect(0, 0, width, height);
      else ctx.drawImage(plate, ox, oy, pw, ph);
      const cellW = atlas.width / 4, cellH = atlas.height / 4;
      for (const grain of grains) {
        const t = reduced.matches ? 0 : seconds;
        // Long, independently phased paths keep grains visibly weightless without rapid bobbing.
        const flowX = Math.sin(t * .035) * 4 + Math.sin(t * .013) * 1.5;
        const flowY = Math.sin(t * .027) * 2;
        const localX = (Math.sin(t * grain.speedX + grain.phase) - Math.sin(grain.phase)) * grain.dx;
        const localY = (Math.cos(t * grain.speedY + grain.phase) - Math.cos(grain.phase)) * grain.dy;
        const x = grain.x * width + (flowX + localX) * grain.depth + (foreground && !reduced.matches ? parallax : 0);
        const y = (foreground ? grain.y * height : oy + grain.y * ph) + (flowY + localY) * grain.depth;
        // Phone grains need enough pixels for their photographic facets to read.
        const size = foreground ? grain.size : grain.size * (mobile.matches ? Math.min(1.15, Math.max(.95, pw / 480)) : Math.min(1.25, pw / 1500));
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(grain.angle + Math.sin(t * .035 + grain.phase) * .09);
        ctx.globalAlpha = grain.opacity;
        ctx.drawImage(atlas, (grain.sprite % 4) * cellW, Math.floor(grain.sprite / 4) * cellH, cellW, cellH, -size / 2, -size / 2, size, size);
        ctx.restore();
      }
      canvas.style.opacity = "1";
    };
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width; height = box.height;
      ratio = Math.min(devicePixelRatio || 1, mobile.matches ? 1.5 : 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      draw();
    };
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - last < 1000 / 30) return;
      seconds += last ? Math.min((now - last) / 1000, .1) : 0;
      last = now; draw();
    };
    const sync = () => {
      cancelAnimationFrame(frame); last = 0;
      if (ready) draw();
      if (ready && !disposed && inView && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const image = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = src;
    });
    const load = async () => {
      const request = ++version;
      ready = false; canvas.style.opacity = "0"; sync();
      try {
        const images = await Promise.all([image(`/images/hero-clean-${mobile.matches ? "mobile" : "desktop"}.webp`), image("/images/hero-grain-atlas.webp")]);
        if (disposed || request !== version) return;
        [plate, atlas] = images;
        grains = makeGrains(mobile.matches);
        if (foreground) {
          // Sparse near-plane grains above shoulders / below glass bases, never label rows.
          const points = mobile.matches ? [[.32,.17],[.72,.87],[.14,.12]] : [[.37,.16],[.65,.19],[.29,.88],[.72,.86],[.16,.20]];
          grains = points.map(([x,y], i) => ({ ...grains[i], x, y, size: 2.2 + i * .3, depth: .8 + i * .06, dx: 2.5, dy: 2, opacity: .32 }));
        }
        seconds = 0; ready = true; resize(); sync();
      } catch { /* Clean scene remains visible if an animation asset cannot load. */ }
    };
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }); visibility.observe(canvas);
    mobile.addEventListener("change", load); reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    void load();
    return () => {
      disposed = true; version++; cancelAnimationFrame(frame); unsubscribe?.();
      observer.disconnect(); visibility.disconnect();
      mobile.removeEventListener("change", load); reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [foreground, position]);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
