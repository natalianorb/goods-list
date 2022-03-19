import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/Country';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('300ms', style({ opacity: 1, height: '20px' })),
      ]),
    ]),
    trigger('disappear', [
      transition(':leave', [
        animate('300ms', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class CreateItemComponent {
  titleMaxLength = 110;
  createGoodForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.titleMaxLength),
    ]),
    selectedCountry: new FormControl('', Validators.required),
    propTitle: new FormControl(''),
    propValue: new FormControl(''),
  });
  countries: Country[] = [];
  constructor(private countriesService: CountriesService) {
    this.countriesService.getAll$().subscribe((countriesList) => {
      this.countries = countriesList;
    });
  }

  get title() {
    return this.createGoodForm.get('title');
  }
  get country() {
    return this.createGoodForm.get('country');
  }
  get propTitle() {
    return this.createGoodForm.get('propTitle');
  }
  get propValue() {
    return this.createGoodForm.get('propValue');
  }
  changeCountry(e: any) {
    this.country?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  onSubmit() {
    console.log(this.createGoodForm.value);
  }
}
