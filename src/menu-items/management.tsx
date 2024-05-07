// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { UserSquare, SaveAdd, Fatrows, Profile, User, TicketStar, Folder, Additem, Call, Book, Box, Book1, House } from 'iconsax-react';

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
  addItem: Additem,
  call: Call,
  book: Book,
  box: Box,
  book1: Book1,
  house: House
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
        }
      ]
    },
    {
      id: 'contacts',
      title: <FormattedMessage id="contacts" />,
      type: 'item',
      icon: icons.call,
      url: '/management/contacts/list'
    },
    {
      id: 'skills',
      title: <FormattedMessage id="skills" />,
      type: 'item',
      icon: icons.book,
      url: '/management/skills/list'
    },
    {
      id: 'projects',
      title: <FormattedMessage id="projects" />,
      type: 'item',
      icon: icons.box,
      url: '/management/projects/list'
    },
    {
      id: 'courses',
      title: <FormattedMessage id="courses" />,
      type: 'item',
      icon: icons.book1,
      url: '/management/courses/list'
    },
    {
      id: 'professional_experiences',
      title: <FormattedMessage id="professional_experiences" />,
      type: 'item',
      icon: icons.house,
      url: '/management/professional_experiences/list'
    }
  ]
};

export default management;
