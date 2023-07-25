import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

import Spinner from "../spinner/spinner"

interface Props {
  title?: string
  children: JSX.Element
  isOpen: boolean
  onClose: () => void
  className?: string
  isFetching?: boolean
}

export default function BaseModal({
  children,
  isOpen,
  onClose,
  title,
  isFetching,
}: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 select-none text-slate-800 scrollbar-hide"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-4 w-full max-w-md transform rounded-2xl bg-slate-50 p-4 text-left align-middle shadow-xl  transition-all scrollbar-hide">
                {title ? (
                  <Dialog.Title>
                    <p className="text-2xl font-bold">{title}</p>
                  </Dialog.Title>
                ) : null}
                <div className="flex h-full min-h-[80px] w-full scrollbar-hide">
                  {!isFetching ? (
                    children
                  ) : (
                    <div className="flex min-h-full w-full items-center justify-center">
                      <Spinner className="text-xl" />
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
