import { createContext, useMemo } from 'react';
import {
  usePagination,
  useSearchQuery,
  useSearchTextContext,
  useSort,
} from '../lib/hooks';
import { VISIBLE_ITEMS_PER_PAGE } from '../lib/constants';
import { JobItem, PaginationDirection, SortBy } from '../lib/types';

type JobItemsContextProviderProps = {
  children: React.ReactNode;
};
type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PaginationDirection) => void;
  handleSortByChange: (sortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
  const { debouncedSearchText } = useSearchTextContext();

  const { jobItems, isLoading, totalNumberOfResults } =
    useSearchQuery(debouncedSearchText);

  const {
    currentPage,
    totalNumberOfPages,
    setCurrentPage,
    handleClick: handleChangePage,
  } = usePagination(totalNumberOfResults);

  const { sortBy, setSortBy } = useSort();

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === 'relevant') {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        VISIBLE_ITEMS_PER_PAGE * currentPage - VISIBLE_ITEMS_PER_PAGE,
        VISIBLE_ITEMS_PER_PAGE * currentPage
      ),
    [jobItemsSorted, currentPage]
  );

  const handleSortByChange = (sortBy: SortBy) => {
    setSortBy(sortBy);
    setCurrentPage(1);
  };

  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        jobItemsSortedAndSliced,
        isLoading,
        totalNumberOfResults,
        totalNumberOfPages,
        currentPage,
        sortBy,
        handleChangePage,
        handleSortByChange,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
