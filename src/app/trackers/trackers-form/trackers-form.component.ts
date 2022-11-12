import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Tracker, TrackersService} from '../trackers.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {TrackerTechnologiesModels, TrackerTechnologiesModelsService} from '../../tracker-technologies/tracker-technologies-models.service';
import {TrackerTechnologies, TrackerTechnologiesService} from '../../tracker-technologies/tracker-technologies.service';

@Component({
  selector: 'app-trackers-form',
  templateUrl: './trackers-form.component.html',
  styleUrls: ['./trackers-form.component.css']
})
export class TrackersFormComponent extends BaseCrudFormComponent<Tracker> implements OnInit {
  @Input() vehicleId: string;
  @Input() visible = false;
  @Input() trackerId: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  trackerTechnologies: TrackerTechnologies[] = [];
  trackerTechnologiesModels: TrackerTechnologiesModels[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trackerTechnologiesModelsService: TrackerTechnologiesModelsService,
    private trackerTechnologiesService: TrackerTechnologiesService,
    service: TrackersService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute
  ) {
    super(service, message, activatedRoute);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.trackerTechnologiesService.getAll({ limit: 50 }).subscribe(trackerTechnologiesModels => {
      this.trackerTechnologies = trackerTechnologiesModels.results;
    });
  }

  loadTrackerTechnologiesModels(trackerTechnologyId: string): void {
    if (!trackerTechnologyId) {
      return;
    }

    this.trackerTechnologiesModelsService.getAll({ limit: 50 }, trackerTechnologyId).subscribe(trackerTechnologiesModels => {
      this.trackerTechnologiesModels = trackerTechnologiesModels.results;
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      technology: [null],
      trackerModel: [null, Validators.required],
      trackerId: [null, Validators.required],
      isMain: [false, Validators.required],
    });
  }

  getId(): string {
    return this.trackerId;
  }

  additionalParams(): any[] {
    return [this.vehicleId];
  }

  saveAndCloseModal(): void {
    this.save({
      success: () => {
        this.message.success('Rastreador salvo com sucesso!');
        this.success.emit();
        this.validateForm.reset();
        this.isLoading = false;
      }
    });
  }

  performFormGroupSetValues(): void {
    this.validateForm.controls.technology.setValue(this.resource.trackerModel.trackerTechnology?.id);
    this.validateForm.controls.trackerModel.setValue(this.resource.trackerModel.id);
    this.validateForm.controls.trackerId.setValue(this.resource.trackerId);
    this.validateForm.controls.isMain.setValue(this.resource.isMain);
  }
}
