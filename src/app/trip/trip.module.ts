import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { TripIndexComponent } from './trip-index/trip-index.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { TripViewComponent } from './trip-view/trip-view.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TripImageComponent } from './trip-image/trip-image.component';


@NgModule({
  declarations: [
    TripCreateComponent,
    TripIndexComponent,
    TripViewComponent,
    TripEditComponent,
    TripImageComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class TripModule { }
