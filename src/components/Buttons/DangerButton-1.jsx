import React from "react";

function DangerButton({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`w-full px-3 py-1 rounded-lg border border-slate-800 text-white bg-red-700 ${className}`}
        >
            {children}
        </button>
    );
}

export default DangerButton;
