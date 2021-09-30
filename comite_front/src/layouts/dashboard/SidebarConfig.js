import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import percentFill from '@iconify/icons-eva/percent-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Pessoas',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Doações',
    path: '/dashboard/donation',
    icon: getIcon(percentFill)
  },
];

export default sidebarConfig;
