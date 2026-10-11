"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { ArrowIcon } from "./arrow-icon";
import styles from "./product-carousel.module.css";

type Slide = { name: string; href: string; image: ReactNode; details: ReactNode };
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
};

const spring = { type: "spring", stiffness: 380, damping: 22, mass: 0.8, restDelta: 0.001, restSpeed: 0.01 } as const;
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
  const opacity = useTransform(offset, range, [0, 0, 0.2, 0.62, 1, 0.62, 0.2, 0, 0]);
  const blur = useTransform(offset, range, [7, 7, 4, 1.4, 0, 1.4, 4, 7, 7]);
  const brightness = useTransform(offset, range, [0.82, 0.82, 0.86, 0.93, 1, 0.93, 0.86, 0.82, 0.82]);
  const zIndex = useTransform(offset, (value) => Math.round(10 - Math.abs(value)));
  const transform = useMotionTemplate`translate(-50%, -50%) translateX(calc(${travel} * var(--vial-step))) scale(${scale})`;
  const filter = useMotionTemplate`blur(${blur}px) brightness(${brightness})`;
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
          }
        }}
      >
        <motion.span
          className={styles.vialFrame}
          whileHover={reducedMotion ? undefined : { scale: 1.025 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          transition={controlSpring}
        >
          {slide.image}
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
  const targetPage = useRef(0);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const count = slides.length;

  useEffect(() => () => position.stop(), [position]);
  useEffect(() => {
    if (reducedMotion) position.jump(targetPage.current);
  }, [position, reducedMotion]);

  function settle(page: number, velocity = position.getVelocity()) {
    position.stop();
    targetPage.current = page;
    setActive(modulo(page, count));
    if (reducedMotion) position.jump(page);
    else animate(position, page, { ...spring, velocity });
  }

  function move(direction: -1 | 1) {
    settle(targetPage.current + direction);
  }

  function selectSlide(index: number) {
    settle(targetPage.current + offsetFrom(index, modulo(targetPage.current, count), count));
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
    if (!event.isPrimary || event.button !== 0 || event.target instanceof Element && event.target.closest("button")) return;
    const vial = event.currentTarget.querySelector<HTMLElement>('[data-position="0"]');
    const stepFactor = parseFloat(getComputedStyle(event.currentTarget).getPropertyValue("--step-factor"));
    gesture.current = {
      x: event.clientX, y: event.clientY, pointerId: event.pointerId,
      position: position.get(), step: Math.max(1, (vial?.offsetWidth ?? 300) * stepFactor),
      lastX: event.clientX, lastTime: event.timeStamp, velocity: 0, dragged: false,
    };
  }

  function dragGesture(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const distance = event.clientX - start.x;
    const vertical = Math.abs(event.clientY - start.y);
    if (!start.dragged) {
      if (vertical > 8 && vertical > Math.abs(distance)) {
        gesture.current = null;
        return;
      }
      if (Math.abs(distance) < 6 || Math.abs(distance) <= vertical * 1.15) return;
      start.position = position.get();
      start.dragged = true;
      position.stop();
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const elapsed = event.timeStamp - start.lastTime;
    if (elapsed > 0) start.velocity = (event.clientX - start.lastX) / elapsed * 1000;
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
    if (cancelled) {
      settle(targetPage.current, 0);
      return;
    }
    const velocity = event.timeStamp - start.lastTime < 80 ? -start.velocity / start.step : 0;
    const projection = Math.max(-0.65, Math.min(0.65, velocity * 0.14));
    settle(Math.round(position.get() + projection), velocity);
  }

  return (
    <div className={styles.carousel} role="group" aria-roledescription="carousel" aria-label="Research peptides">
      <div
        id={id}
        className={styles.stage}
        data-dragging={dragging}
        tabIndex={0}
        aria-label="Peptide images"
        aria-describedby={`${id}-hint`}
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
        <motion.button className={`${styles.arrow} ${styles.previous}`} type="button" aria-label="Previous peptide" aria-controls={id} onClick={() => move(-1)} whileHover={reducedMotion ? undefined : { scale: 1.1 }} whileTap={reducedMotion ? undefined : { scale: 0.88 }} transition={controlSpring}>
          <ArrowIcon direction="right" className={styles.previousIcon} />
        </motion.button>
        <motion.button className={`${styles.arrow} ${styles.next}`} type="button" aria-label="Next peptide" aria-controls={id} onClick={() => move(1)} whileHover={reducedMotion ? undefined : { scale: 1.1 }} whileTap={reducedMotion ? undefined : { scale: 0.88 }} transition={controlSpring}>
          <ArrowIcon direction="right" />
        </motion.button>
      </div>
      <div className={styles.pagination} role="group" aria-label="Choose a peptide">
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
      <p className={styles.caption}>
        <span aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
        <span id={`${id}-hint`}>Swipe, drag or use the arrows to explore</span>
      </p>
      <p className={styles.status} role="status">{slides[active].name}, peptide {active + 1} of {count}</p>
    </div>
  );
}
