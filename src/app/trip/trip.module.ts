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
import { ComponentsModule } from '../_shared/components/components.module';
import { PipesModule } from "../_shared/pipes/pipes.module";
import { MessageDialogComponent } from './trip-view/message-dialog/message-dialog.component';

@NgModule({
    declarations: [
        TripIndexComponent,
        TripViewComponent,
        MessageDialogComponent
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
        ComponentsModule,
        PipesModule
    ]
})
export class TripModule { }
