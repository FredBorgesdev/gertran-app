import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { TrackerTechnologiesModelsService, TrackerTechnologiesModels } from '../tracker-technologies-models.service';
import { TrackerTechnologies } from '../tracker-technologies.service';

@Component({
  selector: 'app-tracker-technologies-models-list',
  templateUrl: './tracker-technologies-models-list.component.html',
  styleUrls: ['./tracker-technologies-models-list.component.css'],
})
export class TrackerTechnologiesModelsListComponent implements OnInit {
  @Input() trackerTechnology: TrackerTechnologies = null;

  trackerTechnologyModel: TrackerTechnologiesModels = null;
  isCreatingModel = false;
  isLoading = false;
  trackerTechnologiesModelsList: GetAllResponse<TrackerTechnologiesModels> = null;

  trackerTechnologiesModelsColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ];

  constructor(
    private service: TrackerTechnologiesModelsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadTrackerTechnologiesModels();
  }

  loadTrackerTechnologiesModels(url?: string) {
    this.isLoading = true;
    this.service.getAll({ url }, this.trackerTechnology.id).subscribe((data) => {
      this.trackerTechnologiesModelsList = data;
      this.isLoading = false;
    });
  }

  edit(item: TrackerTechnologiesModels) {
    this.trackerTechnologyModel = item;
    this.isCreatingModel = true;
  }

  delete(item: TrackerTechnologiesModels) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.handleDelete(item.id),
    });
  }

  handleCancel() {
    this.isCreatingModel = false;
    this.trackerTechnologyModel = null;
  }

  handleSuccess() {
    this.isCreatingModel = false;
    this.trackerTechnologyModel = null;
    this.loadTrackerTechnologiesModels();
  }

  handleDelete(id: string) {
    this.isLoading = true;
    this.service.delete(id, this.trackerTechnology.id).subscribe(() => {
      this.loadTrackerTechnologiesModels();
      this.message.success('Modelos excluído com sucesso');
      this.isLoading = false;
    }, () => {
      this.message.error('Erro ao excluir Modelos');
      this.isLoading = false;
    });
  }

  get page() {
    return getCurrentPage(this.trackerTechnologiesModelsList);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.loadTrackerTechnologiesModels(this.trackerTechnologiesModelsList.previous);
    } else if (params.pageIndex > this.page) {
      this.loadTrackerTechnologiesModels(this.trackerTechnologiesModelsList.next);
    }
  }
}
