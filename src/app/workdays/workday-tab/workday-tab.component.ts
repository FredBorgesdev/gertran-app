import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Workday, WorkdayService} from '../workday.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute} from '@angular/router';
import {Customer} from '../../customers/customers.service';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-workday-tab',
  templateUrl: './workday-tab.component.html',
  styleUrls: ['./workday-tab.component.css']
})
export class WorkdayTabComponent extends BaseCrudFormComponent<Workday> {
  @Input() customer: Customer;
  isLoading = false;
  validateForm: FormGroup;

  // Permite até 99:59 para suportar semana (ex.: 44:00, 66:00)
  hoursMask = [/[0-9]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];

  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    workdayService: WorkdayService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute
  ) {
    super(
      workdayService,
      message,
      activatedRoute
    );
  }

  loadResource(): void {
    // Garante que o customer já foi injetado antes de buscar
    if (!this.customer?.id) {
      console.log('[WorkdaySettings] loadResource aguardando customer...');
      return;
    }
    this.isLoading = true;
    this.service.getAll({ limit: 1 }, this.customer.id).subscribe(
      (response) => {
        if (response?.results?.length) {
          this.resource = response.results[0];
          this.performFormGroupSetValues();
        }
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log('[WorkdaySettings] loadResource error', err?.status, err?.error);
      }
    );
  }

  getId(): string {
    return this.resource?.id;
  }

  additionalParams(): any[] {
    return [this.customer.id];
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      maximumWorkdayPeriod: [null],
      maximumHoursContinuousDriving: [null],
      restPeriodToBreakContinuousDriving: [null],
      maximumHoursDailyDriving: [null],
      minimumContinuousRestPeriod: [null],
      minimumLunchRestPeriod: [null],
      restPeriodBetweenWorkingDays: [null],
      maximumHoursPerWeek: [null],
      maximumContinuousRestPeriod: [null],
    });
  }

  performFormGroupSetValues(): void {
    Object.keys(this.resource).forEach(key => {
      if (this.validateForm.controls[key]) {
        const minutes = this.resource[key];
        if (minutes == null || minutes === undefined) {
          this.validateForm.controls[key].setValue(null);
          console.log('[WorkdaySettings] init field empty', key);
          return;
        }
        const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
        const hoursAndMinutes = `${hours}:${(minutes % 60).toString().padStart(2, '0')}`;

        this.validateForm.controls[key].setValue(hoursAndMinutes);
        console.log('[WorkdaySettings] init field', key, 'minutes=', minutes, 'HH:mm=', hoursAndMinutes);
      }
    });
  }

  getValues(): any {
    const values: any = {};

    Object.keys(this.validateForm.controls).forEach(key => {
      const value = this.validateForm.controls[key].value;
      if (value == null || value === '') {
        return; // não envia campos vazios
      }
      // Aceita HH:mm OU decimal em horas (ex.: 5.5 => 330 minutos) OU apenas minutos (ex.: 30)
      if (String(value).includes(':')) {
        const [hours, minutes] = String(value).split(':');
        values[key] = Number(hours) * 60 + Number(minutes);
      } else {
        const num = Number(value);
        if (!isNaN(num)) {
          // Se o número for maior que 59, interpretamos como horas decimais
          // Ex.: 5.5 => 330; 44 => 2640; 30 => 30 (minutos)
          if (num > 59) {
            values[key] = Math.round(num * 60);
          } else {
            values[key] = Math.round(num);
          }
        } else {
          // Valor inválido: ignora este campo
          return;
        }
      }
    });
    console.log('[WorkdaySettings] getValues minutes payload', values);
    return values;
  }

  // Validação mínima antes de salvar: jornada semanal é obrigatória no backend
  save(): void {
    const weeklyCtrl = this.validateForm.controls['maximumHoursPerWeek'];
    if (!weeklyCtrl?.value) {
      this.message.error('Preencha "Horas máximas de jornada semanal" (ex.: 44:00).');
      return;
    }
    // Fluxo seguro: busca primeiro; se existir, faz update; senão, cria.
    this.isLoading = true;
    const payload = this.getValues();
    console.log('[WorkdaySettings] save() resource', this.resource, 'payloadMinutes', payload);

    this.service.getAll({ limit: 1 }, this.customer.id).subscribe(
      (resp: any) => {
        console.log('[WorkdaySettings] getAll pre-save', resp);
        const existing = resp?.results?.[0];
        if (existing?.id) {
          console.log('[WorkdaySettings] updating existing id', existing.id);
          this.service.update(existing.id, payload, this.customer.id).subscribe(
            () => {
              this.isLoading = false;
              this.message.success('Configurações de jornada salvas com sucesso.');
              this.resource = existing;
            },
            (err) => {
              this.isLoading = false;
              console.log('[WorkdaySettings] update error', err?.status, err?.error);
              this.handleSaveError(err);
            }
          );
        } else {
          console.log('[WorkdaySettings] creating new settings for customer', this.customer?.id);
          this.service.save(payload, this.customer.id).subscribe(
            (res) => {
              this.isLoading = false;
              this.message.success('Configurações de jornada salvas com sucesso.');
              this.resource = res as any;
            },
            (err) => {
              this.isLoading = false;
              console.log('[WorkdaySettings] create error', err?.status, err?.error);
              this.handleSaveError(err);
            }
          );
        }
      },
      (err) => {
        // Se o listagem falhar, tenta criar mesmo assim
        console.log('[WorkdaySettings] getAll error before save', err?.status, err?.error);
        this.service.save(payload, this.customer.id).subscribe(
          (res) => {
            this.isLoading = false;
            this.message.success('Configurações de jornada salvas com sucesso.');
            this.resource = res as any;
          },
          (err2) => {
            this.isLoading = false;
            console.log('[WorkdaySettings] create error after getAll error', err2?.status, err2?.error);
            this.handleSaveError(err2);
          }
        );
      }
    );
  }

  private handleSaveError(err: any) {
    if (err?.status === 500) {
      this.message.error('Erro interno do servidor (500) ao salvar as configurações. Verifique se já existe uma configuração para este cliente.');
      return;
    }
    const detail = (err?.error?.detail) || (err?.error?.non_field_errors?.join?.(', ')) || 'Erro ao salvar configurações.';
    const fieldErrors = err?.error;
    if (fieldErrors && typeof fieldErrors === 'object') {
      const entries = Object.entries(fieldErrors).filter(([k]) => k !== 'detail');
      if (entries.length) {
        const msg = entries.map(([k, v]: any) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ');
        this.message.error(msg);
        return;
      }
    }
    this.message.error(String(detail));
  }

  list(): void {
  }

  delete(): void {
    this.modal.confirm({
      nzTitle: 'Tem certeza que deseja excluir?',
      nzContent: 'Esta ação não poderá ser desfeita.',
      nzOkText: 'Sim',
      nzOnOk: () => {
        this.isLoading = true;
        this.service.delete(
          this.getId(),
          this.customer.id
        ).subscribe(
          () => {
            this.isLoading = false;
            this.message.success('Configurações excluídas com sucesso.');
            this.customer.workdaySettings = null;
            this.validateForm.reset();
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    });
  }
}
