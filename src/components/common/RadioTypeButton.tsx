interface RadioTypeButton {
  id: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const RadioTypeButton = ({ id, label, selected, onClick }: RadioTypeButton) => {
  return (
    <button
      onClick={onClick}
      className={`
            flex-1 p-3 rounded-lg text-sm font-medium transition-colors
              ${
                selected
                  ? "bg-white border border-[var(--primary-color)] text-[var(--primary-color)]"
                  : "text-gray-700"
              }
          `}
    >
      {label}
    </button>
  );
};

export default RadioTypeButton;
