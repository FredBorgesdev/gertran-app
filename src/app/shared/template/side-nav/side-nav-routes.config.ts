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
        title: 'Violações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Inicio de Viagem',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Carga e descarga',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Viagens em atraso',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Solicitação',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Veiculos liberados',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Fim de viagem',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Fechamento',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Macros',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Posições',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Alertas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Comandos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Checklist',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
        title: 'Temperatura',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bar-chart',
        submenu: []
      },
      {
        path: '/',
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
]
