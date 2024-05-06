export type IProject = {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  title: string;
  description: string;
  situation: 'schematized' | 'in_development' | 'finished';
  link: string;
};
