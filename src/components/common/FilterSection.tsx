import React from "react";
import Counter from "./Counter";

interface FilterSectionProps {
  title: string;
  count: number;
  maxCount: number;
  onAdd: () => void;
  children?: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  count,
  maxCount,
  onAdd,
  children,
}) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <Counter count={count} maxCount={maxCount} />
      </div>

      <button
        onClick={onAdd}
        disabled={count >= maxCount}
        className="flex gap-2 justify-center items-center p-3 w-full h-12 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
      >
        <span className="text-xl">+</span>
        <span>추가하기</span>
      </button>

      {children && <div className="mt-3">{children}</div>}
    </div>
  );
};

export default FilterSection;
