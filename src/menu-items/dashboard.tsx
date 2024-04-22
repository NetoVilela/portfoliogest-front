import { FormattedMessage } from 'react-intl';
import { HomeTrendUp } from 'iconsax-react';
import { NavItemType } from 'types/menu';

const dashboard: NavItemType = {
  id: 'group-dashboard',
  title: <FormattedMessage id="home" />,
  type: 'group',
  children: [
    {
      id: 'forms-layout',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      icon: HomeTrendUp,
      url: '/dashboard'
    }
  ]
};

export default dashboard;
