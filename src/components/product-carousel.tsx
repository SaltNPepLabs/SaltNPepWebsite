"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { dragReleasePage, settlingVelocity } from "@/lib/carousel-motion";
import { LivingHeroBackdrop } from "./living-hero-backdrop";
import { ArrowIcon } from "./arrow-icon";
import styles from "./product-carousel.module.css";
import { track } from "@/lib/analytics";
import { catalogSlug } from "@/lib/catalog-naming";

type Slide = { materialMask?: string; name: string; href: string; image: ReactNode; details: ReactNode };
type Gesture = {
  x: number;
  y: number;
  pointerId: number;
  position: number;
  step: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  dragged: boolean;
  touch: boolean;
  intendedPage: number;
};

const spring = { type: "spring", stiffness: 380, damping: 22, mass: 0.8, restDelta: 0.001, restSpeed: 0.01 } as const;
const swipeSpring = { ...spring, stiffness: 420, damping: 22 } as const;
const controlSpring = { type: "spring", stiffness: 500, damping: 24, mass: 0.6 } as const;
const modulo = (value: number, count: number) => ((value % count) + count) % count;
const offsetFrom = (index: number, page: number, count: number) => modulo(index - page + count / 2, count) - count / 2;

function CarouselSlide({ slide, index, count, active, position, reducedMotion, onSelect }: {
  slide: Slide;
  index: number;
  count: number;
  active: number;
  position: MotionValue<number>;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
}) {
  // One continuous position keeps every vial together, including across the loop.
  const offset = useTransform(position, (value) => offsetFrom(index, value, count));
  const range = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const travel = useTransform(offset, range, [-2.2, -2, -1.6, -1, 0, 1, 1.6, 2, 2.2]);
  const scale = useTransform(offset, range, [0.4, 0.45, 0.58, 0.78, 1, 0.78, 0.58, 0.45, 0.4]);
  const opacity = useTransform(offset, range, [0, 0, 1, 1, 1, 1, 1, 0, 0]);
  const blur = useTransform(offset, range, [7, 7, 4, 1.4, 0, 1.4, 4, 7, 7]);
  const brightness = useTransform(offset, range, [0.82, 0.82, 0.86, 0.93, 1, 0.93, 0.86, 0.82, 0.82]);
  const zIndex = useTransform(offset, (value) => Math.round(10 - Math.abs(value)));
  const transform = useMotionTemplate`translate(-50%, -50%) translateX(calc(${travel} * var(--vial-step))) scale(${scale})`;
  const filter = useMotionTemplate`blur(${blur}px) brightness(${brightness})`;
  // Reflections follow world position rather than moving as a fixed studio highlight.
  // No additional timer or React render is needed: the existing spring drives them.
  const reflectionPosition = useTransform(offset, value => `${50 + Math.max(-2, Math.min(2, value)) * 5}% 62%`);
  const fillStrength = useTransform(offset, [-2, 0, 2], [.30, .19, .08]);
  const keyStrength = useTransform(offset, [-2, 0, 2], [.07, .13, .21]);
  const reflectionStrength = useTransform(offset, [-2, 0, 2], [.16, .23, .26]);
  const targetOffset = offsetFrom(index, active, count);
  const visible = Math.abs(targetOffset) <= 2;

  return (
    <motion.div
      className={styles.slide}
      style={{ transform, opacity, filter, zIndex }}
      data-position={visible ? targetOffset : "hidden"}
      role="group"
      aria-roledescription="slide"
      aria-label={`${slide.name}, ${index + 1} of ${count}`}
      aria-hidden={!visible}
    >
      <Link
        className={styles.imageLink}
        href={slide.href}
        aria-label={`View ${slide.name} product`}
        tabIndex={index === active ? 0 : -1}
        draggable={false}
        onClick={(event) => {
          if (index !== active) {
            event.preventDefault();
            onSelect(index);
          } else if (!event.defaultPrevented) track("carousel_product_opened", { product_slug: catalogSlug(slide.href.split("/").pop() || "") });
        }}
      >
        <motion.span
          className={styles.vialFrame}
          whileHover={reducedMotion ? undefined : { scale: 1.025 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          transition={controlSpring}
        >
          {slide.image}
          {slide.materialMask && <span className={styles.materialShell} aria-hidden="true" style={{ maskImage: `url("${slide.materialMask}")`, WebkitMaskImage: `url("${slide.materialMask}")` }}>
            <span className={styles.materialWindow}>
              <motion.span className={styles.sceneReflection} style={{ backgroundPosition: reflectionPosition, opacity: reflectionStrength }} />
              <motion.span className={styles.negativeFill} style={{ opacity: fillStrength }} />
              <motion.span className={styles.champagneKey} style={{ opacity: keyStrength }} />
            </span>
          </span>}
        </motion.span>
      </Link>
    </motion.div>
  );
}

export function ProductCarousel({ slides }: { slides: Slide[] }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const position = useMotionValue(0);
  const reducedMotion = useReducedMotion() === true;
  // Bounded continuous offsets follow the same spring as the vials, without loop seams.
  const targetPage = useRef(0);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const count = slides.length;
  const settleVersion = useRef(0);

  useEffect(() => () => position.stop(), [position]);
  useEffect(() => {
    if (reducedMotion) position.jump(targetPage.current);
  }, [position, reducedMotion]);

  function settle(page: number, velocity = position.getVelocity(), method?: "drag" | "arrow" | "selector") {
    const version = ++settleVersion.current;
    const completed = () => {
      if (method && version === settleVersion.current) track("carousel_interaction", { method, product_slug: catalogSlug(slides[modulo(page, count)].href.split("/").pop() || "") });
    };
    const releaseVelocity = settlingVelocity(position.get(), page, velocity);
    position.stop();
    targetPage.current = page;
    setActive(modulo(page, count));
    if (reducedMotion) { position.jump(page); completed(); }
    else animate(position, page, { ...(method === "drag" ? swipeSpring : spring), velocity: releaseVelocity, onComplete: completed });
  }

  function move(direction: -1 | 1) {
    settle(targetPage.current + direction, undefined, "arrow");
  }

  function selectSlide(index: number) {
    settle(targetPage.current + offsetFrom(index, modulo(targetPage.current, count), count), undefined, "selector");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
    switch (event.key) {
      case "ArrowLeft": event.preventDefault(); move(-1); break;
      case "ArrowRight": event.preventDefault(); move(1); break;
      case "Home": event.preventDefault(); selectSlide(0); break;
      case "End": event.preventDefault(); selectSlide(count - 1); break;
    }
  }

  function startGesture(event: PointerEvent<HTMLDivElement>) {
    suppressClick.current = false;
    if (!event.isPrimary || event.button !== 0) return;
    // A thumb often starts over the right arrow. Let touch gestures begin
    // there too; a real drag suppresses the click, while a tap still navigates.
    if (event.pointerType === "mouse" && event.target instanceof Element && event.target.closest("button")) return;
    const vial = event.currentTarget.querySelector<HTMLElement>('[data-position="0"]');
    const stepFactor = parseFloat(getComputedStyle(event.currentTarget).getPropertyValue("--step-factor"));
    gesture.current = {
      x: event.clientX, y: event.clientY, pointerId: event.pointerId,
      position: position.get(), intendedPage: targetPage.current, step: Math.max(1, (vial?.offsetWidth ?? 300) * stepFactor),
      lastX: event.clientX, lastTime: event.timeStamp, velocity: 0, dragged: false, touch: event.pointerType !== "mouse",
    };
  }

  function dragGesture(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const distance = event.clientX - start.x;
    const vertical = Math.abs(event.clientY - start.y);
    if (!start.dragged) {
      if (vertical > 8 && vertical > Math.abs(distance) * 1.25) {
        gesture.current = null;
        return;
      }
      if (Math.abs(distance) < 6 || Math.abs(distance) <= vertical) return;
      start.position = position.get();
      start.dragged = true;
      settleVersion.current++;
      position.stop();
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const elapsed = event.timeStamp - start.lastTime;
    if (elapsed > 0) {
      const sample = (event.clientX - start.lastX) / elapsed * 1000;
      start.velocity = elapsed > 100 ? sample : start.velocity * 0.35 + sample * 0.65;
    }
    start.lastX = event.clientX;
    start.lastTime = event.timeStamp;
    position.set(start.position - distance / start.step);
  }

  function endGesture(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    suppressClick.current = start.dragged;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!start.dragged) return;
    // Fast swipes can end between move samples. Include the final position
    // instead of snapping from an outdated frame. Cancellation coordinates
    // are unreliable, so keep the last actual drag position in that case.
    if (!cancelled) position.set(start.position - (event.clientX - start.x) / start.step);
    // Browser gesture takeover / capture loss must not undo a committed drag.
    // Settle from the distance already travelled, without adding momentum.
    const velocity = !cancelled && event.timeStamp - start.lastTime < 80 ? -start.velocity / start.step : 0;
    settle(dragReleasePage(start.position, position.get(), velocity, start.touch ? 0.18 : 0.5, start.intendedPage), velocity, "drag");
  }

  return (
    <div className={styles.carousel} role="group" aria-roledescription="carousel" aria-label="Research compounds">
      <div
        id={id}
        className={styles.stage}
        data-dragging={dragging}
        tabIndex={0}
        aria-label="Compound images"
        onKeyDown={handleKeyDown}
        onPointerDown={startGesture}
        onPointerMove={dragGesture}
        onPointerUp={(event) => endGesture(event)}
        onPointerCancel={(event) => endGesture(event, true)}
        onLostPointerCapture={(event) => {
          // Touch starts captured by the vial; transferring it to the stage
          // bubbles a child capture-loss event that must not cancel the drag.
          if (event.target === event.currentTarget) endGesture(event, true);
        }}
        onClickCapture={(event) => {
          if (!suppressClick.current || event.detail === 0) return;
          suppressClick.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {slides.map((slide, index) => (
          <CarouselSlide key={slide.name} slide={slide} index={index} count={count} active={active} position={position} reducedMotion={reducedMotion} onSelect={selectSlide} />
        ))}
        <LivingHeroBackdrop className={styles.edgeAtmosphere} foreground position={position} />
        <motion.button className={`${styles.arrow} ${styles.previous}`} type="button" aria-label="Previous compound" aria-controls={id} onClick={() => move(-1)} whileHover={reducedMotion ? undefined : { scale: 1.1 }} whileTap={reducedMotion ? undefined : { scale: 0.88 }} transition={controlSpring}>
          <ArrowIcon direction="right" className={styles.previousIcon} />
        </motion.button>
        <motion.button className={`${styles.arrow} ${styles.next}`} type="button" aria-label="Next compound" aria-controls={id} onClick={() => move(1)} whileHover={reducedMotion ? undefined : { scale: 1.1 }} whileTap={reducedMotion ? undefined : { scale: 0.88 }} transition={controlSpring}>
          <ArrowIcon direction="right" />
        </motion.button>
      </div>
      <div className={styles.pagination} role="group" aria-label="Choose a compound">
        {slides.map((slide, index) => (
          <motion.button key={slide.name} type="button" aria-label={`Show ${slide.name}`} aria-controls={id} aria-pressed={index === active} onClick={() => selectSlide(index)} whileTap={reducedMotion ? undefined : { scale: 0.85 }} transition={controlSpring}>
            <motion.span initial={false} animate={{ width: index === active ? 24 : 5 }} transition={reducedMotion ? { duration: 0 } : controlSpring} />
          </motion.button>
        ))}
      </div>
      <div className={styles.details}>
        <motion.div key={active} initial={reducedMotion ? false : { opacity: 0.5, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={reducedMotion ? { duration: 0 } : controlSpring}>
          {slides[active].details}
        </motion.div>
      </div>
      <p className={styles.status} role="status">{slides[active].name}, compound {active + 1} of {count}</p>
    </div>
  );
}
