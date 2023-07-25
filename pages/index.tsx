import clsx from "clsx"
import { BsFillGiftFill } from "react-icons/bs"

import ModalHandler from "@/components/modal-handler/modal-handler"
import Toast from "@/components/toast/toast"
import ToastHandler from "@/components/toast-handler/toast-handler"
import ZustandHydration from "@/components/zustand-hydration/zustand-hydration"
import calculateNeededExperience from "@/helpers/calculateNeededExperience"
import getRarityColor from "@/helpers/getRarityColor"
import useGameAssets from "@/hooks/useGameAssets"
import useGameLoop from "@/hooks/useGameLoop"
import { useGameStore } from "@/stores/game.store"
import useModalStore from "@/stores/modal.store"

export default function Home() {
  const {
    level,
    gold,
    changeGold,
    currentExperience,
    changeExperience,
    levelUpRewards,
    getClickValue,
  } = useGameStore()
  const { storeItems } = useGameAssets()
  const { openModal } = useModalStore()

  useGameLoop()

  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  })

  return (
    <ZustandHydration>
      <div className="w-screen min-h-screen flex justify-center items-center bg-slate-50 text-slate-800 select-none">
        {levelUpRewards ? (
          <div
            onClick={() => openModal({ modal: "level-up" })}
            className="transition-all duration-200 fixed bottom-6 left-4 md:left-12"
          >
            <div className="relative bg-rose-50 shadow-md border border-rose-500 cursor-pointer p-3 rounded-full">
              <BsFillGiftFill />
              <div className="absolute -right-1 -top-1 text-xs bg-rose-500 p-1 rounded-full h-5 w-5 text-white flex justify-center items-center">
                {levelUpRewards}
              </div>
            </div>
          </div>
        ) : null}
        {level >= 19 ? (
          <div className="fixed w-72 h-full right-0 py-6 flex flex-col items-center px-4">
            <p className="text-2xl">Store</p>
            <div className="w-full flex flex-col gap-y-3 mt-6">
              {storeItems.map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  onClick={async () => {
                    gold >= item.cost(level) && item.onSelect(level)
                  }}
                  className={clsx(
                    getRarityColor(item.rarity),
                    "px-2 py-2 rounded-lg cursor-pointer border flex gap-x-4 items-center"
                  )}
                >
                  <p className="text-3xl opacity-70">{item.icon}</p>
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p className="">{item.name}</p>
                      <p className="capitalize">{item.rarity}</p>
                    </div>
                    <p
                      className={clsx(
                        "text-sm opacity-70",
                        gold >= item.cost(level)
                          ? "text-emerald-500"
                          : "text-rose-500"
                      )}
                    >
                      {formatter.format(item.cost(level))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="fixed top-0 h-16 inset-x-0 flex justify-center items-center flex-col">
          <div className="flex items-center gap-x-3">
            <p className="mb-0.5 text-xl">{`Level ${level}`}</p>
          </div>
          <div className="relative w-52 h-4 rounded-full bg-slate-200 flex items-center justify-center">
            <div
              style={{
                width: `${
                  (currentExperience / calculateNeededExperience(level)) * 100
                }%`,
              }}
              className="absolute h-full flex bg-amber-500 rounded-full inset-0 transition-all duration-100 ease-in-out"
            />
            <p className="absolute text-white text-xs">{currentExperience}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-amber-500 font-semibold text-6xl">{`${formatter.format(
            gold
          )}`}</p>
          <button
            className="px-4 py-1.5 text-white bg-emerald-500 hover:bg-emerald-600 font-semibold rounded-full text-sm mt-4"
            onClick={() => {
              changeGold(getClickValue())
              changeExperience(getClickValue())
            }}
          >
            Increase Gold
          </button>
          <p className="text-xs mt-1 opacity-70">{`Gold per click: ${getClickValue()}`}</p>
        </div>

        <ModalHandler />
        <ToastHandler position="topRight" toastComponent={Toast} />
      </div>
    </ZustandHydration>
  )
}
