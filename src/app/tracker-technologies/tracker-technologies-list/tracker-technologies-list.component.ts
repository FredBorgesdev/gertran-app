import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { TrackerTechnologiesService, TrackerTechnologies } from '../tracker-technologies.service';

@Component({
  selector: 'app-tracker-technologies-list',
  templateUrl: './tracker-technologies-list.component.html',
  styleUrls: ['./tracker-technologies-list.component.css'],
})
export class TrackerTechnologiesListComponent implements OnInit {
  isLoading = false
  trackerTechnologiesList: GetAllResponse<TrackerTechnologies> = null

  trackerTechnologiesColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ]

  constructor(
    private router: Router,
    private service: TrackerTechnologiesService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadTrackerTechnologiesList()
  }

  loadTrackerTechnologiesList(url?: string) {
    this.isLoading = true
    this.service.getAll({ url }).subscribe((data) => {
      this.trackerTechnologiesList = data
      this.isLoading = false
    })
  }

  create(){
    this.router.navigate(['/tracker-technologies', 'tracker-technologies-create'])
  }

  edit(item: TrackerTechnologies){
    this.router.navigate(['/tracker-technologies', 'tracker-technologies-edit', item.id])
  }

  delete(item: TrackerTechnologies) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.handleDelete(item.id),
    })
  }

  handleDelete(id: string) {
    this.isLoading = true
    this.service.delete(id).subscribe(() => {
      this.loadTrackerTechnologiesList()
      this.message.success('Tecnologia excluído com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir tecnologia')
      this.isLoading = false
    })
  }

  get page() {
    return getCurrentPage(this.trackerTechnologiesList)
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.loadTrackerTechnologiesList(this.trackerTechnologiesList.previous)
    } else if (params.pageIndex > this.page) {
      this.loadTrackerTechnologiesList(this.trackerTechnologiesList.next)
    }
  }
}
