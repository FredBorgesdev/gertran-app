import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-trucks-form',
  templateUrl: './trucks-form.component.html',
  styleUrls: [ './trucks-form.component.css' ]
})
export class TrucksFormComponent implements OnInit {

  @Input() truck: any;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  save() {
    // TODO: validate truck
    this.onSave.emit(this.truck);
  }

  listTrucks() {
    this.router.navigate([ '/trucks/trucks-list' ]);
  }

}
