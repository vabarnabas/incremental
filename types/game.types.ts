import { UnitEntity } from "../types/unit.types"
import { Blessing } from "./blessing.types"
import { Power } from "./power.types"

export interface GameStore {
  gold: number
  changeGold: (amount: number) => void
  level: number
  levelUpRewards: number
  changeLevelUpRewards: (amount: number) => void
  blessings: Blessing[]
  setBlessings: (blessings?: Blessing[]) => void
  currentExperience: number
  changeLevel: (amount: number) => void
  changeExperience: (amount: number) => void
  lastUpdate: number
  setLastUpdate: (unix: number) => void
  setLastUpdateToNow: () => void
  units: UnitEntity[]
  powers: Power[]
  addPower: (power: Power) => void
  compareTimeToNow: () => number
  getClickValue: () => number
}
