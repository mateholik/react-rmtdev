import { createContext, useState } from 'react';
import { useDebounce } from '../lib/hooks';

type SearchTextContext = {
  debouncedSearchText: string;
  searchText: string;
  handleSearchChange: (newSearxhText: string) => void;
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

const SearchTextContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (newSearxhText: string) => {
    setSearchText(newSearxhText);
  };

  const debouncedSearchText = useDebounce(searchText, 250);

  return (
    <SearchTextContext.Provider
      value={{ debouncedSearchText, searchText, handleSearchChange }}
    >
      {children}
    </SearchTextContext.Provider>
  );
};

export default SearchTextContextProvider;
