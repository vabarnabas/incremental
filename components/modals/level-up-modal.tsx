import clsx from "clsx"
import React, { useEffect } from "react"

import getRarityColor from "@/helpers/getRarityColor"
import useGameAssets from "@/hooks/useGameAssets"
import { useGameStore } from "@/stores/game.store"
import useModalStore from "@/stores/modal.store"

import BaseModal from "../base-modal/base-modal"

export default function LevelUpModal() {
  const { closeModal } = useModalStore()
  const { generateLevelUpRewards } = useGameAssets()
  const {
    setBlessings,
    blessings,
    level,
    changeGold,
    changeLevelUpRewards,
    levelUpRewards,
  } = useGameStore()

  useEffect(() => {
    const blessings = generateLevelUpRewards(level)
    setBlessings(blessings)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _tailwind = [
    "bg-slate-200",
    "hover:bg-slate-300",
    "border-slate-200",
    "text-slate-600",
    "bg-green-100",
    "hover:bg-green-200",
    "border-green-200",
    "text-green-600",
    "bg-sky-100",
    "hover:bg-sky-200",
    "border-sky-200",
    "text-sky-600",
    "bg-violet-100",
    "hover:bg-violet-200",
    "border-violet-200",
    "text-violet-600",
    "bg-orange-100",
    "hover:bg-orange-200",
    "border-orange-200",
    "text-orange-600",
    "bg-amber-100",
    "hover:bg-amber-200",
    "border-amber-200",
    "text-amber-600",
    "bg-teal-100",
    "hover:bg-teal-200",
    "border-teal-200",
    "text-teal-600",
    "bg-pink-100",
    "hover:bg-pink-200",
    "border-pink-200",
    "text-pink-600",
  ]

  return (
    <BaseModal
      title={`Select Blessings (${levelUpRewards} left)`}
      isOpen={true}
      onClose={() => {}}
    >
      <div className="mt-4 flex w-full flex-col gap-y-3">
        {blessings.map((blessing, idx) => (
          <div
            key={`${blessing.name}-${idx}`}
            onClick={async () => {
              blessing.onSelect(level)
              changeLevelUpRewards(-1)
              setBlessings()
              if (levelUpRewards === 1) {
                closeModal()
              } else {
                setBlessings(generateLevelUpRewards(level))
              }
            }}
            className={clsx(
              getRarityColor(blessing.rarity),
              "px-2 py-2 rounded-lg cursor-pointer border"
            )}
          >
            <div className="flex items-center justify-between">
              <p className="">{blessing.name}</p>
              <p className="capitalize">{blessing.rarity}</p>
            </div>
            <p className="mt-2 text-sm opacity-70">{blessing.description}</p>
          </div>
        ))}
        <button
          onClick={() => {
            changeGold(level * 25)
            changeLevelUpRewards(-1)
            setBlessings()
            if (levelUpRewards === 1) {
              closeModal()
            } else {
              setBlessings(generateLevelUpRewards(level))
            }
          }}
          className="bg-emerald-500 hover:bg-emerald-600 rounded-full py-1.5 text-slate-50"
        >{`Or take ${level * 25} gold`}</button>
      </div>
    </BaseModal>
  )
}
