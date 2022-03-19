import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/Country';
import { animate, style, transition, trigger } from '@angular/animations';
import { GoodsListService } from '../../services/goods-list.service';
import { Subscription } from 'rxjs';

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
export class CreateItemComponent implements OnDestroy {
  idMaxLength = 20;
  titleMaxLength = 110;
  textMaxLength = 110;
  createGoodForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.idMaxLength),
      Validators.pattern(/^\d+$/),
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.titleMaxLength),
    ]),
    country: new FormControl('', Validators.required),
    propTitle: new FormControl('', Validators.maxLength(this.textMaxLength)),
    propValue: new FormControl('', Validators.maxLength(this.textMaxLength)),
  });
  countries: Country[] = [];
  subscriptions: Subscription[] = [];
  constructor(
    private countriesService: CountriesService,
    private goodsListService: GoodsListService
  ) {
    this.subscriptions.push(
      this.countriesService.getAll$().subscribe((countriesList) => {
        this.countries = countriesList;
      })
    );
  }

  get id() {
    return this.createGoodForm.get('id');
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
    this.goodsListService.addGood(this.createGoodForm.value);
    this.createGoodForm.reset();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
