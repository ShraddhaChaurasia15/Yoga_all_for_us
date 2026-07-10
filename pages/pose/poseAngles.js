// pose-angles.js
// Vanilla-JS port of the original @/lib/angles helpers.

/**
 * Returns the interior angle (in degrees) at point `b`, formed by
 * the rays b->a and b->c. Points are {x, y} pixel coordinates.
 */
export function angleAt(a, b, c) {
  const abx = a.x - b.x, aby = a.y - b.y;
  const cbx = c.x - b.x, cby = c.y - b.y;

  const magAB = Math.hypot(abx, aby);
  const magCB = Math.hypot(cbx, cby);
  if (magAB === 0 || magCB === 0) return 0;

  let cos = (abx * cbx + aby * cby) / (magAB * magCB);
  cos = Math.min(1, Math.max(-1, cos)); // clamp for float safety
  return (Math.acos(cos) * 180) / Math.PI;
}

/**
 * Scores how close a set of measured joint angles is to a pose's
 * target angles, within a tolerance (in degrees). Returns 0-100.
 *
 * measured:  { leftElbow: 172, rightKnee: 90, ... }
 * target:    { leftElbow: 180, rightKnee: 90, ... }
 * tolerance: number of degrees of slack before score hits 0 for a joint
 */
export function scoreAngles(measured, target, tolerance) {
  const keys = Object.keys(target);
  if (keys.length === 0) return 0;

  let total = 0;
  for (const k of keys) {
    const diff = Math.abs((measured[k] ?? 0) - target[k]);
    const per = Math.max(0, 100 - (diff / tolerance) * 100);
    total += per;
  }
  return Math.round(total / keys.length);
}