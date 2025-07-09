import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobItem, fetchJobItems, handleError } from './utils';
import { PaginationDirection, SortBy } from './types';
import { VISIBLE_ITEMS_PER_PAGE } from './constants';

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ['job-items', searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60, // refetch every hour
      refetchOnWindowFocus: false, // on tab swithing
      retry: false,
      enabled: !!searchText,
      onError: handleError,
    }
  );

  const jobItems = data?.jobItems;
  const totalNumberOfResults = jobItems?.length || 0;

  return {
    jobItems,
    isLoading: isInitialLoading,
    totalNumberOfResults,
  } as const;
}

export function useSearchText() {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return {
    searchText,
    handleSearchChange,
  };
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = Number(window.location.hash.slice(1));
      setActiveId(id);
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return activeId;
}

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60, // refetch every hour
      refetchOnWindowFocus: false, // on tab swithing
      retry: false,
      enabled: !!id,
      onError: handleError,
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

export function useDebounce<T>(value: T, time = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), time);
    return () => clearTimeout(timerId);
  }, [value, time]);

  return debouncedValue;
}

export function usePagination(totalNumberOfResults: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (direction: PaginationDirection) => {
    if (direction === 'previous') {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const totalNumberOfPages = totalNumberOfResults / VISIBLE_ITEMS_PER_PAGE;

  return {
    currentPage,
    totalNumberOfPages,
    handleClick,
    setCurrentPage,
  } as const;
}

export function useSort() {
  const [sortBy, setSortBy] = useState<SortBy>('relevant');
  return { sortBy, setSortBy } as const;
}
