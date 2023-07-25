import { useRouter } from "next/router"
import React from "react"

export default function Reset() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen w-screen select-none items-center justify-center bg-slate-50 text-slate-800">
      <button
        onClick={() => {
          localStorage.removeItem("game-store")
          router.push("/")
        }}
      >
        Reset
      </button>
    </div>
  )
}
