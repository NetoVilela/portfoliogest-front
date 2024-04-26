import { getAdmin } from './admin';
import dashboard from './dashboard';
import management from './management';
import { NavItemType } from 'types/menu';

export const getMenuItems = (profileId: number, customerId: string) => {
  let menuItems: { items: NavItemType[] };

  const admin = getAdmin(profileId);

  switch (profileId) {
    case 1: // Administrator
      menuItems = {
        items: [dashboard, admin, management]
      };
      break;
    default:
      menuItems = {
        items: [dashboard, admin, management]
      };
      break;
  }

  return menuItems;
};
