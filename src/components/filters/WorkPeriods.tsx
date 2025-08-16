import React, { useState } from "react";
import Counter from "../common/Counter";
import FilterOptionButton from "../common/FilterOptionButton";
import condition from "../../data/condition.json";

interface WorkPeriod {
  id: string;
  label: string;
}

const WorkPeriods: React.FC = () => {
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const maxSelections = 6;

  const workPeriods: WorkPeriod[] = condition.workPeriod.collection.map(
    (item) => ({
      id: item,
      label: item,
    })
  );

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
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">근무기간</h3>
        <Counter count={selectedPeriods.length} maxCount={maxSelections} />
      </div>
      <div className="flex flex-wrap gap-2">
        {workPeriods.map((period) => (
          <FilterOptionButton
            key={period.id}
            id={period.id}
            label={period.label}
            selected={selectedPeriods.includes(period.id)}
            maxSelections={maxSelections}
            handleClick={() => handlePeriodToggle(period.id)}
            isDisabled={
              !selectedPeriods.includes(period.id) &&
              selectedPeriods.length >= maxSelections
            }
          />
        ))}
      </div>
    </div>
  );
};

export default WorkPeriods;
