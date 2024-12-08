"use client"

import { useState } from 'react';

interface KeywordSearchProps {
  onSearch: (query: string) => void;
}

export default function KeywordSearch({ onSearch }: KeywordSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative max-w-xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="키워드를 입력하세요"
          className="w-full px-4 py-3 text-lg bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-white placeholder-white/50"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          검색
        </button>
      </div>
    </form>
  );
}
