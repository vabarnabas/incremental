import { useToast } from "@/providers/toast.provider"
import { useGameStore } from "@/stores/game.store"
import { useEffect } from "react"

export default function useGameLoop() {
  const { changeGold, setLastUpdateToNow, compareTimeToNow } = useGameStore()
  const { createToast } = useToast()

  useEffect(() => {
    const timeElapsed = compareTimeToNow()
    setLastUpdateToNow()
    if (timeElapsed > 5) {
      changeGold(timeElapsed)
      console.log(`You have received ${timeElapsed} gold.`)
      createToast({
        title: `You have received ${timeElapsed} gold.`,
        type: "success",
        expiration: 5000,
      })
    }

    const interval = setInterval(() => {
      setLastUpdateToNow()
      changeGold(0)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
}
