import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { ReadyState } from 'react-use-websocket'
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'

import { selectImaging, setImagingStatus } from '../store/features/imaging'
import { userSelector } from '../store/features/user'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Message } from '../types/message'
import { isWebSocketCloseByServer } from '../utils/isWebSocketCloseByServer'

type ImagingWebSocketContextType = {
  isConnect: boolean
  connect: () => void
  send: SendJsonMessage
}

export const ImagingWebSocketContext =
  createContext<ImagingWebSocketContextType>({
    isConnect: false,
    connect: () => undefined,
    send: () => undefined,
  })

type Props = {
  children: ReactNode
}

export const ImagingWebSocketProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(userSelector)
  const { previousImagingStatus, imagingStatus } = useAppSelector(selectImaging)
  const [isConnect, setIsConnect] = useState(false)

  const { readyState, lastJsonMessage, sendJsonMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/web`,
    {
      retryOnError: true,
      reconnectInterval: 10 * 1000,
      queryParams: {
        ...(currentUser !== null && { userId: currentUser.id }),
        deviceId: 'Test Device Id',
      },
      onError: (event) => {
        console.error(event)
        dispatch(setImagingStatus('empty'))
        setIsConnect(false)
      },
      onOpen: () => {
        dispatch(setImagingStatus('ready'))
        sendJsonMessage({ type: 'getIsBusy' })
      },
      onClose: (event) => {
        if (isWebSocketCloseByServer(event.code)) {
          dispatch(setImagingStatus('not connect'))
        } else {
          dispatch(setImagingStatus('empty'))
          setIsConnect(false)
        }
      },
      shouldReconnect: (event) => {
        const shouldReconnect = isWebSocketCloseByServer(event.code)
        if (shouldReconnect) {
          dispatch(setImagingStatus('reconnecting'))
        }
        return shouldReconnect
      },
      onReconnectStop: () => {
        dispatch(setImagingStatus('not connect'))
        setIsConnect(false)
      },
    },
    isConnect,
  )

  useEffect(() => {
    switch (readyState) {
      case ReadyState.UNINSTANTIATED:
        dispatch(setImagingStatus('empty'))
        break
      case ReadyState.CONNECTING:
        dispatch(setImagingStatus('connecting'))
        break
    }
  }, [readyState, dispatch])

  useEffect(() => {
    if (lastJsonMessage === null) {
      return
    }
    const message = lastJsonMessage as unknown as Message
    console.info(message)

    switch (message.type) {
      case 'sendMessage': {
        toast.info(message.payload.message)
        break
      }
      case 'updateIsBusy': {
        const isBusy = message.payload.isBusy
        const newStatus = isBusy ? 'busy' : 'ready'
        dispatch(setImagingStatus(newStatus))
        break
      }
    }
  }, [lastJsonMessage, dispatch])

  useEffect(() => {
    if (previousImagingStatus === 'cancelling' && imagingStatus === 'ready') {
      toast.warn('Exposure cancelled')
    } else if (previousImagingStatus === 'busy' && imagingStatus === 'ready') {
      toast.success('Exposure finished')
    }
  }, [previousImagingStatus, imagingStatus])

  const connect = useCallback(() => {
    setIsConnect(true)
  }, [])

  return (
    <ImagingWebSocketContext.Provider
      value={{ isConnect, connect, send: sendJsonMessage }}>
      {children}
    </ImagingWebSocketContext.Provider>
  )
}
