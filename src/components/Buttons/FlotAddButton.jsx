import React from "react";

function FlotAddButton({ onClick }) {
    return (
        <div>
            <button
                onClick={onClick}
                className="w-14 h-14 rounded-full p-3 bg-slate-700 fixed bottom-3 right-3 text-white"
            >
                +
            </button>
        </div>
    );
}

export default FlotAddButton;
