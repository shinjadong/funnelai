import React, { useState } from 'react';
import { Keyword } from '@/types/keyword';

interface PathFinderSearchProps {
  onSearch: (keywords: string[]) => void;
  isLoading?: boolean;
}

const PathFinderSearch: React.FC<PathFinderSearchProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [keywordInput, setKeywordInput] = useState('');
  const [keywordList, setKeywordList] = useState<string[]>([]);

  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return;
    setKeywordList((prev) => [...prev, keywordInput.trim()]);
    setKeywordInput('');
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywordList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    if (keywordList.length === 0) return;
    onSearch(keywordList);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">키워드 검색</h2>
        <p className="text-sm text-gray-600 mb-4">
          같은 층위의 키워드를 입력하면 더 좋은 인사이트를 얻을 수 있습니다.
          (예: 브랜드 키워드 / 논브랜드 키워드)
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="키워드를 입력하세요"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleAddKeyword}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            추가
          </button>
        </div>
      </div>

      {keywordList.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">입력된 키워드</h3>
          <div className="flex flex-wrap gap-2">
            {keywordList.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700"
              >
                {keyword}
                <button
                  onClick={() => handleRemoveKeyword(index)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSearch}
        disabled={keywordList.length === 0 || isLoading}
        className={`w-full px-4 py-2 rounded-lg text-white transition-colors ${
          keywordList.length === 0 || isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? '검색 중...' : '검색하기'}
      </button>
    </div>
  );
};

export default PathFinderSearch;
