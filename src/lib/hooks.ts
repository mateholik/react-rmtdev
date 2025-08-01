import { useContext, useEffect, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchJobItem, fetchJobItems, handleError } from './utils';
import { JobItemExpanded, PaginationDirection, SortBy } from './types';
import { VISIBLE_ITEMS_PER_PAGE } from './constants';
import { BookmarksContext } from '../contexts/BookmarsContextProvider';
import { ActiveIdContext } from '../contexts/ActiveIdContextProvider';

export function useSearchQuery(searchText: string) {
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

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['job-item', id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60, // refetch every hour
      refetchOnWindowFocus: false, // on tab swithing
      retry: false,
      enabled: !!id,
      onError: handleError,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => Boolean(jobItem)) as JobItemExpanded[]; // Filter out undefined jobItems
  // .filter((jobItem) => jobItem !== undefined);
  // .filter((jobItem) => !!jobItem); // Filter out undefined jobItems

  const isInitialLoading = results.some((result) => result.isInitialLoading);

  return {
    jobItems,
    isLoading: isInitialLoading,
  } as const;
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

export function useLocalStorage<T>(
  keyName: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const value = localStorage.getItem(keyName);
    return JSON.parse(value || JSON.stringify(initialState));
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [value, keyName]);

  return [value, setValue];
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('BookmarksContext must be used within a provider');
  }
  return context;
}
export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error('ActiveIdContext must be used within a provider');
  }
  return context;
}

export function useClickOutside(
  refs: React.RefObject<HTMLElement>[],
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(event.target as Node))
      ) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [refs, callback]);
}
