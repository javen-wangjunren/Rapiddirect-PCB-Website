export type AdminNavItem = {
  label: string;
  href: string;
  icon?: string;
  /** If true, do not highlight based on `activePath.startsWith(href)` */
  exact?: boolean;
};

export type AdminNavGroup = {
  title?: string;
  items: AdminNavItem[];
};

/**
 * Admin IA (Task 1)
 *
 * 现网后台入口（仅保留已存在的页面/能力）：
 * - 登录：/login/
 * - Pages 列表：/admin/pages/
 * - Page 编辑：/admin/pages/edit/?slug=...
 * - Media Library：/admin/media/
 *
 * 参考风格图中 “Search/Help/Notifications/Users/Settings/Logs”等模块在现网不存在，
 * 这里不放入导航（仅保留“内容管理”相关入口 + 前台查看入口）。
 */
export const adminNavGroups: AdminNavGroup[] = [
  {
    title: 'Content',
    items: [
      { label: 'Pages', href: '/admin/pages/', icon: '▦' },
      { label: 'Media', href: '/admin/media/', icon: '▣' }
    ]
  },
  {
    title: 'Global Settings',
    items: [
      { label: 'Header', href: '/admin/global-settings/header/', icon: '⚙' },
      { label: 'Footer', href: '/admin/global-settings/footer/', icon: '⚙' }
    ]
  },
  {
    title: 'Shortcuts',
    items: [{ label: 'View Site', href: '/', icon: '↗', exact: true }]
  }
];
