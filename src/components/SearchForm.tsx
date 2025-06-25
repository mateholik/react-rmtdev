type SearchFormProps = {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
};

export default function SearchForm({
  handleOnChange,
  inputValue,
}: SearchFormProps) {
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
