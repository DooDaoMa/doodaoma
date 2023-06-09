import { IncomingMessage } from 'http'
import internal from 'stream'
import { Server } from 'ws'
import {
  NinaWebSocketClient,
  WebWebSocketClient,
} from '../../types/websocket.types'
import { findConnectedNinaClientByDeviceId } from '../../utils/findConnectedNinaClientByDeviceId'

export async function upgradeWebPath(
  req: IncomingMessage,
  socket: internal.Duplex,
  head: Buffer,
  webWsServer: Server<WebWebSocketClient>,
  ninaWsServer: Server<NinaWebSocketClient>,
) {
  let deviceId: string
  let userId: string
  try {
    const searchParams = new URLSearchParams(req.url?.split('?')[1])
    userId = searchParams.get('userId') || ''
    deviceId = searchParams.get('deviceId') || ''
    if (!userId || !deviceId) {
      console.error('Invalid userId or deviceId')
      return socket.destroy()
    }

    const matchedNinaClient = findConnectedNinaClientByDeviceId(
      ninaWsServer,
      deviceId,
    )
    if (matchedNinaClient === undefined) {
      console.error('Not found matched nina socket connection of this deviceId')
      return socket.destroy()
    }
  } catch (error) {
    console.error('Other error ' + error)
    return socket.destroy()
  }
  webWsServer.handleUpgrade(req, socket, head, (ws) => {
    ws.deviceId = deviceId
    ws.userId = userId
    webWsServer.emit('connection', ws, req)
  })
}
