type Link = {
  link: string;
};

type Log = {
  text: string;
};

export type IRecommendation = {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  icon: string;
  findingTitle: string;
  userImpact: string;
  dateFound: string;
  completion: string;
  findingText: string;
  recommendationText: string;
  impactText: string;
  hidden: number;
  recommendationsCategoryId: number;
  recommendationsCategoryName: string;
  recommedationsPriorityId: number;
  recommendationsPriorityName: string;
  recommendationsSituationId: number;
  recommendationsSituationName: string;
  ownerUserId: number;
  ownerUserName: string;
  fixUserId: number;
  recommendationsHiddenId: number;
  recommendationsHidden: {
    name: string;
    days: number;
  };
  recommendationsLink: Link[];
  recommendationsLog: Log[];
  watchVideoLink: string;
  fixUserName: string;
};
