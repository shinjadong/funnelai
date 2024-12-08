"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

type SearchIntent = 'i' | 'n' | 'c' | 't';

interface Keyword {
  name: string
  value: number
  volumeTotal: number
  volumeTrend: number
  cpc: number
  links?: Array<{
    target: string
    value: number
  }>
  competition: 'LOW' | 'MEDIUM' | 'HIGH'
  competitionIndex: number
  intent: SearchIntent[]
  features: string[]
}

interface KeywordMapProps {
  keywords: Keyword[]
  onSelectKeyword: (keyword: Keyword) => void
}

const getCompetitionColor = (competition: 'LOW' | 'MEDIUM' | 'HIGH') => {
  switch (competition) {
    case 'HIGH':
      return '#ef4444';
    case 'MEDIUM':
      return '#eab308';
    case 'LOW':
      return '#22c55e';
    default:
      return '#3b82f6';
  }
};

const getIntentSymbol = (intents: SearchIntent[]) => {
  if (intents.includes('t')) return 'circle';
  if (intents.includes('c')) return 'rect';
  if (intents.includes('i')) return 'triangle';
  if (intents.includes('n')) return 'diamond';
  return 'circle';
};

export default function KeywordMap({ keywords, onSelectKeyword }: KeywordMapProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts>()

  useEffect(() => {
    if (!chartRef.current) return

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current)
    }

    const nodes = keywords.map(keyword => ({
      id: keyword.name,
      name: keyword.name,
      value: keyword.value,
      symbolSize: Math.max(20, Math.log10(keyword.value) * 10),
      itemStyle: {
        color: getCompetitionColor(keyword.competition)
      },
      symbol: getIntentSymbol(keyword.intent),
      tooltip: {
        formatter: () => `
          <div class="font-sans">
            <div class="font-bold">${keyword.name}</div>
            <div>월간 검색량: ${keyword.value.toLocaleString()}</div>
            <div>총 검색량: ${keyword.volumeTotal.toLocaleString()}</div>
            <div>트렌드: ${(keyword.volumeTrend * 100).toFixed(1)}%</div>
            <div>CPC: $${keyword.cpc.toFixed(2)}</div>
            <div>경쟁도: ${keyword.competition} (${keyword.competitionIndex})</div>
            <div>검색 의도: ${keyword.intent.join(', ')}</div>
          </div>
        `
      }
    }))

    const links = keywords.flatMap(keyword =>
      keyword.links?.map(link => ({
        source: keyword.name,
        target: link.target,
        value: link.value
      })) || []
    )

    const option = {
      tooltip: {},
      legend: [
        {
          data: ['HIGH', 'MEDIUM', 'LOW'].map(level => ({
            name: level,
            itemStyle: {
              color: getCompetitionColor(level as 'LOW' | 'MEDIUM' | 'HIGH')
            }
          }))
        }
      ],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: 'Keyword Map',
          type: 'graph',
          layout: 'force',
          data: nodes,
          links,
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
          },
          force: {
            repulsion: 100
          }
        }
      ],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            title: '이미지로 저장',
            name: 'keyword-map',
            pixelRatio: 2
          }
        }
      }
    }

    chartInstance.current.setOption(option)

    chartInstance.current.on('click', (params) => {
      if (params.dataType === 'node') {
        const keyword = keywords.find(k => k.name === params.data.name)
        if (keyword) {
          onSelectKeyword(keyword)
        }
      }
    })

    const handleResize = () => {
      chartInstance.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [keywords, onSelectKeyword])

  return (
    <div className="w-full">
      <div ref={chartRef} className="w-full h-[600px]" />
      <div className="mt-4 text-sm text-gray-500">
        <p>* 노드 크기는 검색량을 나타냅니다</p>
        <p>* 노드 색상은 경쟁도를 나타냅니다 (빨강: 높음, 노랑: 중간, 초록: 낮음)</p>
        <p>* 노드 모양은 주요 검색 의도를 나타냅니다 (원: 거래형, 사각형: 상업형, 삼각형: 정보형, 다이아몬드: 이동형)</p>
      </div>
    </div>
  )
}
