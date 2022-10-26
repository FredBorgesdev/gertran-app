import {Component, OnInit} from '@angular/core';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Stop, StopsService} from '../../stops/stops.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Route, RoutesService} from '../routes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Customer, CustomersService} from '../../customers/customers.service';

@Component({
  selector: 'app-routes-form',
  templateUrl: './routes-form.component.html',
  styleUrls: ['./routes-form.component.css']
})
export class RoutesFormComponent extends BaseCrudFormComponent<Route> implements OnInit {
  points: TransferItem[] = [];
  customers: Customer[] = [];

  customersNextUrl: string;
  isLoadingMoreData = false;

  constructor(
    private stopsService: StopsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
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

    this.stopsService.getAll({ limit: 999 }).subscribe((stops) => {
      this.points = this.mapStopsToTransferItems(stops.results);
    }, () => {
      this.message.error('Não foi possível carregar os pontos');
    });

    this.loadMoreCustomers();
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
      this.stopsService.getAll({ limit: 999 }).subscribe((stops) => {
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

  loadMoreCustomers(): void {
    this.isLoadingMoreData = true;
    this.customersService.getAll({
      limit: 999,
      url: this.customersNextUrl
    }).subscribe((customers) => {
      this.customersNextUrl = customers.next;
      this.customers = [...this.customers, ...customers.results];
      this.isLoadingMoreData = false;
    });
  }

  private mapStopsToTransferItems(stops: Stop[]): TransferItem[] {
    return stops.map((stop) => ({
      key: stop.id,
      title: stop.name,
      ...stop,
    }));
  }
}
