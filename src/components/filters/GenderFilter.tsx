import React, { useState } from "react";
import RadioTypeButton from "../common/RadioTypeButton";

type Gender = "male" | "female" | null;

const GenderFilter: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const [excludeIrrelevant, setExcludeIrrelevant] = useState(true);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(selectedGender === gender ? null : gender);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="font-bold text-gray-900">성별</h3>
      </div>

      {/* Gender Selection Control */}
      <div className="mb-4">
        <div className="flex gap-2 bg-[#F8F8F8] rounded-lg">
          {["male", "female"].map((mode) => (
            <RadioTypeButton
              key={mode}
              id={mode}
              label={mode === "male" ? "남자" : "여자"}
              selected={selectedGender === mode}
              onClick={() => handleGenderSelect(mode as Gender)}
            />
          ))}
        </div>
      </div>

      {/* Exclude Irrelevant Checkbox */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setExcludeIrrelevant(!excludeIrrelevant)}
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
            ${
              excludeIrrelevant
                ? "bg-gray-400 border-gray-400"
                : "bg-white border-gray-300"
            }
          `}
        >
          {excludeIrrelevant && (
            <div className="w-2 h-2 bg-white rounded-full"></div>
          )}
        </button>
        <span className="text-sm text-gray-900">무관제외</span>
      </div>
    </div>
  );
};

export default GenderFilter;
