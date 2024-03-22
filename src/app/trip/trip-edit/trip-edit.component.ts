import { Component } from '@angular/core';
import { Trip } from '../_models/trip';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../_shared/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent {
  id!:number;
  trip!: Trip;
  form!: FormGroup;
  // items: FormArray;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router  ) {  }

  ngOnInit(){
    this.form = this.fb.group({
      id: [''],
      title: [''],
      highlights: [''],
      status: [''],
      items: this.fb.array([]
        // [
        //   this.fb.group({
        //     id: [''],
        //     name: ['', [Validators.required]],
        //     description: ['', [Validators.required]],
        //   }),
        // ]
      ),
    });

    this.id = this.route.snapshot.params['tripId'];
    this.tripService.getById(this.id).subscribe(
      (data: Trip) => {
        // this.trip = data;
        this.getDetail(data);
    });

    console.log('Form Value', this.trip);
  }

  items(): FormArray{
    return this.form.get("items") as FormArray;
  }

  newItem(): FormGroup {
    return this.fb.group({
          id: [''],
          name: ['', [Validators.required]],
          description: ['', [Validators.required]]
        });
  }

  getDetail(trip: Trip) {
    // const itemsC = trip.items;
    var data = trip;
    this.clearFormArray();
    data.items.forEach(t=> {
      var item: FormGroup = this.newItem();
      this.items().push(item);
    })
    this.form.patchValue(data);
    // this.form.setControl('items', this.fb.array(this.trip.items || []));
  }
  clearFormArray(){
    this.items().clear();
  }
  onCancel() {
    this.router.navigateByUrl('trips/index');
  }
  // getFormArray() {
  //   return (<UntypedFormArray>this.form.get('items')).controls;
  // }
  getErrorMessage(fieldName: string): string {
    return '';
  }
  addItem(): void {
    this.items().push(this.newItem());
  }

  removeItem(index: number) {
    this.items().removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value as Trip);
    this.tripService.update(this.id,this.form.value as Trip).subscribe((res: any) => {
      console.log('Trip created successfully!');
      this.router.navigateByUrl('trips/index');
    });
  }

  onAddImages() {
    this.router.navigateByUrl('trips/' + this.id + '/edit/images');
  }

  onAddParticipants() {
    this.router.navigateByUrl('trips/' + this.id + '/edit/participants');
  }
}
