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
