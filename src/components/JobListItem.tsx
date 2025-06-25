import BookmarkIcon from './BookmarkIcon';

type JobItem = {
  id: number;
  title: string;
  company: string;
  badgeLetters: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

type JobItemProps = {
  jobItem: JobItem;
};

export default function JobListItem({ jobItem }: JobItemProps) {
  return (
    <li className='job-item'>
      <a className='job-item__link'>
        <div className='job-item__badge'>{jobItem.badgeLetters}</div>

        <div className='job-item__middle'>
          <h3 className='third-heading'>{jobItem.title}</h3>
          <p className='job-item__company'>{jobItem.company}</p>
        </div>

        <div className='job-item__right'>
          <BookmarkIcon />
          <time className='job-item__time'>{jobItem.daysAgo}</time>
        </div>
      </a>
    </li>
  );
}
