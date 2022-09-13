import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import ApiService, {GetAllResponse, getCurrentPage} from 'src/app/shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-base-crud-list',
  templateUrl: './base-crud-list.component.html',
  styleUrls: ['./base-crud-list.component.css']
})
export class BaseCrudListComponent<T extends { id: string }> implements OnInit {
  isLoading = false;
  resources: GetAllResponse<T> = null;

  constructor(
    @Inject(String) private resource: string,
    public router: Router,
    @Inject('service') public service: ApiService<T>,
    public message: NzMessageService,
    public modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(url?: string): void {
    throw new Error('Method not implemented.');
  }

  create(): void {
    this.router.navigate([this.resource, `${this.resource}-create`]);
  }

  edit(resource: T): void {
    this.router.navigate([this.resource, `${this.resource}-edit`, resource.id]);
  }

  delete(resource: T): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.handleDelete(resource.id),
    });
  }

  handleDelete(id: string): void {
    this.isLoading = true;
    this.service.delete(id).subscribe(() => {
      this.loadResources();
      this.message.success('Registro excluído com sucesso');
      this.isLoading = false;
    }, () => {
      this.message.error('Erro ao excluir registro');
      this.isLoading = false;
    });
  }

  get page(): number {
    return getCurrentPage(this.resources);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.loadResources(this.resources.previous);
    } else if (params.pageIndex > this.page) {
      this.loadResources(this.resources.next);
    }
  }
}
