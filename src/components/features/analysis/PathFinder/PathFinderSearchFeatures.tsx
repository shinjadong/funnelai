'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';

export type SearchFeature = 'featured_snippet' | 'image' | 'video' | 'map_pack';

interface PathFinderSearchFeaturesProps {
  onFeaturesChange: (features: SearchFeature[]) => void;
}

const searchFeatureOptions: { value: SearchFeature; label: string; icon: string }[] = [
  {
    value: 'featured_snippet',
    label: '추천스니펫',
    icon: '📌',
  },
  {
    value: 'image',
    label: '이미지',
    icon: '🖼️',
  },
  {
    value: 'video',
    label: '동영상',
    icon: '🎥',
  },
  {
    value: 'map_pack',
    label: 'Map pack',
    icon: '🗺️',
  },
];

export function PathFinderSearchFeatures({
  onFeaturesChange,
}: PathFinderSearchFeaturesProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<SearchFeature[]>([]);

  const handleFeatureToggle = (feature: SearchFeature) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];
    
    setSelectedFeatures(newFeatures);
    onFeaturesChange(newFeatures);
  };

  return (
    <div className={styles.container}>
      <h3>검색 노출 타입</h3>
      <p className="text-sm text-gray-600 mb-4">
        검색 결과에 특별히 노출되는 형태를 기준으로 필터링하세요.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {searchFeatureOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => handleFeatureToggle(option.value)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedFeatures.includes(option.value)
                ? 'border-blue-500 bg-blue-50 transform scale-105'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <span className="text-2xl mb-2">{option.icon}</span>
            <span className="text-sm font-medium text-center">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PathFinderSearchFeatures;
