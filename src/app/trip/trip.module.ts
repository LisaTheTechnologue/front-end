import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { TripIndexComponent } from './trip-index/trip-index.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { TripViewComponent } from './trip-view/trip-view.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TripImageComponent } from './trip-image/trip-image.component';
import { TripParticipantsComponent } from './trip-participants/trip-participants.component';


@NgModule({
  declarations: [
    TripCreateComponent,
    TripIndexComponent,
    TripViewComponent,
    TripEditComponent,
    TripImageComponent,
    TripParticipantsComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class TripModule { }
