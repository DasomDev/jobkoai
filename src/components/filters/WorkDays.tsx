import React, { useState } from "react";
import Counter from "../common/Counter";
import FilterOptionButton from "../common/FilterOptionButton";

interface WorkDayOption {
  id: string;
  label: string;
}

const workDayOptions: WorkDayOption[] = [
  { id: "monToSun", label: "월~일" },
  { id: "monToSat", label: "월~토" },
  { id: "monToFri", label: "월~금" },
  { id: "weekend", label: "주말(토,일)" },
  { id: "6days", label: "주6일" },
  { id: "5days", label: "주5일" },
  { id: "4days", label: "주4일" },
  { id: "3days", label: "주3일" },
  { id: "2days", label: "주2일" },
  { id: "1day", label: "주1일" },
];

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
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">근무요일</h3>
        <Counter count={selectedDays.length} maxCount={maxSelections} />
      </div>

      {/* Selection Mode Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectionMode("list")}
          className={`
            flex-1 p-3 rounded-lg text-sm font-medium transition-colors
              ${
                selectionMode === "list"
                  ? "border border-[var(--primary-color)] text-[var(--primary-color)] bg-white"
                  : "border border-gray-300 text-gray-700 bg-gray-100"
              }
          `}
        >
          목록에서 선택
        </button>
        <button
          onClick={() => setSelectionMode("direct")}
          className={`
            flex-1 p-3 rounded-lg text-sm font-medium transition-colors
            ${
              selectionMode === "direct"
                ? "border border-[var(--primary-color)] text-[var(--primary-color)] bg-white"
                : "border border-gray-300 text-gray-700 bg-gray-100"
            }
          `}
        >
          직접 선택
        </button>
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
        <div className="p-4 mb-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">직접 선택 모드 - 구현 예정</p>
        </div>
      )}

      {/* Exclude Negotiation Checkbox */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setExcludeNegotiation(!excludeNegotiation)}
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
            ${
              excludeNegotiation
                ? "bg-red-500 border-red-500"
                : "bg-white border-gray-300"
            }
          `}
        >
          {excludeNegotiation && (
            <div className="w-2 h-2 bg-white rounded-full"></div>
          )}
        </button>
        <span className="text-sm text-gray-700">협의제외</span>
      </div>
    </div>
  );
};

export default WorkDays;
