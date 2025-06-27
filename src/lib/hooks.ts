import { useEffect, useState } from 'react';
import { BASE_URL } from './consts';
import { JobItem, JobItemExpanded } from './types';

export function useJobList(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return [jobItemsSliced, isLoading] as const;
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
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      setJobItem(data.jobItem);
    };
    fetchData();
  }, [id]);

  return jobItem;
}
