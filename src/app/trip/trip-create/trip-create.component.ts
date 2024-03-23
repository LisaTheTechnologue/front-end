import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  UntypedFormArray,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { TripService } from '../../_shared/services/trip.service';
import { Trip } from '../_models/trip';
import { TripItem } from '../_models/trip-item';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css']
})
export class TripCreateComponent {
// form!: FormGroup;
form = this.fb.group({
  title: [
    '',
    {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
      ],
      // asyncValidators: [courseTitleValidator(this.courses)],
      // updateOn: 'blur'
    },
  ],
  // releasedAt: [new Date(), Validators.required],
  status: ['', Validators.required],
  // downloadsAllowed: [false, Validators.requiredTrue],
  highlights: ['', [Validators.required, Validators.minLength(3)]],
  items: this.fb.array([]),
});

constructor(
  public tripService: TripService,
  private router: Router,
  private fb: FormBuilder
) {}

ngOnInit(): void {}

get items() {
  return this.form.controls['items'] as FormArray;
}

/**
 * Write code on Method
 *
 * @return response()
 */
onSubmit() {
  console.log(this.form.value as Trip);
  this.tripService.create(this.form.value as Trip).subscribe((res: any) => {
    console.log('Trip created successfully!');
    this.router.navigateByUrl('trips');
  });
}
onCancel() {
  this.router.navigateByUrl('trips');
}
getFormArray() {
  return (<UntypedFormArray>this.form.get('items')).controls;
}
getErrorMessage(fieldName: string): string {
  return '';
  // return this.formUtils.getFieldErrorMessage(this.form, fieldName);
}
addItem(): void {
  const items = this.form.get('items') as UntypedFormArray;
  // const itemForm = this.fb.control({
  //   name: ['', Validators.required],
  //   description: ['', Validators.required],
  // });

  this.items.push(this.createItem());
}
private createItem(item: TripItem = { id: 0, name: '', description: '' }) {
  return this.fb.group({
    id: [item.id],
    name: [item.name, [Validators.required]],
    description: [item.description, [Validators.required]],
  });
}

removeItem(index: number) {
  // const items = this.form.get('items') as UntypedFormArray;
  this.items.removeAt(index);
}
}
