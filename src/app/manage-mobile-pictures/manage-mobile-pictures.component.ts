import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseWorkdayFilter, MobilePictures, ReportsService } from "../reports/reports.service";

@Component({
    selector: './manage-mobile-pictures.component.ts',
    templateUrl: './manage-mobile-pictures.component.html',
    styleUrls: ['./manage-mobile-pictures.component.css']
})
export class ManageMobilePicturesComponent implements OnInit {

    isLoading = false;
    protocolImages: MobilePictures[] = [];
    validateForm: FormGroup;
    modalForm: FormGroup;
    isModalVisible = false;
    isImageModalVisible = false;
    selectedProtocol: string = '';
    selectedImageUrl: string;
    selectedImageId: string;

    constructor(
        private formBuilder: FormBuilder,
        private reportsService: ReportsService
    ) {}

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            customer: [null, [Validators.required]],
            from: [[], [Validators.required]],
            to: [[], [Validators.required]],
            driver: [null, [Validators.required]],
            protocolType: ['new', [Validators.required]]
        });

        this.modalForm = this.formBuilder.group({
            close_reason: [null, [Validators.required]]
        });
    }

    getMobilePicturestoReport(): void {
        if (this.validateForm.valid) {
            this.isLoading = true;
    
            const filters = {
                ...this.validateForm.value,
            };
    
            this.reportsService.getMobilePictures(filters).subscribe(
                (data) => {
                    this.protocolImages = data.results;
                    this.isLoading = false;
                },
                (error) => {
                    console.error('Erro ao buscar dados:', error);
                    this.isLoading = false;
                }
            );
        }
    }
    

    valueChanges(params: BaseWorkdayFilter): void {
        this.validateForm.controls.customer.setValue(params.customer);
        this.validateForm.controls.driver.setValue(params.driver);
        this.validateForm.controls.from.setValue(params.from);
        this.validateForm.controls.to.setValue(params.to);
    }

    openImageModal(imageId: MobilePictures): void {
        this.selectedImageUrl = 'https://gertran.nyc3.digitaloceanspaces.com' + imageId.pictureUrl;
        this.selectedImageId = imageId.id;
        this.isImageModalVisible = true;
    }

    openModal(imageId: MobilePictures): void {
        this.selectedImageId = imageId.id;
        this.isModalVisible = true;
    }

    closeModal(): void {
        this.isModalVisible = false;
        this.modalForm.reset();
    }

    closeImageModal(): void {
        this.isImageModalVisible = false;
        this.modalForm.reset();
    }

    handleOk(): void {
        if (this.modalForm.valid) {
            const close_reason = this.modalForm.value.close_reason;
            this.reportsService.closeProtocol(this.selectedImageId, { close_reason }).subscribe(
                (response) => {
                    console.log('Protocolo fechado com sucesso:', response);
                    this.closeModal();
                    this.getMobilePicturestoReport();
                },
                (error) => {
                    console.error('Erro ao fechar protocolo:', error);
                }
            );
        }
    }
}
