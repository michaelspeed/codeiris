import React, { useState } from 'react';
import clsx from 'clsx';
import { IntentProps } from '../../../../lib/common/props/IntentProps';

export interface TextFieldProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    IntentProps {
  error?: string;
  placeholder?: string;
  floating?: boolean;
}

// TODO as better sliding animation
function TextField({
  value,
  onChange,
  error,
  placeholder,
  className,
  floating,
  ...rest
}: TextFieldProps) {
  const [focus, setFocus] = useState(false);
  return (
    <React.Fragment>
      <div className="flex flex-col m-1">
        {((focus && !!placeholder) || floating) && (
          <span className="text-primary transition ease-in-out transform text-lg">
            {placeholder}
          </span>
        )}
        <input
          value={value}
          onChange={onChange}
          placeholder={focus ? '' : placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={clsx(
            'border-2 border-gray-300 rounded placeholder-gray-300 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 focus:shadow-md py-1 px-1.5',
            className,
          )}
          style={{ fontSize: 22 }}
          {...rest}
        />
        {error && (
          <span className="text-red-400 transition duration-500 ease-in-out text-sm">
            {error}
          </span>
        )}
      </div>
    </React.Fragment>
  );
}

export default TextField;
