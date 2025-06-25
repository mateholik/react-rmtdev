export default function SearchForm({ handleOnChange, inputValue }) {
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
        value={inputValue}
        onChange={handleOnChange}
        spellCheck='false'
        type='text'
        required
        placeholder='Find remote developer jobs...'
      />
    </form>
  );
}
