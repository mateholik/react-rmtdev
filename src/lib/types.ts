export type JobItem = {
  id: number;
  title: string;
  company: string;
  badgeLetters: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: Array<string>;
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyUrl: string;
};

export type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};
export type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

export type PaginationDirection = 'previous' | 'next';

export type SortBy = 'relevant' | 'recent';
