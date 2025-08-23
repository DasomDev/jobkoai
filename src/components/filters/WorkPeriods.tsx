import React from "react";
import Counter from "../common/Counter";
import FilterOptionButton from "../common/FilterOptionButton";
import condition from "../../data/condition.json";
import useJobFilterStore from "../../Store/useJobfilter.store";

interface WorkPeriod {
  id: string;
  label: string;
}

const WorkPeriods: React.FC = () => {
  const { selectedWorkPeriods, setSelectedWorkPeriods } = useJobFilterStore();
  const maxSelections = 6;

  const workPeriods: WorkPeriod[] = condition.workPeriod.collection.map(
    (item) => ({
      id: item,
      label: item,
    })
  );

  const handlePeriodToggle = (periodId: string) => {
    if (selectedWorkPeriods.includes(periodId)) {
      setSelectedWorkPeriods(selectedWorkPeriods.filter((id) => id !== periodId));
    } else {
      if (selectedWorkPeriods.length < maxSelections) {
        setSelectedWorkPeriods([...selectedWorkPeriods, periodId]);
      }
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">근무기간</h3>
        <Counter count={selectedWorkPeriods.length} maxCount={maxSelections} />
      </div>
      <div className="flex flex-wrap gap-2">
        {workPeriods.map((period) => (
          <FilterOptionButton
            key={period.id}
            id={period.id}
            label={period.label}
            selected={selectedWorkPeriods.includes(period.id)}
            maxSelections={maxSelections}
            handleClick={() => handlePeriodToggle(period.id)}
            isDisabled={
              !selectedWorkPeriods.includes(period.id) &&
              selectedWorkPeriods.length >= maxSelections
            }
          />
        ))}
      </div>
    </div>
  );
};

export default WorkPeriods;
