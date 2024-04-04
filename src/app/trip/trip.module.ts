import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripIndexComponent } from './trip-index/trip-index.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { TripViewComponent } from './trip-view/trip-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    TripIndexComponent,
    TripViewComponent,
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class TripModule { }
