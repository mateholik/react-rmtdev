import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header, { HeaderTop } from './Header';
import Logo from './Logo';
import BookmarksButton from './BookmarksButton';
import SearchForm from './SearchForm';
import JobItemContent from './JobItemContent';
import Sidebar, { SidebarTop } from './Sidebar';
import ResultsCount from './ResultsCount';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import SortingControls from './SortingControls';
import { useDebounce, useJobItems, useSearchText } from '../lib/hooks';

import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { PaginationDirection } from '../lib/types';

const VISIBLE_ITEMS_PER_PAGE = 7;

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const { searchText, handleSearchChange } = useSearchText();

  const debouncedSearchText = useDebounce(searchText, 250);

  const { jobItems, isLoading } = useJobItems(debouncedSearchText);

  const totalNumberOfResults = jobItems?.length || 0;
  const jobItemsSliced =
    jobItems?.slice(
      VISIBLE_ITEMS_PER_PAGE * currentPage - VISIBLE_ITEMS_PER_PAGE,
      VISIBLE_ITEMS_PER_PAGE * currentPage
    ) || [];

  const handleClick = (direction: PaginationDirection) => {
    if (direction === 'previous') {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Toaster position='top-right' />
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm
          inputValue={searchText}
          handleOnChange={handleSearchChange}
        />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls currentPage={currentPage} onClick={handleClick} />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
