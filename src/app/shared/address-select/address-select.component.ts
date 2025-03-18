import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NominatimService} from '../nominatim.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-address-select',
  templateUrl: './address-select.component.html',
  styleUrls: ['./address-select.component.css']
})
export class AddressSelectComponent implements OnInit {
  @Input() formControlName: string;
  @Input() formGroup: FormGroup;
  @Input() showMap = true;
  @Output() handleAddressChange = new EventEmitter<any>();

  isLoading = false;
  options: any[] = [];
  searchAddressSubject = new Subject<string>();
  mapUrl: any = '';
  houseNumber = '';

  get showLabel(): boolean {
    return this.options.length === 0 &&
      this.formGroup.value[this.formControlName] &&
      typeof this.formGroup.value[this.formControlName] === 'string';
  }

  constructor(
    private nominatimService: NominatimService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.searchAddressSubject.pipe(debounceTime(2000)).subscribe((search) => {
      this.search(search);
    });
  }

  search(query: string): void {
    /*
      Nominatim doesn't get house numbers.
      If the query has a house number, we omit it, and search only for the street name.
      Then, when the user select, we concat the house number back to the address.
     */
    const queryParts = query.split(',');
    const isLatLon = queryParts.length === 2 && !isNaN(Number(queryParts[0])) && !isNaN(Number(queryParts[1]));
    if (!isLatLon && queryParts.length > 1 && !isNaN(Number(queryParts[1]))) {
      this.houseNumber = queryParts[1];
      query = queryParts[0];
    }

    if (!query) {
      this.options = [];
      return;
    }

    this.isLoading = true;
    this.nominatimService.query(query).subscribe(
      (data: any[]) => {
        this.options = data.map((item: any) => ({
          label: AddressSelectComponent.enhanceOutputAddress(item.displayName, this.houseNumber),
          value: item,
        }));
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  static enhanceOutputAddress(address: string, houseNumber?: string): string {
    // Nominatim format: Rua Paulo de Lima Naves, Serrano, Residencial Sarandi, Pampulha, Belo Horizonte, Região Geográfica Imediata de Belo Horizonte, Região Metropolitana de Belo Horizonte, Região Geográfica Intermediária de Belo Horizonte, Minas Gerais, Southeast Region, 31360-310, Brazil

    const addressParts = address.split(',');
    let result = addressParts
      .filter(part =>
        !part.toUpperCase().includes('MICRORREGIÃO') &&
        !part.toUpperCase().includes('REGIÃO'))
      .join(',');
    if (houseNumber) {
      const firstCommaIndex = result.indexOf(',');
      result = result.substring(0, firstCommaIndex + 1) + `${houseNumber}, ` + result.substring(firstCommaIndex + 1);
    }

    return result + '.';
  }

  openMap(item: any): void {
    this.handleAddressChange?.emit(item);

    if (this.showMap) {
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyAR18OijZ4fIbE01qRtOKyNzJyHZx9bqt8&q=${item.lat},${item.lon}`);
    }
  }
}
