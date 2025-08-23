import React, { useState } from "react";
import Counter from "../common/Counter";

import useJobFilterStore from "../../Store/useJobfilter.store";
import FilterOptionButton from "../common/FilterOptionButton";
import condition from "../../data/condition.json";
import RadioTypeButton from "../common/RadioTypeButton";
import CheckBox from "../common/CheckBox";

interface WorkDayOption {
  id: string;
  label: string;
}

const workDayOptions: WorkDayOption[] = condition.workDays.collection.map(
  (item) => ({
    id: item,
    label: item,
  })
);
const dayNames = ["월", "화", "수", "목", "금", "토", "일"];
const individualDays = dayNames.map((day) => ({
  id: day,
  label: day,
}));

type SelectionMode = "list" | "direct";

const WorkDays: React.FC = () => {
  const { 
    selectedWorkDays, 
    setSelectedWorkDays,
    excludeNegotiation,
    setExcludeNegotiation
  } = useJobFilterStore();
  const [selectionMode, setSelectionMode] = useState<SelectionMode>("list");
  const maxSelections = 3;

  const handleDayToggle = (dayId: string) => {
    if (selectionMode === "list") {
      const newDays = selectedWorkDays.includes(dayId)
        ? selectedWorkDays.filter((id: string) => id !== dayId)
        : selectedWorkDays.length < maxSelections
        ? [...selectedWorkDays, dayId]
        : selectedWorkDays;
      setSelectedWorkDays(newDays);
    } else {
      const newDays = selectedWorkDays.includes(dayId)
        ? selectedWorkDays.filter((id: string) => id !== dayId)
        : [...selectedWorkDays, dayId];
      setSelectedWorkDays(newDays);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">근무요일</h3>
        {selectionMode === "list" && (
          <Counter count={selectedWorkDays.length} maxCount={maxSelections} />
        )}
      </div>

      {/* Selection Mode Buttons */}
      <div className="flex gap-2 mb-4 bg-[#F8F8F8] rounded-lg">
        {["list", "direct"].map((mode) => (
          <RadioTypeButton
            key={mode}
            id={mode}
            label={mode === "list" ? "목록에서 선택" : "직접 선택"}
            selected={selectionMode === mode}
            onClick={() => setSelectionMode(mode as SelectionMode)}
          />
        ))}
      </div>

      {/* Work Day Options */}
      {selectionMode === "list" && (
        <div className="flex flex-wrap gap-2 mb-4">
          {workDayOptions.map((option) => (
            <FilterOptionButton
              key={option.id}
              id={option.id}
              label={option.label}
              selected={selectedWorkDays.includes(option.id)}
              maxSelections={maxSelections}
              handleClick={() => handleDayToggle(option.id)}
              isDisabled={
                !selectedWorkDays.includes(option.id) &&
                selectedWorkDays.length >= maxSelections
              }
            />
          ))}
        </div>
      )}

      {/* Direct Selection Mode */}
      {selectionMode === "direct" && (
        <div className="flex flex-wrap gap-2 mb-4">
          {individualDays.map((day) => (
            <FilterOptionButton
              key={day.id}
              id={day.id}
              label={day.label}
              selected={selectedWorkDays.includes(day.id)}
              maxSelections={maxSelections}
              handleClick={() => handleDayToggle(day.id)}
              isDisabled={false}
            />
          ))}
        </div>
      )}

      {/* Exclude Negotiation Checkbox */}
      <div className="flex gap-2 items-center">
        <CheckBox
          checked={excludeNegotiation}
          onChange={() => setExcludeNegotiation(!excludeNegotiation)}
        />

        <span className="text-sm text-gray-700">협의제외</span>
      </div>
    </div>
  );
};

export default WorkDays;
