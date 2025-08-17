import React from "react";

/** Store */
import useJobFilterStore from "../../Store/useJobfilter.store";

/** Components */
import RadioTypeButton from "../common/RadioTypeButton";
import CheckBox from "../common/CheckBox";

type Gender = "male" | "female" | null;

const GenderFilter: React.FC = () => {
  const {
    selectedGender,
    setSelectedGender,
    excludeIrrelevantGender,
    setExcludeIrrelevantGender,
  } = useJobFilterStore();

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(selectedGender === gender ? null : gender);
  };

  return (
    <div className="">
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
        <CheckBox
          checked={excludeIrrelevantGender}
          onChange={() => setExcludeIrrelevantGender(!excludeIrrelevantGender)}
        />
        <span className="text-sm text-gray-900">무관제외</span>
      </div>
    </div>
  );
};

export default GenderFilter;
