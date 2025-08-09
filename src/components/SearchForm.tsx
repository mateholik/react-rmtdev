import { useSearchTextContext } from '../lib/hooks';

export default function SearchForm() {
  const { searchText, handleSearchChange } = useSearchTextContext();
  return (
    <form
      action='#'
      onSubmit={(event) => event.preventDefault()}
      className='search'
    >
      <button type='submit'>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => handleSearchChange(e.target.value)}
        spellCheck='false'
        type='text'
        required
        placeholder='Find remote developer jobs...'
      />
    </form>
  );
}
