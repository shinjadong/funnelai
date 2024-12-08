'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export function FunnelAI() {
  // 초기 상태값을 명시적으로 설정
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMode, setSelectedMode] = useState<string>('패스파인더');
  const [selectedRegion, setSelectedRegion] = useState<string>('KR');
  const [searchTerm, setSearchTerm] = useState<string>('마스크팩');
  const [viewMode, setViewMode] = useState<string>('전체');
  const [timeRange, setTimeRange] = useState<string>('검색량');
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const chartRef = useRef<SVGSVGElement>(null);

  // Sample data for D3 component
  const sampleData = {
    nodes: [
      { id: "1", name: "전체 방문자", value: 1000, color: "#4A90E2", icon: "" },
      { id: "2", name: "상품 조회", value: 800, color: "#50E3C2", icon: "" },
      { id: "3", name: "장바구니", value: 400, color: "#F5A623", icon: "" },
      { id: "4", name: "구매", value: 200, color: "#7ED321", icon: "" }
    ],
    links: [
      { source: "1", target: "2", value: 800, color: "#4A90E2" },
      { source: "2", target: "3", value: 400, color: "#50E3C2" },
      { source: "3", target: "4", value: 200, color: "#F5A623" }
    ]
  };

  const handleNodeClick = (node: any) => {
    console.log('Node clicked:', node);
  };

  const toggleFullscreen = () => {
    if (typeof document !== 'undefined') {
      setIsFullscreen(!isFullscreen);
    }
  };

  const toggleLegend = () => {
    setIsLegendOpen(!isLegendOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Send message:', message);
      setMessage('');
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (typeof window !== 'undefined') {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.application}>
      <div className={styles.main}>
        {/* Mode Tabs */}
        <div className={styles.modeTabs}>
          <button className={styles.modeTab}> 인텐트파인더</button>
          <button className={`${styles.modeTab} ${styles.active}`}> 패스파인더</button>
          <button className={styles.modeTab}> 클러스터파인더</button>
        </div>

        {/* Search Controls */}
        <div className={styles.searchControls}>
          <div className={styles.searchWrapper}>
            <select className={styles.searchType}>
              <option value="패스북"> 패스북</option>
            </select>
            <select className={styles.region}>
              <option value="KR"> KR</option>
            </select>
            <div className={styles.searchBox}>
              <input type="text" placeholder="마스크팩" />
              <button className={styles.searchButton}>
                
              </button>
            </div>
          </div>
          <div className={styles.viewControls}>
            <select className={styles.viewMode} value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
              <option value="전체"> 전체</option>
              <option value="정보형"> 정보형</option>
              <option value="구매형"> 구매형</option>
            </select>
            <select className={styles.timeRange} value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="검색량"> 검색량</option>
              <option value="6개월"> 6개월</option>
              <option value="1년"> 1년</option>
            </select>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.chartSection}>
            <div className={styles.controlsTop}>
              <div className={styles.leftControls}>
                <button className={styles.categoryBtn}>
                   카테고리
                </button>
              </div>
              <div className={styles.rightControls}>
                <button className={styles.downloadBtn}>
                  
                </button>
                <button 
                  className={styles.fullscreenBtn}
                  onClick={toggleFullscreen}
                >
                  
                </button>
              </div>
            </div>
            <div className={styles.chartArea}>
              <svg ref={chartRef} style={{ width: '100%', height: '100%' }}>
                
              </svg>
            </div>
          </div>
          
          {/* AI Assistant Panel */}
          <div className={styles.assistantPanel}>
            <div className={styles.assistantHeader}>
              <div className={styles.assistantInfo}>
                <div className={styles.assistantAvatar}>🤖</div>
                <div className={styles.assistantName}>
                  <h3>마케팅 어시스턴트</h3>
                  <span>실시간 분석 및 전략 추천</span>
                </div>
              </div>
            </div>

            <div className={styles.assistantContent}>
              <div className={styles.messageList}>
                <div className={styles.messageAI}>
                  <div className={styles.messageContent}>
                    <h4>퍼널 분석 결과</h4>
                    <ul>
                      <li>전체 방문자 중 50%가 상품을 조회하고 있습니다.</li>
                      <li>장바구니 전환율은 25%로, 업계 평균보다 높습니다.</li>
                      <li>최종 구매 전환율은 12.5%입니다.</li>
                    </ul>
                  </div>
                </div>
                
                <div className={styles.messageAI}>
                  <div className={styles.messageContent}>
                    <h4>전략 추천</h4>
                    <ul>
                      <li>장바구니 페이지에서의 이탈률이 높습니다. 장바구니 단계에서 할인 쿠폰을 제공하는 것을 고려해보세요.</li>
                      <li>상품 조회 후 장바구니 전환율을 높이기 위해 관련 상품 추천을 강화하세요.</li>
                      <li>재방문 고객의 구매율이 높습니다. 이메일 마케팅을 통한 재방문 유도를 추천합니다.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.assistantActions}>
                <button className={styles.actionButton}>
                   상세 분석
                </button>
                <button className={styles.actionButton}>
                   전략 제안
                </button>
                <button className={styles.actionButton}>
                   보고서 생성
                </button>
              </div>

              <div className={styles.chatInput}>
                <input 
                  type="text" 
                  placeholder="분석 결과나 전략에 대해 질문하세요..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
