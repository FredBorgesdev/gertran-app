import {Injectable} from '@angular/core';
import {VehicleModels, VehicleModelsService} from '../vehicle-manufacturers/vehicle-models.service';
import {Subject} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectableVehicleModelService {
  isLoadingMoreData: boolean;
  models: VehicleModels[] = [];
  searchModelsSubject = new Subject<{
    name: string;
  }>();
  vehicleManufacturerId: string;

  private modelsNextUrl: string;

  constructor(
    private vehicleModelsService: VehicleModelsService,
    private message: NzMessageService,
  ) {
  }

  init(): void {
    this.loadMoreModels();
    this.setupSearch();
  }

  setVehicleManufacturerId(id: string): void {
    this.vehicleManufacturerId = id;
  }

  loadMoreModels(filters?: { name: string }): void {
    this.isLoadingMoreData = true;
    this.vehicleModelsService.getAll({
      limit: 50,
      url: this.modelsNextUrl
    }, this.vehicleManufacturerId, filters).subscribe((trucks) => {
      this.modelsNextUrl = trucks.next;
      this.models = [...this.models, ...trucks.results];
      this.isLoadingMoreData = false;
    }, () => {
      this.message.error('Erro ao carregar os caminhões!');
    });
  }

  setupSearch(): void {
    this.searchModelsSubject.pipe(debounceTime(500)).subscribe((filters) => {
      this.vehicleModelsService.getAll({limit: 50}, this.vehicleManufacturerId, filters).subscribe((result) => {
        this.models = result.results;
      });
    }, () => {
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }

  resetFilters(): void {
    this.models = [];
    this.modelsNextUrl = null;
    this.loadMoreModels();
  }

  searchByName(name: string): void {
    this.searchModelsSubject.next({name});
  }
}
