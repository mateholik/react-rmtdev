import { createContext, useEffect, useState } from 'react';

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};
type BookmarksContext = {
  bookmarkedIDs: number[];
  toggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  const [bookmarkedIDs, setBookmarkedIDs] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('bookmarked-ids') || '[]')
  );

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
    <BookmarksContext.Provider value={{ bookmarkedIDs, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
