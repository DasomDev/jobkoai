import React, { useState } from "react";
import Counter from "../common/Counter";
import FilterOptionButton from "../common/FilterOptionButton";

interface WorkPeriod {
  id: string;
  label: string;
  description?: string;
}

const workPeriods: WorkPeriod[] = [
  { id: "1day", label: "하루(1일)" },
  { id: "lessThan1Week", label: "1주일이하" },
  { id: "1WeekTo1Month", label: "1주일~1개월" },
  { id: "1MonthTo3Months", label: "1개월~3개월" },
  { id: "3MonthsTo6Months", label: "3개월~6개월" },
  { id: "6MonthsTo1Year", label: "6개월~1년" },
  { id: "moreThan1Year", label: "1년이상" },
];

const WorkLength: React.FC = () => {
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const maxSelections = 6;

  const handlePeriodToggle = (periodId: string) => {
    setSelectedPeriods((prev) => {
      if (prev.includes(periodId)) {
        return prev.filter((id) => id !== periodId);
      } else {
        if (prev.length < maxSelections) {
          return [...prev, periodId];
        }
        return prev;
      }
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">근무기간</h3>
        <Counter count={selectedPeriods.length} maxCount={maxSelections} />
      </div>

      <div className="flex flex-wrap gap-2">
        {workPeriods.map((period) => (
          <FilterOptionButton
            id={period.id}
            label={period.label}
            selected={selectedPeriods.includes(period.id)}
            maxSelections={maxSelections}
            handleClick={() => handlePeriodToggle(period.id)}
            isDisabled={!selectedPeriods.includes(period.id) && selectedPeriods.length >= maxSelections}
          />
        ))}
        {/* {workPeriods.map((period) => (
          <button
            key={period.id}
            onClick={() => handlePeriodToggle(period.id)}
            disabled={!selectedPeriods.includes(period.id) && selectedPeriods.length >= maxSelections}
            className={`
              py-[10px] px-[16px] flex items-center justify-center h-[34px]  rounded-full text-sm font-medium transition-colors
              ${selectedPeriods.includes(period.id)
                ? 'border border-[#ffddd2] bg-[#fff8f6] text-[var(--primary-color)]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
              ${!selectedPeriods.includes(period.id) && selectedPeriods.length >= maxSelections
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
              }
            `}
          >
            {period.label}
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default WorkLength;
