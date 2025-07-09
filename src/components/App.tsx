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
import {
  useDebounce,
  useJobItems,
  usePagination,
  useSearchText,
} from '../lib/hooks';

import { Toaster } from 'react-hot-toast';
import { VISIBLE_ITEMS_PER_PAGE } from '../lib/constants';

function App() {
  const { searchText, handleSearchChange } = useSearchText();

  const debouncedSearchText = useDebounce(searchText, 250);

  const { jobItems, isLoading, totalNumberOfResults } =
    useJobItems(debouncedSearchText);

  const { currentPage, handleClick, totalNumberOfPages } =
    usePagination(totalNumberOfResults);

  const jobItemsSliced =
    jobItems?.slice(
      VISIBLE_ITEMS_PER_PAGE * currentPage - VISIBLE_ITEMS_PER_PAGE,
      VISIBLE_ITEMS_PER_PAGE * currentPage
    ) || [];

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
          <PaginationControls
            currentPage={currentPage}
            onClick={handleClick}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
