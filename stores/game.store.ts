import calculateNeededExperience from "@/helpers/calculateNeededExperience"
import { Blessing } from "@/types/blessing.types"
import { GameStore } from "@/types/game.types"
import { Power } from "@/types/power.types"
import { UnitEntity } from "@/types/unit.types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gold: 0,
      changeGold: (amount: number) =>
        set((state) => ({ gold: state.gold + amount })),
      level: 1,
      levelUpRewards: 0,
      changeLevelUpRewards: (amount: number) =>
        set((state) => ({ levelUpRewards: state.levelUpRewards + amount })),
      blessings: [] as Blessing[],
      setBlessings: (blessings?: Blessing[]) =>
        set((state) => {
          if (blessings === undefined || !blessings.length) {
            return { blessings: [] }
          }

          if (!state.blessings.length) {
            return { blessings: [...blessings] }
          }

          return { blessings: state.blessings }
        }),
      changeLevel: (amount: number) =>
        set((state) => ({ level: state.level + amount })),
      changeExperience: (amount: number) =>
        set((state) => {
          let changeAmount = amount

          if (
            state.currentExperience + changeAmount >=
            calculateNeededExperience(state.level)
          ) {
            changeAmount -=
              calculateNeededExperience(state.level) - state.currentExperience
            state.changeLevel(1)
            state.changeLevelUpRewards(1)
            return { currentExperience: changeAmount }
          }
          return { currentExperience: state.currentExperience + changeAmount }
        }),
      currentExperience: 0,
      lastUpdate: new Date(Date.now()).getTime(),
      setLastUpdate: (unix: number) => set(() => ({ lastUpdate: unix })),
      setLastUpdateToNow: () => set(() => ({ lastUpdate: Date.now() })),
      units: [] as UnitEntity[],
      powers: [] as Power[],
      addPower: (power: Power) =>
        set((state) => ({ powers: [...state.powers, power] })),
      compareTimeToNow: () => {
        const dateDifference = (Date.now() - get().lastUpdate) / 1000
        return Math.floor(dateDifference) ?? 1
      },
      getClickValue: () => {
        const powers = get().powers

        return (
          1 +
          powers
            .filter((power) => power.type === "flat")
            .reduce((acc, curr) => {
              return acc + curr.value
            }, 0)
        )
      },
    }),
    {
      name: "game-store",
    }
  )
)
