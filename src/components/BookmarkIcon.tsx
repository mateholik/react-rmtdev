import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useBookmarksContext } from '../lib/hooks';

type BookmarkIconProps = {
  id: number;
};
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { toggleBookmark, bookmarkedIDs } = useBookmarksContext();
  return (
    <button
      onClick={(e) => {
        toggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className='bookmark-btn'
    >
      <BookmarkFilledIcon
        className={bookmarkedIDs.includes(id) ? 'filled' : ''}
      />
    </button>
  );
}
