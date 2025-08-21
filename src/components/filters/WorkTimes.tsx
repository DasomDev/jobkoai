import React, { useState } from "react";

import useJobFilterStore from "../../Store/useJobfilter.store";

/** Components */
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
  const { selectedWorkTimes, setSelectedWorkTimes } = useJobFilterStore();
  const [selectionMode, setSelectionMode] = useState<"list" | "direct">("list");
  // const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
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
    const newTimes = selectedWorkTimes.includes(timeId)
      ? selectedWorkTimes.filter((id: string) => id !== timeId)
      : selectedWorkTimes.length >= maxSelections
      ? selectedWorkTimes
      : [...selectedWorkTimes, timeId];
    setSelectedWorkTimes(newTimes);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">근무시간</h3>
        <Counter count={selectedWorkTimes.length} maxCount={maxSelections} />
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
            selected={selectedWorkTimes.includes(slot.id)}
            maxSelections={maxSelections}
            handleClick={() => handleTimeToggle(slot.id)}
            isDisabled={
              !selectedWorkTimes.includes(slot.id) &&
              selectedWorkTimes.length >= maxSelections
            }
          />
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
