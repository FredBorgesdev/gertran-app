import { Component, OnInit } from '@angular/core';
import { BaseWorkdayFilter, MobilePictures, ReportsService } from '../reports.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile-picture',
  templateUrl: './mobile-picture.component.html',
  styleUrls: ['./mobile-picture.component.css']
})
export class MobilePictureComponent implements OnInit {
  isLoading = false;
  protocolImages: MobilePictures[] = [];
  validateForm: FormGroup;

  isImageModalVisible = false;
  selectedImageUrl: string = '';

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
    });
  }

  getMobilePicturestoReport(): void {
    if (this.validateForm.valid) {
      this.isLoading = true; // Mostrar loading
      this.reportsService.getMobilePictures(this.validateForm.value).subscribe(
        (data) => {
          this.protocolImages = data.results; // Armazenar dados recebidos
          this.isLoading = false; // Esconder loading
        },
        (error) => {
          console.error('Erro ao buscar dados:', error);
          this.isLoading = false; // Esconder loading em caso de erro
        }
      );
    }
  }

  openImageModal(pictureUrl: string): void {
    this.selectedImageUrl = 'https://gertran.nyc3.digitaloceanspaces.com'+pictureUrl;
    this.isImageModalVisible = true;
  }

  closeImageModal(): void {
    this.isImageModalVisible = false;
    this.selectedImageUrl = null;
  }

  openGoogleMaps(latitude: number, longitude: number): void {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  }

  valueChanges(params: BaseWorkdayFilter): void {
    this.validateForm.controls.customer.setValue(params.customer);
    this.validateForm.controls.driver.setValue(params.driver);
    this.validateForm.controls.from.setValue(params.from);
    this.validateForm.controls.to.setValue(params.to);
  }
}
