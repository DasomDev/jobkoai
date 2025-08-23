import React from "react";
import FilterOptionButton from "../common/FilterOptionButton";
import Counter from "../common/Counter";

import useJobFilterStore from "../../Store/useJobfilter.store";

interface EmploymentType {
  id: string;
  label: string;
}

const employmentTypes: EmploymentType[] = [
  { id: "partTime", label: "알바" },
  { id: "fullTime", label: "정규직" },
  { id: "contract", label: "계약직" },
  { id: "dispatch", label: "파견직" },
  { id: "youthIntern", label: "청년인턴" },
  { id: "freelancer", label: "위촉직(프리랜서)" },
  { id: "trainee", label: "연수생/교육생" },
];

const WorkType: React.FC = () => {
  const { selectedWorkType, setSelectedWorkType } = useJobFilterStore();
  const maxSelections = 7;

  const handleTypeToggle = (typeId: string) => {
    const newTypes = selectedWorkType.includes(typeId)
      ? selectedWorkType.filter((id: string) => id !== typeId)
      : selectedWorkType.length >= maxSelections
      ? selectedWorkType
      : [...selectedWorkType, typeId];
    setSelectedWorkType(newTypes);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">고용형태</h3>
        <Counter count={selectedWorkType.length} maxCount={maxSelections} />
      </div>

      <div className="flex flex-wrap gap-2">
        {employmentTypes.map((type) => (
          <FilterOptionButton
            key={type.id}
            id={type.id}
            label={type.label}
            selected={selectedWorkType.includes(type.id)}
            maxSelections={maxSelections}
            handleClick={() => handleTypeToggle(type.id)}
            isDisabled={
              !selectedWorkType.includes(type.id) &&
              selectedWorkType.length >= maxSelections
            }
          />
        ))}
      </div>
    </div>
  );
};

export default WorkType;
