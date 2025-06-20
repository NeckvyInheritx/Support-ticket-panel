import React from 'react'

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  wrapperClassName?: string
  className?: string
  hasError?: boolean
  errorMessage?: string
}

export const TextArea = ({
  label,
  hasError = false,
  errorMessage,
  labelProps = {},
  className = '',
  wrapperClassName = '',
  ...props
}: TextAreaProps) => {
  const generatedId = React.useId()
  const labelId = labelProps.htmlFor || generatedId

  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={labelId}
          className={`block text-sm font-medium ${labelProps.className || ''}`}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <textarea
        id={labelId}
        aria-invalid={hasError}
        className={`appearance-none block w-full px-3 py-2 border rounded-md text-sm resize-y focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500
         placeholder-gray-500 !text-gray-900  ${
          hasError ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        rows={props.rows ?? 4}
        {...props}
      />
      {hasError && errorMessage && (
        <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
      )}
    </div>
  )
}

export default TextArea
