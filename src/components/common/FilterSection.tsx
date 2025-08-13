import React from 'react';

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
  children
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <span className="text-orange-500 text-sm">{count}/{maxCount}</span>
      </div>
      
      <button
        onClick={onAdd}
        disabled={count >= maxCount}
        className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-50"
      >
        <span className="text-xl">+</span>
        <span>추가하기</span>
      </button>
      
      {children && (
        <div className="mt-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterSection;