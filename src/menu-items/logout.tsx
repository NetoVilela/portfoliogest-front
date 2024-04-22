import { FormattedMessage } from 'react-intl';
import { HomeTrendUp } from 'iconsax-react';
import { NavItemType } from 'types/menu';

const logout: NavItemType = {
  id: 'group-logout',
  title: <FormattedMessage id="logout" />,
  type: 'group',
  children: [
    {
      id: 'logout',
      title: <FormattedMessage id="logout" />,
      type: 'item',
      icon: HomeTrendUp,
      url: '/auth/logout'
    }
  ]
};

export default logout;
