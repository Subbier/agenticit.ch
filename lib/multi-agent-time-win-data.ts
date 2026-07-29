export const SEG_COLORS = ["#1F9A5E", "#57C7FF", "#57C7FF", "#2BB673", "#F5A623", "#F2667A"] as const

export type WorkSegment = { n: string; d: number; c: string }

export const SEGMENTS: WorkSegment[] = [
  { n: "Recherchieren", d: 14, c: SEG_COLORS[0] },
  { n: "Daten prüfen", d: 8, c: SEG_COLORS[1] },
  { n: "Texten", d: 12, c: SEG_COLORS[2] },
  { n: "Kalkulieren", d: 9, c: SEG_COLORS[3] },
  { n: "Design", d: 11, c: SEG_COLORS[4] },
  { n: "Versenden", d: 6, c: SEG_COLORS[5] },
]

export const SEQ_TOTAL = SEGMENTS.reduce((a, s) => a + s.d, 0)
export const OVERHEAD = 2
export const SCALE = 95

export type AgentLane = { segs: WorkSegment[]; time: number }

/** Greedy LPT: verteile Segmente auf N Lanes (lastausgeglichen). */
export function distributeLanes(n: number): AgentLane[] {
  const lanes: AgentLane[] = Array.from({ length: n }, () => ({ segs: [], time: 0 }))
  ;[...SEGMENTS]
    .sort((a, b) => b.d - a.d)
    .forEach((s) => {
      const lane = lanes.reduce((min, x) => (x.time < min.time ? x : min), lanes[0])
      lane.segs.push(s)
      lane.time += s.d
    })
  return lanes.filter((l) => l.segs.length > 0)
}
