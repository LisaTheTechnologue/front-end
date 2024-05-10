import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripIndexComponent } from './trip-index/trip-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { TripViewComponent } from './trip-view/trip-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalErrorHandlerService } from '../_shared/exceptions/global-error-handler.service';
import { ProfilePublicComponent } from './profile-public/profile-public.component';
import { ComponentsModule } from '../_shared/components/components.module';

@NgModule({
  declarations: [
    TripIndexComponent,
    TripViewComponent,
    ProfilePublicComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    NgxPaginationModule,
    NgbRatingModule,
    ComponentsModule
  ]
})
export class TripModule { }
