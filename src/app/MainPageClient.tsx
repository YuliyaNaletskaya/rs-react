'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResultsList } from '@/components/ResultsList';
import { SearchBar } from '@/components/SearchBar';
import { Spinner } from '@/components/Spinner';
import { Pagination } from '@/components/Pagination';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Details } from '@/components/Details';
import { SelectedFlyout } from '@/components/SelectedFlyout';
import { useGetCharactersQuery } from '@/utils/api';
import type { Character } from '@/types/types';

interface Props {
  initialPage: number;
  initialDetailsId: string | null;
  initialSearch: string;
  initialData: { characters: Character[]; totalPages: number };
}

export default function MainPageClient({
  initialPage,
  initialDetailsId,
  initialSearch,
  initialData,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useLocalStorage<string>(
    'searchQuery',
    initialSearch
  );
  const [page, setPage] = useState<number>(initialPage);

  const detailsId = searchParams.get('details') ?? initialDetailsId;

  const { data, error, isLoading, isFetching } = useGetCharactersQuery(
    { search: query, page },
    { skip: query === initialSearch && page === initialPage } // чтобы не перезапрашивать сразу
  );

  const activeData = data ?? initialData;

  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <SearchBar
        onSearch={(q) => {
          setQuery(q);
          setPage(1);
          updateParam('search', q);
          updateParam('page', '1');
        }}
        initialValue={query}
      />

      {error && <p style={{ color: 'red' }}>Error loading</p>}
      {(isLoading || isFetching) && <Spinner />}

      <ResultsList
        results={activeData.characters}
        onItemClick={(id) => updateParam('details', id)}
      />

      <Pagination
        currentPage={page}
        totalPages={activeData.totalPages}
        onPageChange={(p) => {
          setPage(p);
          updateParam('page', String(p));
        }}
      />

      {detailsId && (
        <Details
          character={activeData.characters.find((c) => c.uid === detailsId)!}
          onClose={() => updateParam('details')}
        />
      )}

      <SelectedFlyout />
    </div>
  );
}
