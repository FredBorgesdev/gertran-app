import { Component } from '@angular/core';
import { GertranDirect, GertranDirectService } from '../gertran-direct.service';
import { BaseCrudListComponent } from 'src/app/base-crud/base-crud-list/base-crud-list.component';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'gertran-direct-approval',
    templateUrl: './gertran-direct-approval.component.html',
    styleUrls: ['gertran-direct-approval.component.css']
})

export class GertranDirectApprovalComponent extends BaseCrudListComponent<GertranDirect> {
    searchInput: string;

    personalMonitoringColumns = [
        { title: 'Nome' },
        { title: 'Empresa' },
        { title: 'Ações' },
    ];
    
    constructor(
        gertranDirectService: GertranDirectService,
        router: Router,
        modal: NzModalService,
        message: NzMessageService
    ) {
        super(
            'GertranApproval',
            router,
            gertranDirectService,
            message,
            modal
        );
    }

    search(): void {
        this.searchByField('search', this.searchInput);
    }

    edit(item: GertranDirect): void {
        this.router.navigate(['/gertran-direct/edit', item.id]);
    }

    viewDetails(item: GertranDirect): void {
        this.router.navigate(['/gertran-direct/details', item.id]);
    }

    goToCreate(): void {
        this.router.navigate(['/gertran-direct/create']);
    }
}