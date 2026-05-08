"use client";

import { useState, useCallback } from "react";
import { SearchInput } from "@/components/search/search-input";
import { SearchResults } from "@/components/search/search-results";
import type { SearchResult } from "@/lib/search";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="mx-auto max-w-[700px] px-4 py-6">
      <h3 className="mb-4 text-xl font-semibold">검색</h3>
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        loading={loading}
      />
      <div className="mt-6">
        {searched && <SearchResults results={results} query={query} />}
      </div>
    </div>
  );
}
