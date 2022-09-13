import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TrackerTechnologiesService, TrackerTechnologies } from '../tracker-technologies.service';

@Component({
  selector: 'app-tracker-technologies-form',
  templateUrl: './tracker-technologies-form.component.html',
  styleUrls: ['./tracker-technologies-form.component.css'],
})
export class TrackerTechnologiesFormComponent implements OnInit {
  isLoading = false;
  trackerTechnology: TrackerTechnologies = null;

  validateForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: TrackerTechnologiesService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
    this.loadTrackerTechnologies();
  }

  loadTrackerTechnologies() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.get(id).subscribe(trackerTechnologies => {
        this.trackerTechnology = trackerTechnologies;

        this.validateForm.patchValue({
          name: this.trackerTechnology.name,
        });

        this.isLoading = false;
      });
    }
  }

  list() {
    this.router.navigate(['/tracker-technologies/tracker-technologies-list']);
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }

    this.isLoading = true;
    if (this.trackerTechnology?.id) {
      this.service.update(
        this.trackerTechnology.id,
        this.validateForm.value
      ).subscribe(() => this.handleSuccess(), () => this.handleError());
    } else {
      this.service.save(this.validateForm.value)
        .subscribe(() => this.handleSuccess(), () => this.handleError());
    }
  }

  private handleSuccess() {
    this.message.success('Registro salvo com sucesso');
    this.list();
    this.isLoading = false;
  }

  private handleError() {
    this.message.error('Ocorreu um erro ao salvar o registro');
    this.isLoading = false;
  }
}
