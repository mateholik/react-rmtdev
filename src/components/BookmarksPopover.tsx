import { useBookmarksContext } from '../lib/hooks';
import JobList from './JobList';

export default function BookmarksPopover() {
  const { isLoading, bookmarkedJobItems } = useBookmarksContext();
  return (
    <div className='bookmarks-popover'>
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  );
}
