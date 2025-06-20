import React from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  hasError?: boolean;
  className?: string;           // For wrapper div
  selectClassName?: string;     // For the select component itself
  labelClassName?: string;      // For the label
}

// Extend Ant Design's SelectProps and add our custom props
interface SelectProps extends Omit<AntSelectProps, 'className'>, CustomSelectProps {}

export const Select = ({
  label,
  hasError = false,
  className = '',
  selectClassName = '',
  labelClassName = '',
  ...selectProps
}: SelectProps) => {
  return (
    <div className={className} >
      {label && (
        <label 
          className={labelClassName || "block text-sm font-medium text-gray-700 mb-1"}
        >
          {label}
        </label>
      )}
      <AntSelect
        className={selectClassName}
        status={hasError ? 'error' : undefined}
        {...selectProps}
      />
    </div>
  );
};