import { createContext, useEffect } from 'react';
import { useLocalStorage, useJobItems } from '../lib/hooks';
import { JobItemExpanded } from '../lib/types';

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};
type BookmarksContext = {
  bookmarkedIDs: number[];
  isLoading: boolean;
  bookmarkedJobItems: JobItemExpanded[];
  toggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  const [bookmarkedIDs, setBookmarkedIDs] = useLocalStorage<number[]>(
    'bookmarked-ids',
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIDs);

  const toggleBookmark = (id: number) => {
    setBookmarkedIDs((prev) => {
      const updatedIDs = prev.includes(id)
        ? prev.filter((existingId) => existingId !== id)
        : [...prev, id];

      return updatedIDs;
    });
  };

  useEffect(() => {
    localStorage.setItem('bookmarked-ids', JSON.stringify(bookmarkedIDs));
  }, [bookmarkedIDs]);

  return (
    <BookmarksContext.Provider
      value={{ bookmarkedIDs, toggleBookmark, bookmarkedJobItems, isLoading }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
