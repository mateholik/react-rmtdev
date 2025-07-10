import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useContext } from 'react';
import { BookmarksContext } from '../contexts/BookmarsContextProvider';

type BookmarkIconProps = {
  id: number;
};
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('BookmarksContext doesnt exist');
  }
  const { toggleBookmark, bookmarkedIDs } = context;
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
