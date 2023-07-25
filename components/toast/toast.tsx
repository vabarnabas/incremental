import { Transition } from "@headlessui/react"
import clsx from "clsx"
import React, { Fragment, useEffect, useState } from "react"
import { HiX } from "react-icons/hi"

import { ToastProps, useToast } from "../../providers/toast.provider"

export default function Toast({
  id,
  title,
  subtitle,
  icon,
  type,
  expiration,
  action,
  actiontitle,
}: ToastProps) {
  const [showing, setShowing] = useState<boolean>(true)
  const { removeToast } = useToast()

  useEffect(() => {
    const checkShowing = setInterval(() => {
      setShowing(expiration > Date.now())

      if (!(expiration > Date.now())) {
        removeToast(id)
      }
    }, 250)
    return () => {
      clearInterval(checkShowing)
    }
  }, [id, expiration, removeToast])
  return (
    <Transition
      as={Fragment}
      show={showing}
      appear={true}
      enter="transition-opacity ease-in-out duration-500"
      enterFrom="opacity-0 -translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition-opacity ease-in-out duration-500"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 -translate-x-full"
    >
      <div className="relative mx-2 flex w-full overflow-hidden rounded-md bg-slate-50 text-slate-800 shadow-md sm:mx-0 sm:w-96">
        <HiX
          onClick={() => {
            removeToast(id || "")
          }}
          className="absolute right-2 top-2 cursor-pointer"
        />
        {action ? (
          <button className="absolute right-2 bottom-2 rounded-md py-0.5 px-1 text-sm hover:bg-slate-200">
            {actiontitle || "Open"}
          </button>
        ) : null}
        <div
          className={clsx("absolute h-full w-2", {
            "bg-emerald-500": type === "success",
            "bg-rose-500": type === "error",
            "bg-amber-500": type === "warning",
          })}
        ></div>
        <div className="flex items-center justify-center py-3 pl-5 pr-20">
          <div
            className={clsx("mr-4 text-4xl", {
              "text-emerald-500": type === "success",
              "text-rose-500": type === "error",
              "text-amber-500": type === "warning",
            })}
          >
            {icon || ""}
          </div>
          <div className="">
            <p className="font-medium">{title}</p>
            <p className="text-sm">{subtitle}</p>
          </div>
        </div>
      </div>
    </Transition>
  )
}
