import React, { useState } from 'react';
import { Keyword } from '@/types/keyword';

interface PathFinderKeywordListProps {
  keywords: Keyword[];
  onKeywordSelect: (keyword: Keyword) => void;
  selectedKeyword?: Keyword;
}

const PathFinderKeywordList: React.FC<PathFinderKeywordListProps> = ({
  keywords,
  onKeywordSelect,
  selectedKeyword,
}) => {
  const [sortBy, setSortBy] = useState<'volume' | 'competition' | 'alphabetical'>('volume');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedAndFilteredKeywords = keywords
    .filter((keyword) =>
      keyword.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return (b.searchVolume || 0) - (a.searchVolume || 0);
        case 'competition':
          return (b.competition || 0) - (a.competition || 0);
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="검색어 입력..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'volume' | 'competition' | 'alphabetical')}
        >
          <option value="volume">검색량순</option>
          <option value="competition">경쟁도순</option>
          <option value="alphabetical">가나다순</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">키워드</th>
              <th className="px-4 py-2 text-right">검색량</th>
              <th className="px-4 py-2 text-right">경쟁도</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredKeywords.map((keyword) => (
              <tr
                key={keyword.id}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedKeyword?.id === keyword.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => onKeywordSelect(keyword)}
              >
                <td className="px-4 py-2">{keyword.name}</td>
                <td className="px-4 py-2 text-right">{keyword.searchVolume?.toLocaleString()}</td>
                <td className="px-4 py-2 text-right">
                  {keyword.competition ? `${(keyword.competition * 100).toFixed(1)}%` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PathFinderKeywordList;
