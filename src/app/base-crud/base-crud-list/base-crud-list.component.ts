import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import ApiService, {
  DEFAULT_LIMIT,
  GetAllResponse,
  getCurrentPage,
  Pagination
} from 'src/app/shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-base-crud-list',
  templateUrl: './base-crud-list.component.html',
  styleUrls: ['./base-crud-list.component.css']
})
export class BaseCrudListComponent<T extends { id: string }> implements OnInit {
  isLoading = false;
  resources: GetAllResponse<T> = null;

  protected field = 'name';
  protected searchSubject = new Subject<string>();

  constructor(
    @Inject(String) private resource: string,
    public router: Router,
    @Inject('service') public service: ApiService<T>,
    public message: NzMessageService,
    public modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.loadResources();
    this.setupSearch();
  }

  performPostLoadActions(): void {
  }

  loadResources(url?: string): void {
    this.isLoading = true;
    this.service.getAll(this.pagination(url), ...this.additionalParams()).subscribe(data => {
      this.resources = data;
      this.isLoading = false;
      this.performPostLoadActions();
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
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
    this.service.delete(id, ...this.additionalParams()).subscribe(() => {
      this.loadResources();
      this.message.success('Registro excluído com sucesso');
      // this.isLoading = false;
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
      const url = this.replaceOffsetWithPage(this.resources.previous, params.pageIndex);
      this.loadResources(url);
    } else if (params.pageIndex > this.page) {
      const url = this.replaceOffsetWithPage(this.resources.next, params.pageIndex);
      this.loadResources(url);
    }
  }

  replaceOffsetWithPage(url: string, page: number): string {
    const limit = +url.match(/limit=\d+/)[0].split('=')[1];

    return url.replace(/offset=\d+/, `offset=${(limit * page) - limit}`);
  }

  additionalParams(): any[] {
    return [];
  }

  pagination(url?: string): Pagination {
    return {
      url,
    };
  }

  searchByName(name: string): void {
    this.field = 'name';

    if (name === '') {
      this.loadResources();
    } else {
      this.searchSubject.next(name);
    }
  }

  searchByField(field: string, value: string): void {
    this.field = field;

    if (value === '') {
      this.loadResources();
    } else {
      this.searchSubject.next(value);
    }
  }

  protected setupSearch(): void {
    this.searchSubject.pipe(debounceTime(1500)).subscribe((value) => {
      this.isLoading = true;

      this.performSearch(value);
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }

  protected performSearch(value: string): void {
    this.service.getAll({limit: 50}, {[this.field]: value}).subscribe((result) => {
      this.resources = result;
      this.isLoading = false;
    });
  }
}
