export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "mythical"
  | "legendary"
  | "unique"
  | "celestial"
  | "divine"

export interface Blessing {
  name: string
  description: string
  rarity: Rarity
  levelRequirement: number
  onSelect: (level?: number) => void
}
