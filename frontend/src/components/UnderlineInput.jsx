import { useState } from 'react';

const UnderlineInput = ({
  name,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = '',
  disabled = false,
  className = '',
  error = '',
  rightLabel = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`underline-input-container ${className}`}>
        <div className="underline-input-label-container">
        <label 
            htmlFor={name}
            className={`underline-input-label ${isFocused ? 'focused' : ''}`}
        >
            {label}
            {required && <span className="underline-input-required">*</span>}
        </label>
        {rightLabel && (
            <p className="underline-input-right-label">{rightLabel}</p>
        )}
      </div>
      <div>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`underline-input-field 
            ${isFocused ? 'focused' : ''}
            ${error ? 'error' : ''}
            ${disabled ? 'disabled' : ''}
          `}
        />
      </div>
      
      {error && (
        <p className="underline-input-error">{error}</p>
      )}
    </div>
  );
};

export default UnderlineInput;
