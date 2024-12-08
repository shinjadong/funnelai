import React, { useState } from 'react';

interface PathFinderIncludeWordsProps {
  onWordsChange: (words: string[]) => void;
}

const PathFinderIncludeWords: React.FC<PathFinderIncludeWordsProps> = ({
  onWordsChange,
}) => {
  const [wordInput, setWordInput] = useState('');
  const [includeWords, setIncludeWords] = useState<string[]>([]);

  const handleAddWord = () => {
    if (!wordInput.trim()) return;
    const newWords = [...includeWords, wordInput.trim()];
    setIncludeWords(newWords);
    setWordInput('');
    onWordsChange(newWords);
  };

  const handleRemoveWord = (index: number) => {
    const newWords = includeWords.filter((_, i) => i !== index);
    setIncludeWords(newWords);
    onWordsChange(newWords);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddWord();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">포함 단어</h2>
        <p className="text-sm text-gray-600 mb-4">
          토픽 내에서 특정 단어가 포함된 키워드만 보고 싶을 때 사용하세요.
          여러 단어를 동시에 입력할 수 있습니다.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="포함할 단어를 입력하세요"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleAddWord}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            추가
          </button>
        </div>
      </div>

      {includeWords.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">적용된 포함 단어</h3>
          <div className="flex flex-wrap gap-2">
            {includeWords.map((word, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700"
              >
                {word}
                <button
                  onClick={() => handleRemoveWord(index)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PathFinderIncludeWords;
