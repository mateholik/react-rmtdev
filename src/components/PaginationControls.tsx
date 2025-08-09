import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { PaginationDirection } from '../lib/types';
import { useJobItemsContext } from '../lib/hooks';

export default function PaginationControls() {
  const { currentPage, totalNumberOfPages, handleChangePage } =
    useJobItemsContext();
  return (
    <section className='pagination'>
      {currentPage > 1 && (
        <PaginationButton
          currentPage={currentPage}
          direction='previous'
          onClick={() => handleChangePage('previous')}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          currentPage={currentPage}
          direction='next'
          onClick={() => handleChangePage('next')}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: PaginationDirection;
  currentPage: number;
  onClick: () => void;
};
function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === 'previous' && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === 'next' && (
        <>
          <ArrowRightIcon />
          Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
