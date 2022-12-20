import {Component, OnInit} from '@angular/core';
import {TransferItem, TransferSearchChange} from 'ng-zorro-antd/transfer';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Stop, StopsService} from '../../stops/stops.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Route, RoutesService} from '../routes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {GetAllResponse, getCurrentPage} from '../../shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-routes-form',
  templateUrl: './routes-form.component.html',
  styleUrls: ['./routes-form.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class RoutesFormComponent extends BaseCrudFormComponent<Route> implements OnInit {
  points: TransferItem[] = [];
  pointsResponse: GetAllResponse<Stop>;
  pointsLoading = false;
  searchPointsSubject = new Subject();

  constructor(
    private stopsService: StopsService,
    private router: Router,
    private formBuilder: FormBuilder,
    public selectableCustomerService: SelectableCustomerServiceService,
    routesService: RoutesService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(
      routesService,
      message,
      activatedRoute,
    );
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.selectableCustomerService.init();

    this.searchPointsSubject.pipe(debounceTime(1000)).subscribe((params: TransferSearchChange) => {
      this.loadPointsFromCustomer(undefined, { name: params.value });
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, [Validators.required]],
      distance: [null, [Validators.required]],
      averageSpeed: [null, [Validators.required]],
      durationInMinutes: [null, [Validators.required]],
      points: [[], [Validators.required]],
    });
  }

  performResourceChange(): void {
    if (this.points.length === 0) {
      this.stopsService.getAll({ limit: 50 }).subscribe((stops) => {
        this.points = this.mapStopsToTransferItems([
          ...this.resource.points.map((point) => point.point),
          ...stops.results
        ]);
        this.loadCurrentPoints();
      }, () => {
        this.message.error('Não foi possível carregar os pontos');
      });
    } else {
      this.loadCurrentPoints();
    }
  }

  loadCurrentPoints(): void {
    const pointsCopy = [...this.points];
    this.resource.points.forEach((point) => {
      const index = this.points.findIndex((item) => item.id === point.point.id);
      if (index === -1) {
        return;
      }
      pointsCopy[index].direction = 'right';
      pointsCopy[index].order = point.order;
    });
    const sortByOrder = (a, b) => a.order - b.order;
    this.points = pointsCopy.sort(sortByOrder);
  }

  drop(event: CdkDragDrop<string[]>): void {
    const rightItems = this.points.filter(item => item.direction === 'right');
    const leftItems = this.points.filter(item => item.direction === 'left');
    moveItemInArray(rightItems, event.previousIndex, event.currentIndex);
    this.points = [...leftItems, ...rightItems];
  }

  save(): void {
    const selectedPoints = this.points.filter(item => item.direction === 'right');
    const pointsIdAndOrder = selectedPoints.map((item, index) => ({
      id: item.key,
      order: index + 1,
    }));

    this.validateForm.patchValue({
      points: pointsIdAndOrder,
    });

    super.save();
  }

  list(): void {
    this.router.navigate(['/routes/routes-list']);
  }

  private mapStopsToTransferItems(stops: Stop[]): TransferItem[] {
    return stops.map((stop) => ({
      key: stop.id,
      title: stop.name,
      ...stop,
    }));
  }

  get selectedPoints(): TransferItem[] {
    return this.points.filter(item => item.direction === 'right');
  }

  loadPointsFromCustomer(url?: string, filters?: {
    name?: string;
  }): void {
    this.pointsLoading = true;
    this.stopsService.getAll({
      url,
      limit: 15
    }, {
      customer: this.validateForm.get('customer').value,
      name: filters?.name,
    }).subscribe((stops) => {
      this.points = this.mapStopsToTransferItems(stops.results);
      this.pointsResponse = stops;
      this.pointsLoading = false;
    }, () => {
      this.message.error('Não foi possível carregar os pontos');
      this.pointsLoading = false;
    });
  }

  handlePointsQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.pointsPage) {
      const url = this.replaceOffsetWithPage(this.pointsResponse.previous, params.pageIndex);
      this.loadPointsFromCustomer(url);
    } else if (params.pageIndex > this.pointsPage) {
      const url = this.replaceOffsetWithPage(this.pointsResponse.next, params.pageIndex);
      this.loadPointsFromCustomer(url);
    }
  }

  get pointsPage(): number {
    return getCurrentPage(this.pointsResponse);
  }

  replaceOffsetWithPage(url: string, page: number): string {
    const limit = +url.match(/limit=\d+/)[0].split('=')[1];

    return url.replace(/offset=\d+/, `offset=${(limit * page) - limit}`);
  }

  searchPointsByName(params: TransferSearchChange): void {
    if (params.direction !== 'left' && !this.pointsResponse) {
      return;
    }

    this.searchPointsSubject.next(params);
  }
}
