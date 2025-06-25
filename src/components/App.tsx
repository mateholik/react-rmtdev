import { useEffect, useState } from 'react';
import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import { BASE_URL } from '../lib/consts';

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
      <Header inputValue={inputValue} handleOnChange={handleOnChange} />
      <Container jobItems={jobItems} />
      <Footer />
    </>
  );
}

export default App;
