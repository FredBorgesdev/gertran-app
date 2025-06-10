import { SideNavInterface } from '../../interfaces/side-nav.type';
import { Permissions } from '../../../authentication/permissions';

export const ROUTES: SideNavInterface[] = [
  {
    path: '/dashboard/home',
    title: 'Início',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: []
  },
  {
    path: '',
    title: 'Área do Cliente',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'car',
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
        title: 'Solicitações de monitoramento',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'database',
        submenu: [],
        permission: Permissions.MONITORING_VIEW_MONITORINGREQUEST
      },
      {
        path: '/checklists/checklists-list',
        title: 'Check-lists',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'check-square',
        submenu: [],
        permission: Permissions.MONITORING_VIEW_CHECKLIST
      },
      {
        path: '',
        title: 'Monitoramento Pessoal',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'user',
        permission: Permissions.PERSONAL_MONITORING_VIEW,
        gertranStaffOnly: true,
        submenu: [
          {
            path: '/device/devices-list',
            title: 'Dispositivos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'mobile',
            submenu: [],
            permission: Permissions.PERSONAL_MONITORING_VIEW,
          },
          {
            path: '/device/personal-monitoring-list',
            title: 'Monitoramento Dispositivos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'eye',
            submenu: [],
            permission: Permissions.PERSONAL_MONITORING_VIEW,
          },
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
            path: '/drivers/drivers-list',
            title: 'Cadastro de Motoristas',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'idcard',
            submenu: [],
            permission: Permissions.DRIVERS_VIEW_DRIVER
          },
          {
            path: '/trucks/trucks-list',
            title: 'Cadastro de Veículos/Cavalos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'car',
            submenu: [],
            permission: Permissions.VEHICLES_VIEW_TRUCK
          },
          {
            path: '/wagons/wagons-list',
            title: 'Cadastro de Reboques/Carretas',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'group',
            submenu: [],
            permission: Permissions.VEHICLES_VIEW_WAGON
          },
          {
            path: '/stops/stops-list',
            title: 'Cadastro de Pontos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'pushpin',
            submenu: [],
            permission: Permissions.SETTINGS_VIEW_POINT
          },
          {
            path: '/routes/routes-list',
            title: 'Cadastro de Rotas',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'node-collapse',
            submenu: [],
            permission: Permissions.SETTINGS_VIEW_ROUTE
          },
        ]
      },
      {
        path: '',
        title: 'Dashboards',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'car',
        submenu: [
          {
            path: 'reports/dashboards/tc1',
            title: 'TORRE CONTROLE 1',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            permission: Permissions.VIEW_DASHBOARD_TC1,
          },
          {
            path: 'reports/dashboards/tc2',
            title: 'TORRE CONTROLE 2',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            permission: Permissions.VIEW_DASHBOARD_TC2
          },
          {
            path: 'reports/dashboards/tc3',
            title: 'TORRE CONTROLE 3',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            permission: Permissions.VIEW_DASHBOARD_TC3
          },
          {
            path: 'reports/dashboards/tc4',
            title: 'TORRE CONTROLE 4',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            permission: Permissions.VIEW_DASHBOARD_TC4
          },
          {
            path: 'reports/dashboards/maps',
            title: 'Mapa',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            permission: Permissions.VIEW_DASHBOARD_MAPS,
          },
          {
            path: 'reports/dashboards/monitoring-requests',
            title: 'Solicitações de monitoramento',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.VIEW_DASHBOARD_MONITORING_REQUEST,
          },
          {
            path: 'reports/dashboards/alerts',
            title: 'Alertas',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            permission: Permissions.VIEW_DASHBOARD_ALERT,
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
            gertranStaffOnly: true,
            permission: Permissions.VIEW_DASHBOARD_MONITORING_REQUEST
          },
          {
            path: 'reports/dashboards/tc-gertran',
            title: 'TORRE CONTROLE GERTRAN',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            queryParams: {
              fullscreen: true
            },
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.VIEW_DASHBOARD_MONITORING_REQUEST
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
            permission: Permissions.VIEW_DASHBOARD_MONITORING_REQUEST
          },
        ]
      }
    ]
  },
  {
    path: '',
    title: 'Área Restrita',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'lock',
    gertranStaffOnly: true,
    submenu: [
      {
        path: '/users/users-list',
        title: 'Acessos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'user',
        submenu: [],
        gertranStaffOnly: true,
        permission: Permissions.USERS_VIEW_BASEUSER
      },
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
        path: '/customers/customers-list',
        title: 'Clientes',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'star',
        submenu: [],
        gertranStaffOnly: true,
        permission: Permissions.CUSTOMERS_VIEW_CUSTOMER
      },
      {
        path: '/operations/operations-list',
        title: 'Operações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'control',
        submenu: [],
        gertranStaffOnly: true,
        permission: Permissions.SETTINGS_VIEW_OPERATION
      },
      {
        path: '/gertran-direct/approval',
        title: 'Venda Direta',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'database',
        submenu: [],
        gertranStaffOnly: true,
        permission: Permissions.GERTRAN_DIRECT_VIEW_GERTRANDIRECT
      },
      {
        path: '/plate-out-grid/details',
        title: 'Placas fora do grid',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'eye',
        queryParams: {
          'navbar-closed': true
        },
        submenu: [],
        gertranStaffOnly: true,
        permission: Permissions.MONITORINGREQUESTPLATEOUTGRID_VIEW_GERTRANDIRECT
      },
      {
        path: '/monitoring-request-history/monitoring-request-history',
        title: 'Alterações Solicitação',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'database',
        submenu: [],
        gertranStaffOnly: true,
        permission: Permissions.HISTORICAL_MONITORING_REQUEST_VIEW
      },
      {
        path: '/automations/automations-list',
        title: 'Automações',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'robot',
        submenu: [],
        gertranStaffOnly: true,
        permission: Permissions.SETTINGS_VIEW_AUTOMATION,
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
            path: '/terminals/terminals-list',
            title: 'Terminais',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'car',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.SETTINGS_VIEW_TERMINAL
          },
          {
            path: '/insurance-companies/insurance-companies-list',
            title: 'Seguradoras',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'heart',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.INSURANCE_COMPANIES_VIEW_INSURANCECOMPANY
          },
          {
            path: '/ddrs/ddrs-list',
            title: 'Ddrs',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'heart',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.INSURANCE_COMPANIES_VIEW_INSURANCECOMPANY
          },
          {
            path: '/document-types/document-types-list',
            title: 'Tipos de Documentos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'idcard',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.DOCUMENTS_VIEW_DOCUMENTTYPE
          },
          {
            path: '/vehicle-manufacturers/vehicle-manufacturers-list',
            title: 'Construtoras',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'car',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.VEHICLES_VIEW_MANUFACTURER
          },
          {
            path: '/vehicle-model-types/vehicle-model-types-list',
            title: 'Tipos de veiculos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'car',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.VEHICLES_VIEW_VEHICLEMODELTYPE
          },
          {
            path: '/vehicle-peripherals/vehicle-peripherals-list',
            title: 'Periféricos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'car',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.VEHICLES_VIEW_PERIPHERAL
          },
          {
            path: '/tracker-technologies/tracker-technologies-list',
            title: 'Tecnologias',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'wifi',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.TRACKERS_VIEW_TRACKERTECHNOLOGY
          },
        ]
      },
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
        title: 'Histórico',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: [
          {
            path: '/reports/commands-history',
            title: 'Histórico de comandos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            gertranStaffOnly: true,
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
            submenu: [],
          },
          {
            path: '/reports/incidents',
            title: 'Relatório de ocorrências',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'line-chart',
            submenu: [],
          },
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
            path: '/reports/workday',
            title: 'Relatório de jornada',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'line-chart',
            submenu: [],
          },
          {
            path: '/reports/fatiguereport',
            title: 'Relatório de fadiga',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'line-chart',
            submenu: [],
          },
          {
            path: '/reports/panic-history',
            title: 'Relatório de Pânico',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'line-chart',
            submenu: [],
          },
          {
            path: '/reports/mobile-picture',
            title: 'Relatório de Protocolos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'line-chart',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.MOBILE_PICTURE_VIEW
          },
          {
            path: '/reports/baits',
            title: 'Relatório de isca',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.REPORTS_VIEW_COMMANDS_HISTORY_REPORT,
          },
          // {
          //   path: '/reports/logisticreport',
          //   title: 'Relatório logistico',
          //   iconType: 'nzIcon',
          //   iconTheme: 'outline',
          //   icon: 'line-chart',
          //   submenu: []
          // },
        ]
      },
      {
        path: '',
        title: 'Viagens monitoradas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: [
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
            gertranStaffOnly: true,
            permission: Permissions.REPORTS_VIEW_DELAYED_TRIPS_REPORT
          },
          {
            path: '/reports/travel-requests',
            title: 'Solicitações',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            // gertranStaffOnly: true,
            // permission: Permissions.REPORTS_CAN_VIEW_MONITORING_REQUEST_REPORT
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
            gertranStaffOnly: true,
            permission: Permissions.REPORTS_VIEW_VEHICLES_RELESED_REPORT
          },
          {
            path: '/reports/travel-start',
            title: 'Inicio de viagem',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.REPORTS_VIEW_TRAVEL_START_REPORT
          },
          {
            path: '/reports/travel-end',
            title: 'Fim de viagem',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.REPORTS_VIEW_TRAVEL_END_REPORT
          },
          {
            path: '/reports/closing',
            title: 'Fechamento',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.REPORTS_CAN_VIEW_CLOSURE_REPORT,
          },
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
            gertranStaffOnly: true,
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
            gertranStaffOnly: true,
            permission: Permissions.REPORTS_VIEW_ANALYTICAL_REPORT
          },
          {
            path: '/reports/operational-audit-commands',
            title: 'Auditoria Operacional Comandos',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.REPORTS_VIEW_MESSAGES_OPERATIONAL_AUDIT_HISTORY_REPORT
          },
          {
            path: '/reports/operational-audit-messages',
            title: 'Auditoria Operacional Mensagens',
            iconType: 'nzIcon',
            iconTheme: 'outline',
            icon: 'bar-chart',
            submenu: [],
            gertranStaffOnly: true,
            permission: Permissions.REPORTS_VIEW_MESSAGES_OPERATIONAL_AUDIT_HISTORY_REPORT
          },
        ]
      },
      {
        path: '/reports/technologies',
        title: 'Tecnologias',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'line-chart',
        submenu: [],
        gertranStaffOnly: true,
        permission: Permissions.REPORTS_VIEW_COMMANDS_HISTORY_REPORT,
      },




      // {
      //   path: '/mobile-protocol/mobile-protocol-list',
      //   title: 'Gerenciar de Protocolos',
      //   iconType: 'nzIcon',
      //   iconTheme: 'outline',
      //   icon: 'line-chart',
      //   submenu: []
      // },
    ]
  },
];