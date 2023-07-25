import React from "react"

import useModalStore from "@/stores/modal.store"

import LevelUpModal from "../modals/level-up-modal"

export default function ModalHandler() {
  const { currentModal } = useModalStore()

  if (currentModal.modal === "level-up") return <LevelUpModal />

  return null
}
