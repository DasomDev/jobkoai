import React, { useState } from 'react';

interface EmploymentType {
  id: string;
  label: string;
}

const employmentTypes: EmploymentType[] = [
  { id: 'partTime', label: '알바' },
  { id: 'fullTime', label: '정규직' },
  { id: 'contract', label: '계약직' },
  { id: 'dispatch', label: '파견직' },
  { id: 'youthIntern', label: '청년인턴' },
  { id: 'freelancer', label: '위촉직(프리랜서)' },
  { id: 'trainee', label: '연수생/교육생' }
];

const WorkType: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const maxSelections = 7;

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        if (prev.length < maxSelections) {
          return [...prev, typeId];
        }
        return prev;
      }
    });
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">고용형태</h3>
        <span className="text-sm text-red-500">{selectedTypes.length}/{maxSelections}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {employmentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleTypeToggle(type.id)}
            disabled={!selectedTypes.includes(type.id) && selectedTypes.length >= maxSelections}
            className={`
              p-3 rounded-lg text-sm font-medium transition-colors
              ${selectedTypes.includes(type.id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
              ${!selectedTypes.includes(type.id) && selectedTypes.length >= maxSelections
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
              }
            `}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkType;
