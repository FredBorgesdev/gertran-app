import { SideNavInterface } from '../../interfaces/side-nav.type';
export const ROUTES: SideNavInterface[] = [
  {
    path: '',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: []
  },
  {
    path: '/customers/customers-list',
    title: 'Clientes',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'star',
    submenu: []
  },
  // {
  //   path: '',
  //   title: 'Filiais',
  //   iconType: 'nzIcon',
  //   iconTheme: 'outline',
  //   icon: 'tags',
  //   submenu: []
  // },
  {
    path: '/drivers/drivers-list',
    title: 'Motoristas',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'idcard',
    submenu: []
  },
  {
    path: '',
    title: 'Veículos',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'car',
    submenu: [
      {
        path: '/trucks/trucks-list',
        title: 'Cavalos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'car',
        submenu: []
      },
      {
        path: '/wagons/wagons-list',
        title: 'Carretas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'group',
        submenu: []
      }
    ]
  },
  {
    path: '/users/users-list',
    title: 'Usuários',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'user',
    submenu: []
  },
  {
    path: '',
    title: 'Definições',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'setting',
    submenu: [
      {
        path: '/',
        title: 'Pontos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'pushpin',
        submenu: []
      },
      {
        path: '/',
        title: 'Rotas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'node-collapse',
        submenu: []
      },
      {
        path: '/automations/automations-list',
        title: 'Automações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'robot',
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Relatórios',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'line-chart',
    submenu: [
      {
        path: '/',
        title: 'Relatório A',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Relatório B',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      }
    ]
  }
]
