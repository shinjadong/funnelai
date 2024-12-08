"use client"

import { useState } from 'react'

interface PathFinderControlsProps {
  onZoomChange: (zoom: number) => void
  onVerticalGapChange: (gap: number) => void
  onDepthChange: (depth: number) => void
  onViewChange: (view: 'all' | 'left' | 'right') => void
}

export default function PathFinderControls({
  onZoomChange,
  onVerticalGapChange,
  onDepthChange,
  onViewChange
}: PathFinderControlsProps) {
  const [zoom, setZoom] = useState(50)
  const [verticalGap, setVerticalGap] = useState(30)
  const [depth, setDepth] = useState(3)
  const [view, setView] = useState<'all' | 'left' | 'right'>('all')

  const handleZoomChange = (value: number) => {
    setZoom(value)
    onZoomChange(value)
  }

  const handleVerticalGapChange = (value: number) => {
    setVerticalGap(value)
    onVerticalGapChange(value)
  }

  const handleDepthChange = (value: number) => {
    setDepth(value)
    onDepthChange(value)
  }

  const handleViewChange = (newView: 'all' | 'left' | 'right') => {
    setView(newView)
    onViewChange(newView)
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
      <div>
        <h3 className="font-semibold mb-2">그래프 보기</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleViewChange('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${view === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            ALL
          </button>
          <button
            onClick={() => handleViewChange('left')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${view === 'left'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            LEFT
          </button>
          <button
            onClick={() => handleViewChange('right')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${view === 'right'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            RIGHT
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">확대/축소 (Zoom)</h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="100"
            value={zoom}
            onChange={e => handleZoomChange(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600">{zoom}%</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">세로 간격 (Vertical Gap)</h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="10"
            max="100"
            value={verticalGap}
            onChange={e => handleVerticalGapChange(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600">{verticalGap}px</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">키워드 연결 단계</h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="5"
            value={depth}
            onChange={e => handleDepthChange(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600">{depth}단계</span>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <p>* 노드 크기는 검색량을 나타냅니다</p>
        <p>* 노드 색상은 경쟁도를 나타냅니다 (빨강: 높음, 노랑: 중간, 초록: 낮음)</p>
        <p>* 선의 굵기는 연관도를 나타냅니다</p>
      </div>
    </div>
  )
}
