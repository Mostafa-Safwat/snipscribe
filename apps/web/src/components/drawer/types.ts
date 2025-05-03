import { SvgIconComponent } from "@mui/icons-material";

export interface DrawerItemProps {
  icon: SvgIconComponent;
  text: string;
  route: string;
  isCollapsed?: boolean;
  selected?: boolean;
}

export interface NavigationItem {
  text: string;
  icon: SvgIconComponent;
  route: string;
  divider?: boolean;
  disabled?: boolean;
}

export interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}

export interface DrawerItemsProps {
  sections: NavigationSection[];
  isCollapsed?: boolean;
}

export interface DrawerHeaderProps {
  open: boolean;
}

export const drawerWidth = 240;
