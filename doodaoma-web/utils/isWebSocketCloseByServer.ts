export const isWebSocketCloseByServer = (closeCode: number) => {
  return [3000].includes(closeCode)
}
