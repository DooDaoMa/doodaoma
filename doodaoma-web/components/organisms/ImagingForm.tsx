import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { IImagingForm } from '../../types/imaging'
import { degreesToDMS, timeDecimalToHMS } from '../../utils/dateTime'
import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { Input } from '../atoms/Input'
import { Select } from '../atoms/Select'

type Props = {
  isCancelling: boolean
  isCancelButtonShown: boolean
  isSubmitButtonDisabled: boolean
  onSubmit: (value: IImagingForm) => void
  onCancel: () => void
}

const imagingFormDefaultValue: IImagingForm = {
  startSequence: {
    cooling: {
      temperature: -10,
      duration: 5,
    },
  },
  imagingSequence: {
    target: {
      name: '',
      rotation: 0,
      ra: {
        hours: '0',
        minutes: '0',
        seconds: '0',
      },
      dec: {
        degrees: '0',
        minutes: '0',
        seconds: '0',
      },
    },
    tracking: {
      mode: 0,
    },
    guiding: {
      forceCalibration: false,
    },
    exposure: {
      gain: 100,
      time: 300,
      binning: '1x1',
      imageType: 'LIGHT',
    },
  },
  endSequence: {
    warming: {
      duration: 5,
    },
  },
}

export const ImagingForm = ({
  isCancelButtonShown,
  isCancelling,
  isSubmitButtonDisabled,
  onSubmit,
  onCancel,
}: Props) => {
  const { query } = useRouter()

  const computedInitialFormValue = useMemo(() => {
    const ra = (query.ra || '') as string
    const dec = (query.dec || '') as string
    const name = (query.name || '') as string
    const convertedRa = timeDecimalToHMS(ra)
    const convertedDec = degreesToDMS(dec)
    return { ra: convertedRa, dec: convertedDec, name }
  }, [query])

  const { register, handleSubmit } = useForm<IImagingForm>({
    defaultValues: {
      ...imagingFormDefaultValue,
      imagingSequence: {
        ...imagingFormDefaultValue.imagingSequence,
        target: {
          ...imagingFormDefaultValue.imagingSequence.target,
          ...computedInitialFormValue,
        },
      },
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-3 text-lg font-bold">Cooling Camera</p>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <Input
          type="number"
          label="Temperature (°C)"
          {...register('startSequence.cooling.temperature', {
            valueAsNumber: true,
          })}
        />
        <Input
          type="number"
          label="Duration (minutes)"
          {...register('startSequence.cooling.duration', {
            valueAsNumber: true,
          })}
        />
      </div>
      <p className="mb-3 text-lg font-bold">Imaging</p>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <Input label="Name" {...register('imagingSequence.target.name')} />
        <Input
          label="Rotation"
          {...register('imagingSequence.target.rotation')}
        />
      </div>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <div>
          <p className="text-sm font-semibold">RA / Right Asc. (hh:mm:ss)</p>
          <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-6">
            <Input
              type="number"
              label="Hours"
              {...register('imagingSequence.target.ra.hours')}
            />
            <Input
              type="number"
              label="Minutes"
              {...register('imagingSequence.target.ra.minutes')}
            />
            <Input
              type="number"
              label="Seconds"
              {...register('imagingSequence.target.ra.seconds')}
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">DEC / Declination (d:mm:ss)</p>
          <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-6">
            <Input
              type="number"
              label="Degrees"
              {...register('imagingSequence.target.dec.degrees')}
            />
            <Input
              type="number"
              label="Minutes"
              {...register('imagingSequence.target.dec.minutes')}
            />
            <Input
              type="number"
              label="Seconds"
              {...register('imagingSequence.target.dec.seconds')}
            />
          </div>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <Select
          label="Tracking Mode"
          {...register('imagingSequence.tracking.mode', {
            valueAsNumber: true,
          })}>
          <option value={0}>Sidereal</option>
          <option value={1}>King</option>
          <option value={2}>Solar</option>
          <option value={3}>Lunar</option>
          <option value={5}>Stopped</option>
        </Select>
        <Checkbox
          label="Force Calibration"
          {...register('imagingSequence.guiding.forceCalibration')}
        />
      </div>
      <p className="text-sm font-semibold">Exposure</p>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-4 md:gap-6">
        <Input
          type="number"
          label="Time (s)"
          {...register('imagingSequence.exposure.time', {
            valueAsNumber: true,
          })}
        />
        <Select
          label="Type"
          {...register('imagingSequence.exposure.imageType')}>
          <option value={'LIGHT'}>LIGHT</option>
          <option value={'FLAT'}>FLAT</option>
          <option value={'DARK'}>DARK</option>
          <option value={'BIAS'}>BIAS</option>
          <option value={'DARKFLAT'}>DARKFLAT</option>
          <option value={'SNAPSHOT'}>SNAPSHOT</option>
        </Select>
        <Select
          label="Binning"
          {...register('imagingSequence.exposure.binning')}>
          <option value={'1x1'}>1x1</option>
          <option value={'2x2'}>2x2</option>
          <option value={'3x3'}>3x3</option>
          <option value={'4x4'}>4x4</option>
        </Select>
        <Input
          type="number"
          label="Gain"
          {...register('imagingSequence.exposure.gain', {
            valueAsNumber: true,
          })}
        />
      </div>
      <p className="mb-3 text-lg font-bold">Warming Camera</p>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <Input
          type="number"
          label="Duration (minutes)"
          {...register('endSequence.warming.duration', {
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="mt-6 flex gap-3">
        <Button disabled={isSubmitButtonDisabled} type="submit">
          Acquire images
        </Button>
        {isCancelButtonShown && (
          <Button disabled={isCancelling} btnStyle="danger" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
