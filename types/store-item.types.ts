import { Rarity } from "./blessing.types"

export interface StoreItem {
  name: string
  rarity: Rarity
  icon: JSX.Element
  levelRequirement: number
  cost: (level: number) => number
  onSelect: (level?: number) => void
}
