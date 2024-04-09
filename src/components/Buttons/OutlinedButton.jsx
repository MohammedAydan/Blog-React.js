const OutlinedButton = ({ children, onClick, className, c }) => {
  return (
    <button
      {...c}
      onClick={onClick}
      className={`max-w-max p-3 border border-slate-700 rounded-xl m-1 hover:bg-slate-600 transition duration-150 ${className}`}
    >
      {children.toUpperCase()}
    </button>
  );
};

export default OutlinedButton;
