import { useGameStore } from "@/stores/game.store"
import { Blessing } from "@/types/blessing.types"
import { Power } from "@/types/power.types"
import { StoreItem } from "@/types/store-item.types"
import { BsGiftFill } from "react-icons/bs"

export default function useGameAssets() {
  const { addPower, changeGold, changeLevelUpRewards } = useGameStore()

  const powers: Power[] = [
    { name: "Boost Level 1", slug: "boost-1", type: "flat", value: 1 },
    { name: "Boost Level 2", slug: "boost-2", type: "flat", value: 2 },
    { name: "Boost Level 3", slug: "boost-3", type: "flat", value: 3 },
    { name: "Boost Level 4", slug: "boost-4", type: "flat", value: 6 },
    { name: "Boost Level 5", slug: "boost-5", type: "flat", value: 8 },
    { name: "Boost Level 6", slug: "boost-6", type: "flat", value: 12 },
    { name: "Boost Level 7", slug: "boost-7", type: "flat", value: 17 },
  ]

  function getPowerBySlug(slug: string) {
    return powers.find((power) => power.slug === slug) as Power
  }

  const blessings: Blessing[] = [
    {
      name: "Basic Boost",
      description:
        "A humble start to your journey. Gives a small boost to your clicks.",
      levelRequirement: 0,
      rarity: "common",
      onSelect: () => {
        addPower(getPowerBySlug("boost-1"))
      },
    },
    {
      name: "Improved Boost",
      description:
        "Things are picking up! Clicks become more effective with this upgrade.",
      levelRequirement: 9,
      rarity: "uncommon",
      onSelect: () => {
        addPower(getPowerBySlug("boost-2"))
      },
    },
    {
      name: "Better Boost",
      description:
        "Seeing progress! Clicks get even stronger, accelerating your growth.",
      levelRequirement: 19,
      rarity: "rare",
      onSelect: () => {
        addPower(getPowerBySlug("boost-3"))
      },
    },
    {
      name: "Advanced Amplification",
      description:
        "Harnessing advanced techniques, your clicks pack a more potent punch.",
      levelRequirement: 34,
      rarity: "mythical",
      onSelect: () => {
        addPower(getPowerBySlug("boost-4"))
      },
    },
    {
      name: "Power Surge",
      description: "A sudden surge of power boosts your clicks to new heights.",
      levelRequirement: 44,
      rarity: "legendary",
      onSelect: () => {
        addPower(getPowerBySlug("boost-5"))
      },
    },
    {
      name: "Initiate Impact",
      description:
        "Unleash an infinite energy source to amplify your clicking exponentially.",
      levelRequirement: 44,
      rarity: "unique",
      onSelect: () => {
        addPower(getPowerBySlug("boost-6"))
      },
    },
    {
      name: "Small Fortune",
      description: `Gives you some gold.`,
      levelRequirement: 0,
      rarity: "uncommon",
      onSelect: (level?: number) => {
        if (level) {
          changeGold(level * 30)
        }
      },
    },
    {
      name: "Bigger Fortune",
      description: `Gives you a slightly more gold.`,
      levelRequirement: 7,
      rarity: "uncommon",
      onSelect: (level?: number) => {
        if (level) {
          changeGold(level * 35)
        }
      },
    },
  ]

  const storeItems: StoreItem[] = [
    {
      name: "Blessing",
      levelRequirement: 19,
      onSelect: (level?: number) => {
        if (level) {
          changeGold(-(level * 200))
          changeLevelUpRewards(1)
        }
      },

      cost: (level: number) => {
        return level * 200
      },
      icon: <BsGiftFill />,
      rarity: "rare",
    },
  ]

  function generateLevelUpRewards(level: number) {
    const eligibleBlessing = blessings
      .filter((blessing) => level >= blessing.levelRequirement)
      .sort((a, b) => 0.5 - Math.random())

    return eligibleBlessing.slice(0, 3)
  }

  return {
    blessings,
    powers,
    getPowerBySlug,
    generateLevelUpRewards,
    storeItems,
  }
}
