import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { selectImaging } from '../../store/features/imaging'
import { useAppSelector } from '../../store/hooks'

import { ImagingStatus } from './ImagingStatus'

export const FloatingExposuringStatus = () => {
  const { pathname, push } = useRouter()
  const { imagingStatus } = useAppSelector(selectImaging)

  const isShowFloatingStatusWindow = useMemo(() => {
    const onImgingPath = pathname === '/imaging'
    return !onImgingPath && imagingStatus === 'busy'
  }, [pathname, imagingStatus])

  return (
    <>
      {isShowFloatingStatusWindow && (
        <div
          onClick={() => push('/imaging')}
          className="fixed bottom-4 left-4 cursor-pointer rounded-md border py-3 px-8">
          <ImagingStatus />
        </div>
      )}
    </>
  )
}
