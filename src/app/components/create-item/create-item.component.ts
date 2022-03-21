import { Component, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/Country';
import { animate, style, transition, trigger } from '@angular/animations';
import { TableItemsService } from '../../services/goods-list.service';
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
  countries: Country[] = [];
  items = this.tableItemsService.lastItems;
  subscriptions: Subscription[] = [];
  createGoodForm = new FormGroup({
    vendorCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.idMaxLength),
      Validators.pattern(/^\d+$/),
      this.createVendorCodeValidator(),
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.titleMaxLength),
    ]),
    country: new FormControl('', Validators.required),
    propTitle: new FormControl('', Validators.maxLength(this.textMaxLength)),
    propValue: new FormControl('', Validators.maxLength(this.textMaxLength)),
  });
  constructor(
    private countriesService: CountriesService,
    public tableItemsService: TableItemsService
  ) {
    this.subscriptions.push(
      this.countriesService.getAll$().subscribe((countriesList) => {
        this.countries = countriesList;
      }),
      this.tableItemsService.editingItem$.subscribe((item) => {
        if (item) {
          const { vendorCode, title, country, propTitle, propValue } =
            item.good;
          this.createGoodForm.patchValue({
            vendorCode,
            title,
            country,
            propTitle,
            propValue,
          });
        } else {
          this.createGoodForm.reset();
        }
      })
    );
  }

  get vendorCode() {
    return this.createGoodForm.get('vendorCode');
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
  cancelEdit() {
    this.tableItemsService.cancelEdit();
  }
  onSubmit() {
    const good = this.createGoodForm.value;

    if (this.tableItemsService.isEditMode) {
      this.tableItemsService.updateExisting(good);
      return;
    }

    if (this.tableItemsService.trySaveNew(good)) {
      this.createGoodForm.reset();
    } else {
      // todo show notification
    }
  }
  createVendorCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let sameVendorCodeItem = this.items.find(
        (i) => control.value === i.good.vendorCode
      );

      if (
        sameVendorCodeItem &&
        this.tableItemsService.editingItemId !== sameVendorCodeItem.id
      ) {
        return {
          sameVendorCode: true,
        };
      }
      return null;
    };
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
