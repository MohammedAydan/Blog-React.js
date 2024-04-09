import React from "react";

function TextInput({
  type = "text",
  placeholder,
  className,
  disabled = false,
  onChange,
  required = false,
  value,
  name,
  id,
  more,
}) {
  return (
    <input
      {...more}
      required={required}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      id={id}
      className={`w-full p-2 rounded-lg border border-slate-700 bg-transparent ${className}`}
    />
  );
}

export default TextInput;
