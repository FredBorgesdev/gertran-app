import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TrackerTechnologiesService, TrackerTechnologies } from '../tracker-technologies.service';

@Component({
  selector: 'app-tracker-technologies-list',
  templateUrl: './tracker-technologies-list.component.html',
  styleUrls: ['./tracker-technologies-list.component.css'],
})
export class TrackerTechnologiesListComponent implements OnInit {
  isLoading = false
  trackerTechnologiesList: TrackerTechnologies[] = []

  trackerTechnologiesColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ]

  constructor(
    private router: Router,
    private service: TrackerTechnologiesService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.service.getAll().subscribe((data) => {
      this.trackerTechnologiesList = data
      this.isLoading = false
    })
  }

  create(){
    this.router.navigate(['/tracker-technologies', 'tracker-technologies-create'])
  }

  edit(item: TrackerTechnologies){
    this.router.navigate(['/tracker-technologies', 'tracker-technologies-edit', item.id])
  }

  delete(item: TrackerTechnologies) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.handleDelete(item.id),
    })
  }

  handleDelete(id: string) {
    this.isLoading = true
    this.service.delete(id).subscribe(() => {
      this.trackerTechnologiesList = this.trackerTechnologiesList.filter(
        (item) => item.id !== id
      )
      this.message.success('Tecnologias excluído com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir Tecnologias')
      this.isLoading = false
    })
  }
}
