import { forwardRef, InputHTMLAttributes } from 'react'

type CheckboxProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

/* eslint-disable react/display-name */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div className="flex items-baseline gap-x-4">
        <input type="checkbox" id={label} name={label} ref={ref} {...rest} />
        <label htmlFor={label}>{label}</label>
      </div>
    )
  },
)
