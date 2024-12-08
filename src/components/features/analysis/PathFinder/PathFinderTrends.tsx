import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Keyword } from '@/types/keyword';

interface PathFinderTrendsProps {
  keywords: Keyword[];
}

const PathFinderTrends: React.FC<PathFinderTrendsProps> = ({ keywords }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  // 상위 5개 키워드 추출
  const top5Keywords = [...keywords]
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, 5);

  // 최근 2년간의 월별 데이터 생성 (임시 데이터)
  const generateMonthlyData = () => {
    const months = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
      );
    }
    return months;
  };

  const months = generateMonthlyData();

  // 임시 트렌드 데이터 생성
  const generateTrendData = (baseVolume: number) => {
    return months.map(() => {
      const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 ~ 1.2
      return Math.round(baseVolume * randomFactor);
    });
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option = {
      title: {
        text: '검색량 추이',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: top5Keywords.map((k) => k.name),
        top: 30,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'K';
            }
            return value;
          },
        },
      },
      series: top5Keywords.map((keyword) => ({
        name: keyword.name,
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series',
        },
        data: generateTrendData(keyword.searchVolume || 0),
      })),
    };

    chartInstance.current.setOption(option);

    return () => {
      chartInstance.current?.dispose();
    };
  }, [keywords]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div ref={chartRef} style={{ height: '400px' }} />
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          onClick={() => {
            // TODO: 데이터 다운로드 기능 구현
            console.log('Download data');
          }}
        >
          데이터 다운로드
        </button>
      </div>
    </div>
  );
};

export default PathFinderTrends;
