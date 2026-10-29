export type Pose = {
  x: number
  y: number
  z: number
  tx: number
  ty: number
  tz: number
}

export const CALLS = [
  { id: 'heat', label: 'No heat', time: '2:14 AM' },
  { id: 'ac', label: 'AC emergency', time: '1:58 AM' },
  { id: 'leak', label: 'Water leak', time: '1:41 AM' },
] as const

export type CallId = (typeof CALLS)[number]['id']

const KEYS: { t: number; pose: Pose }[] = [
  { t: 0, pose: { x: 6.6, y: 2.8, z: 9.2, tx: 0.15, ty: 1.85, tz: 0.2 } },
  { t: 0.18, pose: { x: 5.6, y: 2.7, z: 7.4, tx: 0.1, ty: 1.8, tz: 0 } },
  { t: 0.38, pose: { x: 2.2, y: 2.15, z: 3.6, tx: 0.55, ty: 1.85, tz: 0.15 } },
  { t: 0.58, pose: { x: 0.35, y: 1.95, z: 1.05, tx: -0.9, ty: 1.65, tz: -0.35 } },
  { t: 0.8, pose: { x: 7.2, y: 2.4, z: 6.4, tx: 5.4, ty: 0.75, tz: 3.1 } },
  { t: 1, pose: { x: 10.2, y: 4.1, z: 11.4, tx: 1.2, ty: 1.5, tz: 0.6 } },
]

const CALL_LOOK: Record<CallId, { tx: number; ty: number; tz: number }> = {
  heat: { tx: 0.4, ty: 1.85, tz: 1.9 },
  ac: { tx: -0.6, ty: 3.4, tz: -0.4 },
  leak: { tx: 0.2, ty: 0.55, tz: -0.8 },
}

export function clamp01(n: number) {
  return n < 0 ? 0 : n > 1 ? 1 : n
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function poseAt(t: number, call: CallId): Pose {
  const p = clamp01(t)
  let i = 0
  while (i < KEYS.length - 2 && p > KEYS[i + 1].t) i += 1
  const a = KEYS[i]
  const b = KEYS[i + 1]
  const u = (p - a.t) / (b.t - a.t)
  const look = CALL_LOOK[call]
  const mix = p < 0.12 ? 0 : p > 0.72 ? 0 : Math.min(1, (p - 0.12) / 0.18)
  return {
    x: lerp(a.pose.x, b.pose.x, u),
    y: lerp(a.pose.y, b.pose.y, u),
    z: lerp(a.pose.z, b.pose.z, u),
    tx: lerp(lerp(a.pose.tx, b.pose.tx, u), look.tx, mix * 0.35),
    ty: lerp(lerp(a.pose.ty, b.pose.ty, u), look.ty, mix * 0.35),
    tz: lerp(lerp(a.pose.tz, b.pose.tz, u), look.tz, mix * 0.35),
  }
}

export function beatAt(t: number) {
  if (t < 0.28) return 0
  if (t < 0.58) return 1
  return 2
}

export const sceneState = {
  progress: 0,
  call: 'heat' as CallId,
  reduced: false,
}

// ponytail: five linear camera segments. Upgrade: a spline through the rooms.
if (import.meta.env.DEV) {
  const p0 = poseAt(0, 'heat')
  const p1 = poseAt(1, 'heat')
  console.assert(p0.z > 8, 'hero camera should start wide')
  console.assert(p1.x > 8, 'end camera should pull back')
}
