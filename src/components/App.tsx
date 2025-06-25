import { useEffect, useState } from 'react';
import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header, { HeaderTop } from './Header';
import { BASE_URL } from '../lib/consts';
import Logo from './Logo';
import BookmarksButton from './BookmarksButton';
import SearchForm from './SearchForm';
import JobItemContent from './JobItemContent';
import Sidebar, { SidebarTop } from './Sidebar';
import ResultsCount from './ResultsCount';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import SortingControls from './SortingControls';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [jobItems, setJobItems] = useState(null);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}?search=${inputValue}`);
      const data = await response.json();
      setJobItems(data.jobItems);
    };
    if (inputValue) fetchData();
  }, [inputValue]);

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm inputValue={inputValue} handleOnChange={handleOnChange} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          {jobItems && <JobList jobItems={jobItems} />}
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
