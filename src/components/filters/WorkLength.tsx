import React, { useState } from 'react';

interface WorkPeriod {
  id: string;
  label: string;
  description?: string;
}

const workPeriods: WorkPeriod[] = [
  { id: '1day', label: '하루(1일)' },
  { id: 'lessThan1Week', label: '1주일이하' },
  { id: '1WeekTo1Month', label: '1주일~1개월' },
  { id: '1MonthTo3Months', label: '1개월~3개월' },
  { id: '3MonthsTo6Months', label: '3개월~6개월' },
  { id: '6MonthsTo1Year', label: '6개월~1년' },
  { id: 'moreThan1Year', label: '1년이상' }
];

const WorkLength: React.FC = () => {
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const maxSelections = 6;

  const handlePeriodToggle = (periodId: string) => {
    setSelectedPeriods(prev => {
      if (prev.includes(periodId)) {
        return prev.filter(id => id !== periodId);
      } else {
        if (prev.length < maxSelections) {
          return [...prev, periodId];
        }
        return prev;
      }
    });
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">근무기간</h3>
        <span className="text-sm text-red-500">{selectedPeriods.length}/{maxSelections}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {workPeriods.map((period) => (
          <button
            key={period.id}
            onClick={() => handlePeriodToggle(period.id)}
            disabled={!selectedPeriods.includes(period.id) && selectedPeriods.length >= maxSelections}
            className={`
              p-3 rounded-lg text-sm font-medium transition-colors
              ${selectedPeriods.includes(period.id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
              ${!selectedPeriods.includes(period.id) && selectedPeriods.length >= maxSelections
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
              }
            `}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkLength;
