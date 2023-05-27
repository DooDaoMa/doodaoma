import { useContext, useMemo } from 'react'
import { TfiReload } from 'react-icons/tfi'

import { ImagingWebSocketContext } from '../../context/ImagingWebSocketProvider'
import { selectImaging } from '../../store/features/imaging'
import { useAppSelector } from '../../store/hooks'

export const ImagingStatus = () => {
  const { connect, isConnect } = useContext(ImagingWebSocketContext)
  const { imagingStatus } = useAppSelector(selectImaging)

  const status = useMemo(() => {
    switch (imagingStatus) {
      case 'empty':
        return { text: 'Empty', color: 'bg-zinc-500' }
      case 'not connect':
        return { text: 'Not connect', color: 'bg-red-500' }
      case 'reconnecting':
        return { text: 'Retrying connect', color: 'bg-blue-500' }
      case 'connecting':
        return { text: 'Connecting', color: 'bg-yellow-500' }
      case 'ready':
        return { text: 'Ready', color: 'bg-green-500' }
      case 'busy':
        return { text: 'Busy', color: 'bg-orange-500' }
      case 'cancelling':
        return { text: 'Cancelling', color: 'bg-amber-500' }
    }
  }, [imagingStatus])

  return (
    <p className="flex items-center gap-2">
      {!isConnect && <TfiReload className="cursor-pointer" onClick={connect} />}
      Status: <span className="font-semibold">{status.text}</span>
      <span
        className={`mt-1 inline-block h-3 w-3 rounded-full ${status.color}`}></span>
    </p>
  )
}
