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
  @Output() handleAddressChange = new EventEmitter<any>();

  options: any[] = [];
  searchAddressSubject = new Subject<string>();
  mapUrl: any = '';

  constructor(
    private nominatimService: NominatimService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.searchAddressSubject.pipe(debounceTime(500)).subscribe((search) => {
      this.search(search);
    });
  }

  search(query: string): void {
    if (!query) {
      this.options = [];
      return;
    }

    this.nominatimService.query(query).subscribe(
      (data: any[]) => {
        this.options = data.map((item: any) => ({
          label: AddressSelectComponent.enhanceOutputAddress(item.displayName),
          value: item,
        }));
      }
    );
  }

  static enhanceOutputAddress(address: string): string {
    const addressParts = address.split(',');
    const result = addressParts
      .filter(part =>
        !part.toUpperCase().includes('MICRORREGIÃO') &&
        !part.toUpperCase().includes('REGIÃO'))
      .join(',');

    return result + '.';
  }

  openMap(item: any): void {
    this.handleAddressChange.emit(item);
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyAR18OijZ4fIbE01qRtOKyNzJyHZx9bqt8&q=${item.lat},${item.lon}`);
  }
}
