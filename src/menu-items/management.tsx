// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { UserSquare, SaveAdd, Fatrows, Profile, User, TicketStar, Folder, Additem } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  userSquare: UserSquare,
  saveAdd: SaveAdd,
  list: Fatrows,
  profile: Profile,
  user: User,
  ticketStar: TicketStar,
  folder: Folder,
  addItem: Additem
};

const management: NavItemType = {
  id: 'group-management',
  title: <FormattedMessage id="management" />,
  type: 'group',
  children: [
    {
      id: 'portfolios',
      title: <FormattedMessage id="portfolios" />,
      type: 'collapse',
      icon: icons.folder,
      children: [
        {
          id: 'portfolios-add',
          title: <FormattedMessage id="portfolios-add" />,
          url: '/management/portfolios/form',
          icon: icons.addItem,
          type: 'item'
        },
        {
          id: 'portfolios-list',
          title: <FormattedMessage id="portfolios-list" />,
          url: '/management/portfolios/list',
          icon: icons.list,
          type: 'item'
        },
      ]
    }
  ]
};

export default management;
