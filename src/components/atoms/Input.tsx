import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hasError?: boolean
  errorMessage?: string
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  className?: string
  wrapperClassName?: string
}

export const Input = ({
  label,
  hasError = false,
  errorMessage,
  labelProps = {},
  className = '',
  wrapperClassName = '',
  type = 'text',
  ...props
}: InputProps) => {
  const generatedId = React.useId()
  const labelId = labelProps.htmlFor || generatedId

  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={labelId}
          className={`block text-sm font-medium  ${labelProps.className || ''}`}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <input
        id={labelId}
        type={type}
        aria-invalid={hasError}
        className={`appearance-none relative block w-full px-3 py-2 border  placeholder-gray-500 !text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
         focus:z-10 sm:text-sm ${
          hasError ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {hasError && errorMessage && (
        <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
      )}
    </div>
  )
}

export default Input
