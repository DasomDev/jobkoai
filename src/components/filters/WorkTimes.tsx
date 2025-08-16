import React, { useState } from "react";
import Counter from "../common/Counter";
import FilterOptionButton from "../common/FilterOptionButton";
import RadioTypeButton from "../common/RadioTypeButton";
import CheckBox from "../common/CheckBox";

interface TimeSlot {
  id: string;
  label: string;
}

type SelectionMode = "list" | "direct";

const WorkTimes: React.FC = () => {
  const [selectionMode, setSelectionMode] = useState<"list" | "direct">("list");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [excludeNegotiation, setExcludeNegotiation] = useState(false);
  const maxSelections = 3;

  const timeSlots: TimeSlot[] = [
    { id: "morning", label: "오전 파트" },
    { id: "afternoon", label: "오후 파트" },
    { id: "evening", label: "저녁 파트" },
    { id: "dawn", label: "새벽 파트" },
    { id: "morning-afternoon", label: "오전~오후 파트" },
    { id: "afternoon-evening", label: "오후~저녁 파트" },
    { id: "evening-dawn", label: "저녁~새벽 파트" },
    { id: "dawn-morning", label: "새벽~오전 파트" },
    { id: "fulltime", label: "풀타임(8시간 이상)" },
  ];

  const handleTimeToggle = (timeId: string) => {
    setSelectedTimes((prev) => {
      if (prev.includes(timeId)) {
        return prev.filter((id) => id !== timeId);
      } else {
        if (prev.length >= maxSelections) {
          return prev;
        }
        return [...prev, timeId];
      }
    });
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">근무시간</h3>
        <Counter count={selectedTimes.length} maxCount={maxSelections} />
      </div>

      {/* Selection Mode Tabs */}
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

      {/* Time Slot Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {timeSlots.map((slot) => (
          <FilterOptionButton
            key={slot.id}
            id={slot.id}
            label={slot.label}
            selected={selectedTimes.includes(slot.id)}
            maxSelections={maxSelections}
            handleClick={() => handleTimeToggle(slot.id)}
            isDisabled={
              !selectedTimes.includes(slot.id) &&
              selectedTimes.length >= maxSelections
            }
          />
          // <button
          //   key={slot.id}
          //   onClick={() => handleTimeToggle(slot.id)}
          //   disabled={
          //     !selectedTimes.includes(slot.id) &&
          //     selectedTimes.length >= maxSelections
          //   }
          //   className={`
          //     py-[10px] px-[16px] flex items-center justify-center h-[34px] rounded-full text-sm font-medium transition-colors
          //     ${
          //       selectedTimes.includes(slot.id)
          //         ? "border border-[#ffddd2] bg-[#fff8f6] text-[var(--primary-color)]"
          //         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          //     }
          //     ${
          //       !selectedTimes.includes(slot.id) &&
          //       selectedTimes.length >= maxSelections
          //         ? "opacity-50 cursor-not-allowed"
          //         : "cursor-pointer"
          //     }
          //   `}
          // >
          //   {slot.label}
          // </button>
        ))}
      </div>

      {/* Exclude Negotiation Option */}
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

export default WorkTimes;
