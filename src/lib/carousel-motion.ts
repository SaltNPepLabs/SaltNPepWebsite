/** Keep a crossed midpoint when the last pointer sample briefly reverses. */
export function dragReleasePage(start: number, position: number, velocity: number) {
  const nearest = Math.round(position) || 0;
  // Momentum helps a short flick cross the midpoint; it must not skip a vial
  // once the pointer has already dragged into that vial's snapping region.
  if (nearest !== Math.round(start)) return nearest;
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
