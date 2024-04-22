// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { UserSquare, SaveAdd, Fatrows, Profile, User } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  userSquare: UserSquare,
  saveAdd: SaveAdd,
  list: Fatrows,
  profile: Profile,
  user: User
};

export const getAdmin = (profileId: number) => {
  const admin: NavItemType = {
    id: 'group-admin',
    title: <FormattedMessage id="admin" />,
    type: 'group',
    children: [
      ...(profileId === 1 //
        ? []
        : []),
      {
        id: 'users',
        title: <FormattedMessage id="users" />,
        type: 'item',
        url: '/admin/users/list',
        icon: icons.user
      }
    ]
  };
  return admin;
};
