import React from "react";

function PrimaryButton({ onClick, className, children, ...rest }) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={`m-1 bg-blue-600 text-white rounded-lg px-6 py-1 shadow-lg border border-blue-500 ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
// className={`w-full px-3 py-1 rounded-lg border text-white bg-slate-900 ${className}`}
