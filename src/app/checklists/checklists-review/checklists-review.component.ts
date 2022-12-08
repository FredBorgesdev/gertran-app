import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ChecklistsService} from '../checklists.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-checklists-review',
  templateUrl: './checklists-review.component.html',
  styleUrls: ['./checklists-review.component.css']
})
export class ChecklistsReviewComponent implements OnInit {

  isLoading = false;
  checklistForm: FormGroup;

  checklistItems = [
    { label: 'Sensor Porta Motorista', value: 'driverDoorChecked' },
    { label: 'Sensor Porta Passageiro', value: 'passengerDoorChecked' },
    { label: 'Sensor de engate de carreta', value: 'wagonEngagedChecked' },
    { label: 'Sensor de Painel', value: 'panelSensorChecked' },
    { label: 'Sensor de Bau', value: 'trunkChecked' },
    { label: 'Sirene', value: 'sirenChecked' },
    { label: 'Bloqueio', value: 'blockChecked' },
    { label: 'Trava de Bau', value: 'trunkLockChecked' },
    { label: 'Macro', value: 'hasMacro' },
    { label: 'Inteligência Embarcada', value: 'hasEmbeddedIntelligence' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ChecklistsService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.checklistForm = this.formBuilder.group({
      hasMacro: [false],
      hasEmbeddedIntelligence: [false],
      status: ['requested'],
      allowedTravel: [null],
      justification: [null],
    });

    this.checklistForm.get('status').valueChanges.subscribe(value => {
      if (value === 'reproved') {
        this.checklistForm.get('justification').setValidators([Validators.required]);
        this.checklistForm.get('justification').updateValueAndValidity();
      }
    });

    this.checklistItems.forEach(item => {
      this.checklistForm.addControl(item.value, this.formBuilder.control(false));
    });
  }

  save(): void {
    if (this.checklistForm.invalid) {
      this.message.error('Formulário inválido');
      Object.keys(this.checklistForm.controls).forEach(key => {
        this.checklistForm.controls[key].markAsDirty();
        this.checklistForm.controls[key].updateValueAndValidity();
      });
      return;
    }

    this.isLoading = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.update(id, this.checklistForm.value).subscribe(() => {
      this.message.success('Checklist atualizado com sucesso');
      this.list();
    }, () => {
      this.isLoading = false;
    });
  }

  list(): void {
    this.router.navigate(['checklists', 'checklists-list']);
  }
}
