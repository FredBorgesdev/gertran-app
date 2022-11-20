import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
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
    {
      label: 'Sensor Porta Motorista',
      value: 'driverDoorChecked',
    },
    {
      label: 'Sensor Porta Passageiro',
      value: 'passengerDoorChecked',
    },
    {
      label: 'Sensor de engate de carreta',
      value: 'wagonEngagedChecked',
    },
    {
      label: 'Sensor de Painel',
      value: 'panelSensorChecked',
    },
    {
      label: 'Sensor de Bau',
      value: 'trunkChecked',
    },
    {
      label: 'Sirene',
      value: 'sirenChecked',
    },
    {
      label: 'Bloqueio',
      value: 'blockChecked',
    },
    {
      label: 'Trava de Bau',
      value: 'trunkLockChecked',
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ChecklistsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.checklistForm = this.formBuilder.group({
      hasMacro: [null],
      hasEmbeddedIntelligence: [null],
      approved: [null],
      allowedTravel: [null],
      justification: [''],
    });
    this.checklistItems.forEach(item => {
      this.checklistForm.addControl(item.value, this.formBuilder.control(false));
    });
  }

  save(): void {
    if (this.checklistForm.invalid) {
      this.message.error('Formulário inválido');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.message.success('Checklist salvo com sucesso');
      this.list();
    }, 1500);
  }

  list(): void {
    this.router.navigate(['checklists', 'checklists-list']);
  }

}
