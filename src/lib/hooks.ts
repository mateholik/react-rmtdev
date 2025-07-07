import { useEffect, useState } from 'react';
import { BASE_URL } from './constants';
import { JobItem, JobItemExpanded } from './types';
import { useQuery } from '@tanstack/react-query';

export function useJobList(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}?search=${searchText}`);
      const data = await response.json();
      setJobItems(data.jobItems);
      setIsLoading(false);
    };
    if (searchText) fetchData();
  }, [searchText]);

  return { jobItemsSliced, isLoading, totalNumberOfResults };
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

// export function useJobItem(id: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     setIsLoading(true);
//     const fetchData = async () => {
//       const response = await fetch(`${BASE_URL}/${id}`);
//       const data = await response.json();
//       setJobItem(data.jobItem);

//       setIsLoading(false);
//     };
//     fetchData();
//   }, [id]);

//   return { jobItem, isLoading };
// }

export function useJobItem(id: number | null) {
  const { data, isLoading } = useQuery(
    ['job-item', id],
    async () => {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      return data;
    },
    {
      staleTime: 1000 * 60 * 60, // refetch every hour
      refetchOnWindowFocus: false, // on tab swithing
      retry: false,
      enabled: !!id, // on component mount
      onError: () => {},
    }
  );

  const jobItem = data?.jobItem;
  return { jobItem, isLoading };
}

export function useDebounce<T>(value: T, time = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), time);
    return () => clearTimeout(timerId);
  }, [value, time]);

  return debouncedValue;
}
