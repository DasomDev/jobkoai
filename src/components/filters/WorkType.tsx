import React, { useState } from "react";
import FilterOptionButton from "../common/FilterOptionButton";
import Counter from "../common/Counter";

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
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const maxSelections = 7;

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      } else {
        if (prev.length < maxSelections) {
          return [...prev, typeId];
        }
        return prev;
      }
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">고용형태</h3>
        <Counter count={selectedTypes.length} maxCount={maxSelections} />
      </div>

      <div className="flex flex-wrap gap-2">
        {employmentTypes.map((type) => (
          <FilterOptionButton
            key={type.id}
            id={type.id}
            label={type.label}
            selected={selectedTypes.includes(type.id)}
            maxSelections={maxSelections}
            handleClick={() => handleTypeToggle(type.id)}
            isDisabled={
              !selectedTypes.includes(type.id) &&
              selectedTypes.length >= maxSelections
            }
          />
        ))}
      </div>
    </div>
  );
};

export default WorkType;
