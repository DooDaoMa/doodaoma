export interface IImagingForm {
  startSequence: {
    cooling: {
      temperature: number
      duration: number
    }
  }
  imagingSequence: {
    target: {
      name: string
      rotation: number
      ra: {
        hours: string
        minutes: string
        seconds: string
      }
      dec: {
        degrees: string
        minutes: string
        seconds: string
      }
    }
    tracking: {
      mode: 0 | 1 | 2 | 3 | 5
    }
    guiding: {
      forceCalibration: boolean
    }
    exposure: {
      gain: number
      time: number
      binning: string
      imageType: string
    }
  }
  endSequence: {
    warming: {
      duration: number
    }
  }
}

export type ImagingStatus =
  | 'busy'
  | 'cancelling'
  | 'connecting'
  | 'not connect'
  | 'ready'
  | 'empty'
  | 'reconnecting'

export const blackPlaceholderUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
