import { forwardRef, InputHTMLAttributes } from 'react'

type InputProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

/* eslint-disable react/display-name */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          type="text"
          id={label}
          name={label}
          className="block w-full rounded-md border border-gray-300 px-3 py-1 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)
