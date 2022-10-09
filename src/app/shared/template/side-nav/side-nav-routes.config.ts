import { SideNavInterface } from '../../interfaces/side-nav.type';
export const ROUTES: SideNavInterface[] = [
  {
    path: '/dashboard/home',
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
    title: 'Monitoramento',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'eye',
    submenu: [
      {
        path: '/monitoring/monitoring-list',
        title: 'Dashboard',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'eye',
        submenu: []
      },
      {
        path: '/monitoring-requests/monitoring-requests-list',
        title: 'Solicitações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'database',
        submenu: []
      },
    ]
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
    path: '',
    title: 'Acessos',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'lock',
    submenu: [
      {
        path: '/groups/groups-list',
        title: 'Grupos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'lock',
        submenu: []
      },
      {
        path: '/users/users-list',
        title: 'Usuários',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'user',
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Configurações',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'setting',
    submenu: [
      {
        path: '/stops/stops-list',
        title: 'Pontos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'pushpin',
        submenu: []
      },
      {
        path: '/routes/routes-list',
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
      },
      {
        path: '/operations/operations-list',
        title: 'Operações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'control',
        submenu: []
      },
      {
        path: '/terminals/terminals-list',
        title: 'Terminais',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'car',
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
        path: '/dashboard/reports1',
        title: 'Violações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports2',
        title: 'Inicio de Viagem',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports3',
        title: 'Carga e descarga',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports4',
        title: 'Viagens em atraso',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports5',
        title: 'Solicitação',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports6',
        title: 'Veiculos liberados',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports7',
        title: 'Fim de viagem',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports8',
        title: 'Fechamento',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports9',
        title: 'Macros',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports10',
        title: 'Posições',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports11',
        title: 'Alertas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports12',
        title: 'Comandos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports13',
        title: 'Checklist',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports14',
        title: 'Temperatura',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/dashboard/reports15',
        title: 'Analítico',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Definições',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'book',
    submenu: [
      {
        path: '/insurance-companies/insurance-companies-list',
        title: 'Seguradoras',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'heart',
        submenu: []
      },
      {
        path: '/document-types/document-types-list',
        title: 'Tipos de Documentos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'idcard',
        submenu: []
      },
      {
        path: '/vehicle-manufacturers/vehicle-manufacturers-list',
        title: 'Construtoras',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'car',
        submenu: []
      },
      {
        path: '/tracker-technologies/tracker-technologies-list',
        title: 'Tecnologias',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'wifi',
        submenu: []
      },
      {
        path: '/vehicle-model-types/vehicle-model-types-list',
        title: 'Tipos de veiculos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'car',
        submenu: []
      },
      {
        path: '/vehicle-peripherals/vehicle-peripherals-list',
        title: 'Periféricos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'car',
        submenu: []
      },
    ]
  }
];
