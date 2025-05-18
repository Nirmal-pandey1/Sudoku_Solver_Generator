import React from "react";

export default function Button({ onClick, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded bg-purple-500 text-white font-bold hover:bg-purple-600 disabled:opacity-50"
    >
      {children}
    </button>
  );
}