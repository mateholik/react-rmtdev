import BookmarksButton from './BookmarksButton';
import Logo from './Logo';
import SearchForm from './SearchForm';

export default function Header({ handleOnChange, inputValue }) {
  return (
    <header className='header'>
      <div className='header__top'>
        <Logo />
        <BookmarksButton />
      </div>
      <SearchForm inputValue={inputValue} handleOnChange={handleOnChange} />
    </header>
  );
}
