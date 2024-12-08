import React, { useState } from 'react';

export type SearchIntent = 'informational' | 'navigational' | 'commercial' | 'transactional';

interface PathFinderSearchIntentProps {
  onIntentChange: (intents: SearchIntent[]) => void;
}

const searchIntentOptions: { value: SearchIntent; label: string; description: string }[] = [
  {
    value: 'informational',
    label: '정보형',
    description: '관심 있는 주제에 대한 정보를 찾는 검색',
  },
  {
    value: 'navigational',
    label: '이동형',
    description: '특정 사이트나 매장의 위치를 찾는 검색',
  },
  {
    value: 'commercial',
    label: '상업형',
    description: '제품이나 서비스 유형에 대한 정보를 찾는 검색',
  },
  {
    value: 'transactional',
    label: '거래형',
    description: '구매나 계약을 목적으로 하는 검색',
  },
];

export function PathFinderSearchIntent({
  onIntentChange,
}: PathFinderSearchIntentProps) {
  const [selectedIntents, setSelectedIntents] = useState<SearchIntent[]>([]);

  const handleIntentToggle = (intent: SearchIntent) => {
    const newIntents = selectedIntents.includes(intent)
      ? selectedIntents.filter((i) => i !== intent)
      : [...selectedIntents, intent];
    
    setSelectedIntents(newIntents);
    onIntentChange(newIntents);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-2">검색 인텐트</h2>
      <p className="text-sm text-gray-600 mb-4">
        키워드의 검색 의도에 따라 필터링하세요.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {searchIntentOptions.map((option) => (
          <div
            key={option.value}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              selectedIntents.includes(option.value)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
            onClick={() => handleIntentToggle(option.value)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{option.label}</h3>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedIntents.includes(option.value)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {selectedIntents.includes(option.value) && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PathFinderSearchIntent;
