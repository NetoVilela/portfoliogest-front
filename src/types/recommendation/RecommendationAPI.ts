type Link = {
  link: string;
};

type Log = {
  text: string;
};

export type IRecommendationAPI = {
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
  recommendationsCategory: {
    name: string;
    icon: string;
    iconColor: string;
  };
  recommedationsPriorityId: number;
  recommendationsPriority: {
    name: string;
  };
  recommendationsSituationId: number;
  recommendationsSituation: {
    name: string;
  };
  ownerUserId: number;
  ownerUser: {
    id: string;
    name: string;
  };
  fixUserId: number;
  recommendationsHiddenId: number;
  recommendationsHidden: {
    name: string;
    days: number;
  };
  recommendationsLink: Link[];
  recommendationsLog: Log[];
  watchVideoLink: string;
  fixUser: {
    id: string;
    name: string;
  };
};
