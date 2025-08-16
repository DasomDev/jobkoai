import React from "react";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
        checked
          ? "bg-[var(--primary-color)] border-[var(--primary-color)]"
          : "bg-gray-200 border-gray-300"
      } ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <svg
        className="w-3 h-3 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default CheckBox;
