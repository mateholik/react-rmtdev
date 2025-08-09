import { useJobItemsContext } from '../lib/hooks';

export default function SortingControls() {
  const { sortBy, handleSortByChange } = useJobItemsContext();
  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>

      <SortingButton
        isActive={sortBy === 'relevant'}
        onClick={() => handleSortByChange('relevant')}
      >
        Relevant
      </SortingButton>
      <SortingButton
        isActive={sortBy === 'recent'}
        onClick={() => handleSortByChange('recent')}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
};

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${
        isActive ? 'sorting__button--active' : ''
      }`}
    >
      {children}
    </button>
  );
}
