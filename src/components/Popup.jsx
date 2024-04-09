import React from "react";
import { Link } from "react-router-dom";

function Popup({ title, children }) {
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-25 flex items-center justify-center p-2">
            <div
                className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-600"
                style={{ height: "32rem" }}
            >
                <div className="header border-b border-b-slate-700 p-4 text-white font-bold">
                    {title}
                </div>
                <div
                    className="body p-3 w-full overflow-auto text-white"
                    style={{ height: "calc(100% - 4rem)" }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Popup;
