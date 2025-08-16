import React, { useState } from "react";
import Counter from "../common/Counter";
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
  const [selectionMode, setSelectionMode] = useState<SelectionMode>("list");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [excludeNegotiation, setExcludeNegotiation] = useState(false);
  const maxSelections = 3;

  const handleDayToggle = (dayId: string) => {
    if (selectionMode === "list") {
      setSelectedDays((prev) => {
        if (prev.includes(dayId)) {
          return prev.filter((id) => id !== dayId);
        } else {
          if (prev.length < maxSelections) {
            return [...prev, dayId];
          }
          return prev;
        }
      });
    } else {
      setSelectedDays((prev) => {
        if (prev.includes(dayId)) {
          return prev.filter((id) => id !== dayId);
        } else {
          return [...prev, dayId];
        }
      });
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">근무요일</h3>
        {selectionMode === "list" && (
          <Counter count={selectedDays.length} maxCount={maxSelections} />
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
              selected={selectedDays.includes(option.id)}
              maxSelections={maxSelections}
              handleClick={() => handleDayToggle(option.id)}
              isDisabled={
                !selectedDays.includes(option.id) &&
                selectedDays.length >= maxSelections
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
              selected={selectedDays.includes(day.id)}
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
