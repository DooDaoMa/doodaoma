import { useTheme } from 'next-themes'
import { ReactNode } from 'react'
import { Theme, ToastContainer } from 'react-toastify'

import { useRestoreUser } from '../../hooks/useRestoreUser'
import { Loading } from '../atoms/Loading'

import { FloatingExposuringStatus } from './FloatingExposuringStatus'
import { Navigation } from './Navigation'

export const Layout = ({ children }: { children: ReactNode }) => {
  const isRestoring = useRestoreUser()
  const { theme } = useTheme()

  return (
    <>
      <Navigation />
      {isRestoring ? (
        <h1>
          <Loading />
        </h1>
      ) : (
        <main className="min-h-full sm:p-4 md:p-12">{children}</main>
      )}
      <ToastContainer theme={theme as Theme} />
      <FloatingExposuringStatus />
    </>
  )
}
