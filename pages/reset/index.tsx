import { useRouter } from "next/router"
import React from "react"

export default function Reset() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen w-screen select-none items-center justify-center bg-[#222] text-gray-100">
      <div className="">
        <button
          onClick={() => {
            localStorage.removeItem("game-store")
            router.push("/")
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
