import React from "react";

function SecondaryButton({ onClick, className, children, ...rest }) {
    return (
        <button
            {...rest}
            onClick={onClick}
            className={`m-1 bg-slate-600 text-white rounded-lg px-6 py-1 shadow-lg border border-slate-500 ${className}`}
        >
            {children}
        </button>
    );
}

export default SecondaryButton;
