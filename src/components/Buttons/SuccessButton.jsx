import React from "react";

function SuccessButton({ onClick, className, children, ...rest }) {
    return (
        <button
            {...rest}
            onClick={onClick}
            className={`m-1 bg-green-600 text-white rounded-lg px-6 py-1 shadow-lg border border-green-500 ${className}`}
        >
            {children}
        </button>
    );
}

export default SuccessButton;
