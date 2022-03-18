import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../Models/Country';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent {
  titleMaxLength = 110;
  createGoodForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.titleMaxLength),
    ]),
    country: new FormControl('', Validators.required),
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

  onSubmit() {
    console.log(this.createGoodForm.value);
  }
}
