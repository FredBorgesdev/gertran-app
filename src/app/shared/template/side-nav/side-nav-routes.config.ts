import {SideNavInterface} from '../../interfaces/side-nav.type';
import {Permissions} from '../../../authentication/permissions';

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
    submenu: [],
    gertranStaffOnly: true
  },
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
        title: 'Monitoramento/rastreamento',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'eye',
        queryParams: {
          'navbar-closed': true
        },
        submenu: [],
        permission: Permissions.POSITIONS_VIEW_POSITION
      },
      {
        path: '/monitoring-requests/monitoring-requests-list',
        title: 'Solicitações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'database',
        submenu: []
      },
      // {          
      //   path: '/occurrence/occurrence-form',
      //   title: 'Ocorrencia',
      //   iconType: 'nzIcon',
      //   iconTheme: 'outline',
      //   icon: 'database',
      //   submenu: []
      // },
    ]
  },
  {
    path: '/checklists/checklists-list',
    title: 'Check-lists',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'check-square',
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
        submenu: [],
        permission: Permissions.VEHICLES_VIEW_TRUCK
      },
      {
        path: '/wagons/wagons-list',
        title: 'Carretas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'group',
        submenu: [],
        permission: Permissions.VEHICLES_VIEW_WAGON
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
        submenu: [],
        permission: Permissions.AUTH_VIEW_GROUP
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
        submenu: [],
        permission: Permissions.SETTINGS_VIEW_POINT
      },
      {
        path: '/routes/routes-list',
        title: 'Rotas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'node-collapse',
        submenu: [],
        permission: Permissions.SETTINGS_VIEW_ROUTE
      },
      {
        path: '/automations/automations-list',
        title: 'Automações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'robot',
        submenu: [],
        gertranStaffOnly: true
      },
      {
        path: '/operations/operations-list',
        title: 'Operações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'control',
        submenu: [],
        gertranStaffOnly: true
      },
      {
        path: '/terminals/terminals-list',
        title: 'Terminais',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'car',
        submenu: [],
        gertranStaffOnly: true
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
        path: '',
        title: 'Dashboards',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        gertranStaffOnly: false,
        submenu: [
          {
            permission: Permissions.VIEW_DASHBOARD_MONITORING_REQUEST,
            path: 'reports/dashboards/monitoring-requests',
            title: 'Solicitações de monitoramento',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true,
            },
            submenu: [],
          },
          {
            permission: Permissions.VIEW_DASHBOARD_CHECKLIST,
            path: 'reports/dashboards/checklists',
            title: 'Checklists',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
          },
          {
            permission: Permissions.VIEW_DASHBOARD_MAPS,
            path: 'reports/dashboards/maps',
            title: 'Mapa',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
          },
          {
            path: 'reports/dashboards/alerts',
            title: 'Alertas',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            permission: Permissions.VIEW_DASHBOARD_ALERT,
            queryParams: {
              fullscreen: true
            },
            submenu: [],
          },
          {
            path: 'reports/dashboards/client',
            title: 'Cliente',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            oneOfPermissions: [
              Permissions.VIEW_DASHBOARD_MONITORING_REQUEST,
              Permissions.VIEW_DASHBOARD_CHECKLIST,
              Permissions.VIEW_DASHBOARD_MAPS,
            ]
          },
          {
            path: 'reports/dashboards/tc1',
            title: 'TC1',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            oneOfPermissions: [
              Permissions.VIEW_DASHBOARD_TC1
            ]
          },
          {
            path: 'reports/dashboards/tc2',
            title: 'TC2',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            permission:Permissions.VIEW_DASHBOARD_TC2
          },
          {
            path: 'reports/dashboards/tc3',
            title: 'TC3',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            permission:Permissions.VIEW_DASHBOARD_TC3
          },
          {
            path: 'reports/dashboards/tv1',
            title: 'TV 1',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            gertranStaffOnly: true,
          }
        ]
      },
      {
        path: '',
        title: 'Viagens monitoradas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: [
          // {
          //   path: '/reports/load-unload-by-macro',
          //   title: 'Carga e descarga por Macro',
          //   iconType: 'nzIcon',
          //   iconTheme: 'outline',
          //   icon: 'bar-chart',
          //   submenu: [],
          //   permission: Permissions.REPORTS_VIEW_LOAD_AND_UNLOAD_REPORT
          // },
          // {
          //   path: '/reports/load-unload-by-point',
          //   title: 'Carga e descarga por Ponto',
          //   iconType: 'nzIcon',
          //   iconTheme: 'outline',
          //   icon: 'bar-chart',
          //   queryParams: {
          //     'navbar-closed': true
          //   },
          //   submenu: [],
          //   permission: Permissions.REPORTS_VIEW_LOAD_AND_UNLOAD_BY_POINT_REPORT
          // },
          // {
          //   path: '/reports/load-unload-by-radius',
          //   title: 'Carga e descarga por Ponto Raio',
          //   iconType: 'nzIcon',
          //   iconTheme: 'outline',
          //   icon: 'bar-chart',
          //   submenu: [],
          // },
          {
            path: '/reports/trips-late',
            title: 'Viagens em atraso',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              'navbar-closed': true
            },
            submenu: [],
            permission: Permissions.REPORTS_VIEW_DELAYED_TRIPS_REPORT
          },
          {
            path: '/reports/travel-requests',
            title: 'Solicitações',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
          },
          {
            path: '/reports/available-vehicles',
            title: 'Veiculos liberados',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              'navbar-closed': true
            },
            submenu: [],
            permission: Permissions.REPORTS_VIEW_VEHICLES_RELESED_REPORT
          },
          // {
          //   path: '/reports/logistics',
          //   title: 'Relatórios Logisticos',
          //   iconType: 'nzIcon',
          //   iconTheme: 'outline',
          //   icon: 'bar-chart',
          //   submenu: [],
          //   permission: Permissions.REPORTS_VIEW_LOGISTIC_REPORT
          // },
          {
            path: '/reports/travel-start',
            title: 'Inicio de viagem',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            permission: Permissions.REPORTS_VIEW_TRAVEL_START_REPORT
          },
          {
            path: '/reports/travel-end',
            title: 'Fim de viagem',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            permission: Permissions.REPORTS_VIEW_TRAVEL_END_REPORT
          },
          {
            path: '/reports/closing',
            title: 'Fechamento',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            gertranStaffOnly: true
          },
          // {
          //   path: '/reports/scheduled-trips',
          //   title: 'Programação de viagens',
          //   iconType: 'nzIcon',
          //   iconTheme: 'outline',
          //   icon: 'bar-chart',
          //   submenu: [],
          //   gertranStaffOnly: true,
          // },
          // {
          //   path: '/reports/insurance-companies',
          //   title: 'Seguradoras',
          //   iconType: 'nzIcon',
          //   iconTheme: 'outline',
          //   icon: 'bar-chart',
          //   submenu: [],
          //   gertranStaffOnly: true,
          // },
        ]
      },
      {
        path: '',
        title: 'Rastreamento',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: [
          {
            path: '/reports/macro-vehicle',
            title: 'Macros do veiculo',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            permission: Permissions.REPORTS_VIEW_MACRO_VEHICLE_REPORT
          },
          {
            path: '/reports/positions-history',
            title: 'Posições do veiculo',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
          },
          {
            path: '/reports/commands-history',
            title: 'Histórico de comandos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            permission: Permissions.REPORTS_VIEW_COMMANDS_HISTORY_REPORT
          },
          {
            path: '/reports/checklist-history',
            title: 'Histórico de check list',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
          },
          {
            path: '/reports/alerts',
            title: 'Histórico de Alertas',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'line-chart',
            submenu: []
          }
        ],
      },
      {
        path: '',
        title: 'Eventos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: [
          {
            path: '/reports/analytical',
            title: 'Relatório analítico',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            permission: Permissions.REPORTS_VIEW_ANALYTICAL_REPORT
          },
          {
            path: '/reports/baits',
            title: 'Relatório de isca',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            gertranStaffOnly: true
          },
          {
            path: '/reports/operational-audit-commands',
            title: 'Auditoria Operacional Comandos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            permission: Permissions.REPORTS_VIEW_MESSAGES_OPERATIONAL_AUDIT_HISTORY_REPORT
          },
          {
            path: '/reports/operational-audit-messages',
            title: 'Auditoria Operacional Mensagens',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            permission: Permissions.REPORTS_VIEW_MESSAGES_OPERATIONAL_AUDIT_HISTORY_REPORT
          },
        ]
      },
      {
        path: '/reports/workday',
        title: 'Relatório de jornada',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: []
      },
      {
        path: '/reports/logisticreport',
        title: 'Relatório logistico',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: []
      },
      {
        path: '/reports/fatiguereport',
        title: 'Relatório de fadiga',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: []
      },
      {
        path: '/reports/incidents',
        title: 'Relatório de ocorrências',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: []
      },
      {
        path: '/reports/panic-history',
        title: 'Relatório de Pânico',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: []
      },
      {
        path: '/reports/technologies',
        title: 'Tecnologias',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: []
      },
      {
        path: '/reports/insurance',
        title: 'Relatório para Seguradoras',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
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
    gertranStaffOnly: true,
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
  },
  {
    path: '',
    title: 'Monitoramento Pessoal',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'user',
    gertranStaffOnly: true,
    submenu: [
      {
        path: '/device/devices-list',
        title: 'Dispositivos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'mobile',
        submenu: []
      },
      {
        path: '/device/personal-monitoring-list',
        title: 'Monitoramento Dispositivos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'eye',
        submenu: []
      },
    ]
  }
];
