import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { JsonValue } from 'react-use-websocket/dist/lib/types'

import { Section } from '../../components'
import { ImagingForm } from '../../components/organisms/ImagingForm'
import { ImagingStatus } from '../../components/organisms/ImagingStatus'
import { ImagingWebSocketContext } from '../../context/ImagingWebSocketProvider'
import { selectImaging, setImagingStatus } from '../../store/features/imaging'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IImagingForm } from '../../types/imaging'

export default function Imaging() {
  const { send, connect } = useContext(ImagingWebSocketContext)
  const dispatch = useAppDispatch()
  const { imagingStatus } = useAppSelector(selectImaging)

  useEffect(() => {
    connect()
  }, [connect])

  const onAcquireImage = (value: IImagingForm) => {
    send({
      type: 'runImagingSequence',
      payload: { ...value } as unknown as JsonValue,
    })
  }

  const onCancelExposuring = () => {
    dispatch(setImagingStatus('cancelling'))
    send({ type: 'cancelRunningSequence' })
  }

  return (
    <>
      <Head>
        <title>Imaging</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Imaging</h1>
        <ImagingStatus />
      </div>
      <Section>
        <ImagingForm
          isCancelling={imagingStatus === 'cancelling'}
          isCancelButtonShown={imagingStatus === 'busy'}
          isSubmitButtonDisabled={
            imagingStatus === 'busy' || imagingStatus !== 'ready'
          }
          onSubmit={onAcquireImage}
          onCancel={onCancelExposuring}
        />
      </Section>
    </>
  )
}

Imaging.requireAuth = true