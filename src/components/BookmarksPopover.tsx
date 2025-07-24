import { useBookmarksContext } from '../lib/hooks';
import JobList from './JobList';
import { forwardRef } from 'react';

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { isLoading, bookmarkedJobItems } = useBookmarksContext();
  return (
    <div ref={ref} className='bookmarks-popover'>
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  );
});

export default BookmarksPopover;
