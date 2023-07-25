import { useEffect, useState } from "react"

interface Props {
  children: JSX.Element
}

const ZustandHydration = ({ children }: Props) => {
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return <>{isHydrated ? <div>{children}</div> : null}</>
}

export default ZustandHydration
