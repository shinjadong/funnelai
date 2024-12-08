"use client"

import { KeywordMap, KeywordSearch, KeywordDetail } from '@/components/features/keywords'
import { FunnelAI } from '@/components/features/analysis/FunnelAI'
import { useState } from 'react'
import Link from 'next/link';

type SearchIntent = 'i' | 'n' | 'c' | 't';

interface Keyword {
  name: string;
  value: number;
  volumeTotal: number;
  volumeTrend: number;
  cpc: number;
  links?: Array<{
    target: string;
    value: number;
  }>;
  competition: 'LOW' | 'MEDIUM' | 'HIGH';
  competitionIndex: number;
  intent: SearchIntent[];
  features: string[];
}

const allKeywords: Keyword[] = [
  {
    name: "썬패치",
    value: 12020,
    volumeTotal: 156420,
    volumeTrend: -0.76,
    cpc: 0.76,
    links: [
      { target: "골프패치", value: 8436 },
      { target: "자외선 차단 패치", value: 6226 },
      { target: "선패치", value: 4870 },
      { target: "프란츠 투명 썬패치", value: 2563 }
    ],
    competition: "HIGH",
    competitionIndex: 87,
    intent: ["t", "i"],
    features: ["이미지 블록", "관련 질문(PAA)", "동영상 블록"]
  },
  {
    name: "골프패치",
    value: 8436,
    volumeTotal: 98760,
    volumeTrend: -0.65,
    cpc: 0.82,
    links: [
      { target: "자외선 차단 패치", value: 6226 },
      { target: "선패치", value: 4870 }
    ],
    competition: "HIGH",
    competitionIndex: 99,
    intent: ["t", "c"],
    features: ["이미지 블록"]
  },
  {
    name: "자외선 차단 패치",
    value: 6226,
    volumeTotal: 74712,
    volumeTrend: -0.71,
    cpc: 0.65,
    links: [
      { target: "선패치", value: 4870 },
      { target: "프란츠 투명 썬패치", value: 2563 }
    ],
    competition: "HIGH",
    competitionIndex: 100,
    intent: ["t", "i"],
    features: ["이미지 블록", "관련 질문(PAA)", "동영상 블록"]
  },
  {
    name: "선패치",
    value: 4870,
    volumeTotal: 58440,
    volumeTrend: -0.68,
    cpc: 0.58,
    links: [
      { target: "프란츠 투명 썬패치", value: 2563 }
    ],
    competition: "MEDIUM",
    competitionIndex: 75,
    intent: ["t", "c"],
    features: ["이미지 블록"]
  },
  {
    name: "프란츠 투명 썬패치",
    value: 2563,
    volumeTotal: 30756,
    volumeTrend: -0.81,
    cpc: 0.45,
    links: [],
    competition: "LOW",
    competitionIndex: 45,
    intent: ["t", "n"],
    features: ["이미지 블록", "관련 질문(PAA)"]
  }
];

export default function Home() {
  const [keywords, setKeywords] = useState<Keyword[]>(allKeywords);
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword>(allKeywords[0]);
  const [leftKeyword, setLeftKeyword] = useState<string>('썬패치');
  const [rightKeyword, setRightKeyword] = useState<string>('자외선 차단 패치');

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setKeywords(allKeywords);
      return;
    }

    const filteredKeywords = allKeywords.filter(keyword => 
      keyword.name.toLowerCase().includes(query.toLowerCase())
    );

    const relatedKeywords = new Set<string>();
    filteredKeywords.forEach(keyword => {
      keyword.links?.forEach(link => {
        relatedKeywords.add(link.target);
      });
    });

    const result = filteredKeywords.concat(
      allKeywords.filter(keyword => 
        relatedKeywords.has(keyword.name) && 
        !filteredKeywords.find(k => k.name === keyword.name)
      )
    );

    setKeywords(result);
  };

  const handleCompare = (left: string, right: string) => {
    setLeftKeyword(left);
    setRightKeyword(right);
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">퍼널AI로</span>
              <span className="block text-blue-600">
                고객의 여정을 발견하세요
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              강력한 분석과 시각화 도구로 고객의 행동을 이해하세요. 
              키워드를 추적하고, 트렌드를 분석하여 데이터 기반의 의사결정을 내릴 수 있습니다.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
              >
                데모 체험하기
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg"
              >
                문서 보기
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Path Analysis */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              검색경로 분석
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              퍼널AI의 강력한 기능으로 마케팅 전략을 최적화하세요
            </p>
          </div>

          <div className="mt-20">
            <KeywordMap keywords={keywords} onSelectKeyword={setSelectedKeyword} />
            <div className="mt-8">
              <FunnelAI
                leftKeyword={leftKeyword}
                rightKeyword={rightKeyword}
                onCompare={handleCompare}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              주요 기능
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              퍼널AI의 강력한 기능으로 마케팅 전략을 최적화하세요
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      {/* Icon */}
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      검색경로 분석
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      사용자의 검색 패턴을 분석하여 구매 여정을 시각화합니다
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      {/* Icon */}
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      AI 마케팅 전략
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      AI가 분석한 데이터를 바탕으로 최적의 마케팅 전략을 제안합니다
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      {/* Icon */}
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      실시간 트렌드
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      실시간으로 변화하는 키워드 트렌드를 모니터링합니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyword Search */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              키워드 검색
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              퍼널AI의 강력한 기능으로 마케팅 전략을 최적화하세요
            </p>
          </div>

          <div className="mt-20">
            <KeywordSearch onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Keyword Detail */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              키워드 상세 정보
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              퍼널AI의 강력한 기능으로 마케팅 전략을 최적화하세요
            </p>
          </div>

          <div className="mt-20">
            <KeywordDetail keyword={selectedKeyword} />
          </div>
        </div>
      </div>
    </main>
  )
}
