/** Keep a crossed midpoint when the last pointer sample briefly reverses. */
export function dragReleasePage(start: number, position: number, velocity: number, swipeThreshold = 0.5, intendedPage = Math.round(start)) {
  // A second swipe starts from the visible position but advances from the
  // destination already selected by the first swipe, even before it settles.
  if (intendedPage !== Math.round(start)) {
    const distance = position - start;
    const projection = Math.max(-0.65, Math.min(0.65, velocity * 0.14));
    const committed = Math.abs(distance) >= swipeThreshold ||
      (distance * projection > 0 && Math.abs(distance + projection) >= 0.5);
    if (!committed) return intendedPage;
    return distance > 0
      ? Math.max(Math.round(position), intendedPage + 1)
      : Math.min(Math.round(position), intendedPage - 1);
  }
  const nearest = Math.round(position) || 0;
  // Momentum helps a short flick cross the midpoint; it must not skip a vial
  // once the pointer has already dragged into that vial's snapping region.
  if (nearest !== Math.round(start)) return nearest;
  // Touch gestures commit after a modest travel, even if the finger pauses.
  // Tiny accidental nudges still return to the current vial.
  const distance = position - start;
  if (Math.abs(distance) >= swipeThreshold) {
    return Math.round(start) + Math.sign(distance);
  }
  const projection = Math.max(-0.65, Math.min(0.65, velocity * 0.14));
  const projected = Math.round(position + projection) || 0;
  if (position > start) return Math.max(nearest, projected);
  if (position < start) return Math.min(nearest, projected);
  return nearest;
}

/** Carry momentum toward the destination without a reverse kick or runaway flick. */
export function settlingVelocity(position: number, target: number, velocity: number) {
  const remaining = target - position;
  if (remaining * velocity <= 0) return 0;
  return Math.sign(remaining) * Math.min(Math.abs(velocity), Math.abs(remaining) * 20, 8);
}
