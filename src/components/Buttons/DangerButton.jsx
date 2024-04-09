import React from "react";

function DangerButton({ onClick, className, children, ...rest }) {
    return (
        <button
            {...rest}
            onClick={onClick}
            className={`m-1 bg-red-600 text-white rounded-lg px-6 py-1 shadow-lg border border-red-500 ${className}`}
        >
            {children}
        </button>
    );
}

export default DangerButton;
