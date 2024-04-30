export interface MenuItem {
  icon: string;
  text: string;
  link?: string;
  submenu?: MenuItem[];
}
