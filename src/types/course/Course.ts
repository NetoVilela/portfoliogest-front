export type ICourse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  name: string;
  institution: string;
  institutionAcronym: string;
  degree: number;
  situation: string;
  monthStart: number;
  yearStart: number;
  monthEnd: number;
  yearEnd: number;
  description: string;
};
