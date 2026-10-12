import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const inputTypes = {
  text: 'text-input',
  email: 'email-input',
  password: 'password-input',
  number: 'number-input',
  select: 'select-input',
  textarea: 'textarea-input',
};

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled,
  options,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      {label && (
        <label className="label">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      <div className="relative">
        {type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="select"
            {...props}
          >
            <option value="">Select {label?.toLowerCase()}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="input resize-none min-h-[100px]"
            {...props}
          />
        ) : (
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="input"
            {...props}
          />
        )}

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-300"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
