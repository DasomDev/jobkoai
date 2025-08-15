import React, { useState } from 'react';

type Gender = 'male' | 'female' | null;

const GenderFilter: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const [excludeIrrelevant, setExcludeIrrelevant] = useState(true);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(selectedGender === gender ? null : gender);
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="mb-4">
        <h3 className="font-bold text-gray-900">성별</h3>
      </div>
      
      {/* Gender Selection Control */}
      <div className="mb-4">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => handleGenderSelect('male')}
            className={`
              flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors
              ${selectedGender === 'male'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            남자
          </button>
          <button
            onClick={() => handleGenderSelect('female')}
            className={`
              flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors
              ${selectedGender === 'female'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            여자
          </button>
        </div>
      </div>
      
      {/* Exclude Irrelevant Checkbox */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setExcludeIrrelevant(!excludeIrrelevant)}
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
            ${excludeIrrelevant
              ? 'bg-gray-400 border-gray-400'
              : 'bg-white border-gray-300'
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
