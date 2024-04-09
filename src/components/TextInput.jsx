import React from "react";

function TextInput({
    type = "text",
    placeholder,
    className,
    disabled = false,
    onChange,
    value,
    name,
    id,
}) {
    return (
        <input
            disabled={disabled}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            id={id}
            className={`w-full p-2 rounded-lg border border-gray-400 bg-transparent ${className}`}
        />
    );
}

export default TextInput;
