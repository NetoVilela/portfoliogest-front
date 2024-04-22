// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { UserSquare, SaveAdd, Fatrows, Profile, User, TicketStar, Folder } from 'iconsax-react';

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
  folder: Folder
};

const management: NavItemType = {
  id: 'group-management',
  title: <FormattedMessage id="management" />,
  type: 'group',
  children: [
    {
      id: 'portfolios',
      title: <FormattedMessage id="portfolios" />,
      type: 'item',
      url: '/gestao/portfolios/listar',
      icon: icons.folder
    }
  ]
};

export default management;
