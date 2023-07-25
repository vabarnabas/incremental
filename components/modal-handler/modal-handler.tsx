import React from "react"
import LevelUpModal from "../modals/level-up-modal"
import useModalStore from "@/stores/modal.store"

export default function ModalHandler() {
  const { currentModal } = useModalStore()

  if (currentModal.modal === "level-up") return <LevelUpModal />

  return null
}
