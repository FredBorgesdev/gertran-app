import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: [ './users-form.component.css' ]
})
export class UsersFormComponent implements OnInit {

  @Input() user: any
  @Output() onSave: EventEmitter<any> = new EventEmitter()

  validateForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    this.validateForm = this.formBuilder.group({
      name: [this.user?.name],
      cpf: [this.user?.cpf],
      email: [this.user?.email],
      cellphone: [this.user?.cellphone],
    })
  }

  save() {
    this.onSave.emit(this.validateForm.value)
  }

  listUsers() {
    this.router.navigate([ '/users/users-list' ])
  }
}
