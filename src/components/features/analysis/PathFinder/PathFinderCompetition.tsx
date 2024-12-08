import React, { useState } from 'react';

export type CompetitionLevel = 'low' | 'medium' | 'high';

interface PathFinderCompetitionProps {
  onCompetitionChange: (levels: CompetitionLevel[]) => void;
}

const competitionOptions: {
  value: CompetitionLevel;
  label: string;
  range: string;
  color: string;
}[] = [
  {
    value: 'low',
    label: '낮음',
    range: '0-33',
    color: 'bg-green-100 border-green-500 text-green-700',
  },
  {
    value: 'medium',
    label: '중간',
    range: '34-66',
    color: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  },
  {
    value: 'high',
    label: '높음',
    range: '67-100',
    color: 'bg-red-100 border-red-500 text-red-700',
  },
];

const PathFinderCompetition: React.FC<PathFinderCompetitionProps> = ({
  onCompetitionChange,
}) => {
  const [selectedLevels, setSelectedLevels] = useState<CompetitionLevel[]>([]);

  const handleLevelToggle = (level: CompetitionLevel) => {
    const newLevels = selectedLevels.includes(level)
      ? selectedLevels.filter((l) => l !== level)
      : [...selectedLevels, level];
    
    setSelectedLevels(newLevels);
    onCompetitionChange(newLevels);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-2">광고 경쟁도</h2>
      <p className="text-sm text-gray-600 mb-4">
        키워드의 광고 경쟁 수준에 따라 필터링하세요.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        {competitionOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => handleLevelToggle(option.value)}
            className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedLevels.includes(option.value)
                ? option.color
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{option.label}</h3>
              <span className="text-sm font-medium">{option.range}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  option.value === 'low'
                    ? 'bg-green-500 w-1/3'
                    : option.value === 'medium'
                    ? 'bg-yellow-500 w-2/3'
                    : 'bg-red-500 w-full'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathFinderCompetition;
