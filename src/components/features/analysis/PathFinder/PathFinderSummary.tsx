import React from 'react';
import { Keyword } from '@/types/keyword';

interface PathFinderSummaryProps {
  keywords: Keyword[];
  topics: string[];
}

const PathFinderSummary: React.FC<PathFinderSummaryProps> = ({
  keywords,
  topics,
}) => {
  // 월 평균 검색량 계산
  const monthlySearchVolume = keywords.reduce(
    (sum, keyword) => sum + (keyword.searchVolume || 0),
    0
  );

  // 연간 총 검색량 계산
  const yearlySearchVolume = monthlySearchVolume * 12;

  // 성별 특성 계산 (임시 데이터)
  const genderDistribution = {
    male: 45,
    female: 55,
  };

  // 연령대별 특성 계산 (임시 데이터)
  const ageDistribution = [
    { range: '12세 이하', percentage: 5 },
    { range: '13-19세', percentage: 15 },
    { range: '20-24세', percentage: 25 },
    { range: '25-29세', percentage: 20 },
    { range: '30-39세', percentage: 20 },
    { range: '40-49세', percentage: 10 },
    { range: '50세 이상', percentage: 5 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">키워드 개수</h3>
          <p className="text-2xl font-semibold">{keywords.length}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">토픽 개수</h3>
          <p className="text-2xl font-semibold">{topics.length}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">월 평균 검색량</h3>
          <p className="text-2xl font-semibold">
            {monthlySearchVolume.toLocaleString()}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">연간 총 검색량</h3>
          <p className="text-2xl font-semibold">
            {yearlySearchVolume.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">성별 특성</h3>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-blue-500"
              style={{ width: `${genderDistribution.male}%` }}
            />
            <div
              className="absolute h-full bg-pink-500"
              style={{
                left: `${genderDistribution.male}%`,
                width: `${genderDistribution.female}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>남성 {genderDistribution.male}%</span>
            <span>여성 {genderDistribution.female}%</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">연령대별 특성</h3>
          <div className="space-y-1">
            {ageDistribution.map((age) => (
              <div key={age.range}>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{age.range}</span>
                  <span>{age.percentage}%</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-blue-500"
                    style={{ width: `${age.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathFinderSummary;
