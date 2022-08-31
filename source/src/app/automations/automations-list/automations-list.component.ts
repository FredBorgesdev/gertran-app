import {
  Component,
  OnInit,
  TemplateRef
} from '@angular/core'
import { Router } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd/modal'

import { TableService } from '../../shared/services/table.service'

interface DataItem {
  id: number
  eventType: string
  eventTypeValue: string
  action: string
  travelSm: boolean
  vehicleMessage?: boolean
  vehicleMessageText?: string
  timeAction?: boolean
  timeParam?: number
  velocity?: boolean
  velocityParam?: number
  ignition?: boolean
  ignitionParam?: string
  command?: boolean
  commandType?: string
  sentMessage?: boolean
  sentMessageText?: string
  operatorAlert?: boolean
  operatorAlertText?: string
  incident?: boolean
  incidentText?: string
}

@Component({
  selector: 'app-automations-list',
  templateUrl: './automations-list.component.html',
  styleUrls: ['./automations-list.component.css']
})
export class AutomationsListComponent implements OnInit {

  isLoading = false
  displayData = []
  searchInput: string

  automation: DataItem = {
    id: null,
    eventType: '',
    eventTypeValue: '',
    action: '',
    travelSm: false,
    vehicleMessage: false,
    vehicleMessageText: '',
    timeAction: false,
    timeParam: null,
    velocity: false,
    velocityParam: null,
    ignition: false,
    ignitionParam: '',
    command: false,
    commandType: '',
    sentMessage: false,
    sentMessageText: '',
    operatorAlert: false,
    operatorAlertText: '',
    incident: false,
    incidentText: ''
  }

  automationColumn = [
    {
      title: 'ID',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.id - b.id
    },
    {
      title: 'Evento',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.eventType.localeCompare(b.eventType)
    },
    {
      title: 'Ação',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.action.localeCompare(b.action)
    },
    {
      title: 'SM Viagem'
    },
    {
      title: 'MSG Veículo'
    },
    {
      title: 'Tempo Ação'
    },
    {
      title: 'Velocidade'
    },
    {
      title: 'Ignição'
    },
    {
      title: 'Comando'
    },
    {
      title: 'Ações'
    }
  ]

  automationsList: DataItem[] = [
    {
      id: 1,
      eventType: 'Sirene Ativa',
      eventTypeValue: 'sirene-ativa',
      action: 'Passagem',
      travelSm: true,
      vehicleMessage: true,
      vehicleMessageText: 'MSG Veículo 1',
      timeAction: true,
      timeParam: 1,
      velocity: false,
      velocityParam: null,
      ignition: false,
      ignitionParam: null,
      command: true,
      commandType: 'Desativar Sirene',
      sentMessage: false,
      sentMessageText: null,
      operatorAlert: true,
      operatorAlertText: 'Alerta Operador 1',
      incident: true,
      incidentText: 'Incidente 1'
    },
    {
      id: 2,
      eventType: 'Evento 2',
      eventTypeValue: 'evento-2',
      action: 'Ação 2',
      travelSm: false,
      vehicleMessage: true,
      vehicleMessageText: 'MSG Veículo 2',
      timeAction: false,
      timeParam: null,
      velocity: true,
      velocityParam: 2,
      ignition: true,
      ignitionParam: 'Ignição 2',
      command: false,
      commandType: null,
      sentMessage: true,
      sentMessageText: 'MSG Enviada 2',
      operatorAlert: true,
      operatorAlertText: 'Alerta Operador 2',
      incident: true,
      incidentText: 'Incidente 2'
    },
    {
      id: 3,
      eventType: 'Evento 3',
      eventTypeValue: 'evento-3',
      action: 'Ação 3',
      travelSm: true,
      vehicleMessage: true,
      vehicleMessageText: 'MSG Veículo 3',
      timeAction: true,
      timeParam: 3,
      velocity: true,
      velocityParam: 3,
      ignition: true,
      ignitionParam: 'Ignição 3',
      command: true,

      commandType: 'Comando 3',
      sentMessage: true,
      sentMessageText: 'MSG Enviada 3',
      operatorAlert: true,
      operatorAlertText: 'Alerta Operador 3',
      incident: true,
      incidentText: 'Incidente 3'
    }
  ]

  constructor(
    private router: Router,
    private tableService: TableService,
    private modalService: NzModalService
  ) {
    this.isLoading = true
    setTimeout(
      () => {
        this.isLoading = false
        this.displayData = this.automationsList
      },
      333
    )
  }

  ngOnInit(): void {
  }

  search() {
    const data = this.automationsList
    this.displayData = this.tableService.search(
      this.searchInput,
      data
    )
  }

  create() {

  }

  newAutomationCreate(newAutomationContent: TemplateRef<{}>) {
    const modal = this.modalService.create({
      nzTitle: 'Nova Automação',
      nzContent: newAutomationContent,
      nzWidth: '80%',
      nzFooter: [
        {
          label: 'Cancelar',
          onClick: () => modal.destroy()
        },
        {
          label: 'Salvar',
          type: 'primary',
          onClick: () => {
            modal.destroy()
          }
        }
      ]
    })
  }

  editAutomation(editAutomationContent: TemplateRef<{}>, item: DataItem) {
    this.automation = item
    const modal = this.modalService.create({
      nzTitle: 'Editar Automação',
      nzContent: editAutomationContent,
      nzWidth: '80%',
      nzFooter: [
        {
          label: 'Cancelar',
          onClick: () => modal.destroy()
        },
        {
          label: 'Salvar',
          type: 'primary',
          onClick: () => {
            modal.destroy()
          }
        }
      ]
    })
  }

  edit(item: DataItem) {
    console.log('edit')
  }

}
