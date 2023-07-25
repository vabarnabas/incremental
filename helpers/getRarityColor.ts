import { Rarity } from "@/types/blessing.types"

export default function getRarityColor(rarity: Rarity) {
  switch (rarity) {
    case "common":
      return "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
    case "uncommon":
      return "bg-green-100 hover:bg-green-200 border-green-200 text-green-700"
    case "rare":
      return "bg-sky-100 hover:bg-sky-200 border-sky-200 text-sky-700"
    case "mythical":
      return "bg-violet-100 hover:bg-violet-200 border-violet-200 text-violet-700"
    case "legendary":
      return "bg-orange-100 hover:bg-orange-200 border-orange-200 text-orange-700"
    case "unique":
      return "bg-amber-100 hover:bg-amber-200 border-amber-200 text-amber-700"
    case "celestial":
      return "bg-teal-100 hover:bg-teal-200 border-teal-200 text-teal-700"
    case "divine":
      return "bg-pink-100 hover:bg-pink-200 border-pink-200 text-pink-700"
    default:
      return "bg-slate-200 hover:bg-slate-300 text-slate-700"
  }
}
