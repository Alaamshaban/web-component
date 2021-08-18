export interface NavItemModel {
  title: string;
  path: string;
  src?: string;
  icon?: string;
  queries?: { [k: string]: any };
  pages?: NavItemModel[];
  allowedPermissions?: string[];
  show?: boolean;
  selected?: boolean;
  type?: string;
  confirm?: boolean;
  expanded?: boolean;
  parent?: string;
}

export interface NavDataModel {
  title: string;
  showIframe?: boolean;
  showSideNav: boolean;
  isSideMode?: boolean;
  sideNavType?: string;
  mode?: string;
  sideNav: NavItemModel[];
  path: string;
  isOpenedByDefault?: boolean;
  disableToggleWhenLinkClicked?: boolean;
  apps?: any;
  // hasBackdrop: boolean;
}

