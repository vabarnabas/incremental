export default function calculateNeededExperience(level: number) {
  return Math.round(
    0.04 * Math.pow(level, 3) + 0.8 * Math.pow(level, 2) + 2 * level
  )
}
