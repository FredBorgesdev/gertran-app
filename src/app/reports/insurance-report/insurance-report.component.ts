import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { InsuranceCompanyReportFilter, InsuranceCompanyReportItem, ReportsService } from '../reports.service';
import { InsuranceCompaniesService, InsuranceCompany } from '../../insurance-companies/insurance-companies.service';
import { CustomersService, Customer } from '../../customers/customers.service';
import { SelectableCustomerServiceService } from '../../customers/selectable-customer-service.service';
import { XlsxExporterService } from '../../shared/services/xlsx-exporter.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
    selector: 'app-insurance-report',
    templateUrl: './insurance-report.component.html',
    styleUrls: ['./insurance-report.component.css'],
    providers: [SelectableCustomerServiceService],
})
export class InsuranceReportComponent implements OnInit {
    isLoading = false;
    validateForm!: FormGroup;

    data: InsuranceCompanyReportItem[] = [];
    filteredData: InsuranceCompanyReportItem[] = [];
    searchValue = '';

    insuranceCompanies: InsuranceCompany[] = [];
    brokers: InsuranceCompany[] = [];

    dateRange: Date[] = [];
    logoBase64 = '';

    appliedFiltersText = '';
    today = new Date();

    constructor(
        private formBuilder: FormBuilder,
        private reportsService: ReportsService,
        private insuranceCompanyService: InsuranceCompaniesService,
        private i18n: NzI18nService,
        private message: NzMessageService,
        public selectableCustomerService: SelectableCustomerServiceService,
        private xlsxExporterService: XlsxExporterService,
        private authService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            insuranceCompany: [null],
            broker: [null],
            customer: [null],
        });

        this.i18n.setLocale(en_US);

        this.insuranceCompanyService.getAll({ limit: 999 }).subscribe((response) => {
            const all = response.results;
            this.insuranceCompanies = all.filter((ic) => !ic.isBroker);
            this.brokers = all.filter((ic) => ic.isBroker);
        });

        if (this.authService.user.isGertranStaff) {
            this.selectableCustomerService.init();
        }
        if (this.authService.user.customer) {
            this.selectableCustomerService.concatCustomers(this.authService.user.customer);
        }

        this.preloadLogo();
    }

    private preloadLogo(): void {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                this.logoBase64 = canvas.toDataURL('image/png');
            }
        };
        img.src = 'assets/images/logo/logogertran.png';
    }

    onDateRangeChange(result: Date[]): void {
        this.dateRange = result;
    }

    generateReport(): void {
        this.isLoading = true;
        const formValue = this.validateForm.value;

        const filters: InsuranceCompanyReportFilter = {};
        if (formValue.insuranceCompany) {
            filters.insuranceCompany = formValue.insuranceCompany;
        }
        if (formValue.broker) {
            filters.broker = formValue.broker;
        }
        if (formValue.customer) {
            filters.customer = formValue.customer;
        }
        if (this.dateRange && this.dateRange.length === 2) {
            filters.startDate = format(this.dateRange[0], 'yyyy-MM-dd');
            filters.endDate = format(this.dateRange[1], 'yyyy-MM-dd');
        }

        this.buildAppliedFiltersText(formValue);

        this.reportsService.getInsuranceCompanyReport(filters).subscribe(
            (response) => {
                this.data = response;
                this.filteredData = [...response];
                this.searchValue = '';
                this.isLoading = false;
            },
            () => {
                this.isLoading = false;
                this.message.error('Erro ao gerar relatório');
            }
        );
    }

    onSearch(value: string): void {
        this.searchValue = value;
        if (!value) {
            this.filteredData = [...this.data];
            return;
        }
        const term = value.toLowerCase();
        this.filteredData = this.data.filter(
            (item) =>
                (item.tradingName || '').toLowerCase().includes(term) ||
                (item.cnpj || '').toLowerCase().includes(term) ||
                (item.corporateName || '').toLowerCase().includes(term) ||
                (item.insuranceCompanyName || '').toLowerCase().includes(term) ||
                (item.brokerName || '').toLowerCase().includes(term) ||
                (item.validityStart || '').toLowerCase().includes(term) ||
                (item.lastUpdate || '').toLowerCase().includes(term) ||
                (item.contactInfo || '').toLowerCase().includes(term)
        );
    }

    formatCnpj(cnpj: string): string {
        if (!cnpj) {
            return '-';
        }
        const digits = cnpj.replace(/\D/g, '');
        if (digits.length !== 14) {
            return cnpj;
        }
        return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
    }

    safeValue(value: string | null | undefined): string {
        return value || '-';
    }

    private buildAppliedFiltersText(formValue: Record<string, string | null>): void {
        const parts: string[] = [];

        if (formValue.insuranceCompany) {
            const ic = this.insuranceCompanies.find((i) => i.id === formValue.insuranceCompany);
            if (ic) {
                parts.push(`Seguradora: ${ic.name}`);
            }
        }
        if (formValue.broker) {
            const br = this.brokers.find((b) => b.id === formValue.broker);
            if (br) {
                parts.push(`Corretora: ${br.name}`);
            }
        }
        if (formValue.customer) {
            const cust = this.selectableCustomerService.customers.find(
                (c) => c.id === formValue.customer
            );
            if (cust) {
                parts.push(`Cliente: ${cust.tradingName}`);
            }
        }
        if (this.dateRange && this.dateRange.length === 2) {
            parts.push(
                `Vigência: ${format(this.dateRange[0], 'dd/MM/yyyy')} - ${format(this.dateRange[1], 'dd/MM/yyyy')}`
            );
        }

        this.appliedFiltersText = parts.length > 0 ? parts.join(' | ') : 'Nenhum filtro aplicado';
    }

    get xlsxValues(): Record<string, string>[] {
        return this.filteredData.map((item) => ({
            Transportador: item.tradingName || '-',
            CNPJ: (item.cnpj || '').replace(/\D/g, ''),
            'Razao Social': item.corporateName || '-',
            Seguradora: item.insuranceCompanyName || '-',
            Corretora: item.brokerName || '-',
            'Inicio Vigencia': item.validityStart || '-',
            'Atualizado Em': item.lastUpdate || '-',
            Contato: item.contactInfo || '-',
        }));
    }

    generateExcel(): void {
        if (!this.filteredData || this.filteredData.length === 0) {
            this.message.error('Não há dados para exportar');
            return;
        }
        this.xlsxExporterService.generate('relatorio_seguradoras', this.xlsxValues);
    }

    generatePdf(): void {
        if (!this.filteredData || this.filteredData.length === 0) {
            this.message.error('Não há dados para exportar');
            return;
        }

        const doc = new jsPDF('l', 'pt', 'a4');
        const titleText = 'RELATORIO DE SEGURADORAS';

        const body = this.filteredData.map((item) => [
            this.safeValue(item.tradingName),
            this.formatCnpj(item.cnpj),
            this.safeValue(item.corporateName),
            this.safeValue(item.insuranceCompanyName),
            this.safeValue(item.brokerName),
            this.safeValue(item.validityStart),
            this.safeValue(item.lastUpdate),
            this.safeValue(item.contactInfo),
        ]);

        autoTable(doc, {
            head: [['Transportador', 'CNPJ', 'Razao Social', 'Seguradora', 'Corretora', 'Inicio Vigencia', 'Atualizado Em', 'Contato']],
            body,
            didDrawPage: (data) => {
                doc.setFontSize(20);
                doc.setFont('helvetica', 'bold');
                doc.text(titleText, data.settings.margin.left, data.settings.margin.top - 60);

                if (this.logoBase64) {
                    doc.addImage(this.logoBase64, 'PNG', 650, 10, 100, 100);
                }

                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.text(
                    `Filtros aplicados: ${this.appliedFiltersText}`,
                    data.settings.margin.left,
                    data.settings.margin.top - 30
                );

                doc.setFontSize(8);
                doc.text(
                    `Gerado em: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`,
                    data.settings.margin.left,
                    doc.internal.pageSize.height - 30
                );

                doc.text(
                    `Usuario: ${(this.authService.user.name || '').toUpperCase()}`,
                    doc.internal.pageSize.width - 200,
                    doc.internal.pageSize.height - 30
                );
            },
            margin: { top: 140 },
            styles: {
                fontSize: 8,
                cellPadding: 4,
            },
            headStyles: {
                fillColor: [24, 144, 255],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 9,
            },
            columnStyles: {
                0: { cellWidth: 105 },
                1: { cellWidth: 95 },
                2: { cellWidth: 105 },
                3: { cellWidth: 90 },
                4: { cellWidth: 90 },
                5: { cellWidth: 75 },
                6: { cellWidth: 70 },
                7: { cellWidth: 110 },
            },
        });

        doc.save('relatorio_seguradoras.pdf');
    }
}
