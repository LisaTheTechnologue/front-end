import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/MaterialModule';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackCardComponent } from './feedback-card/feedback-card.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { RouterModule } from '@angular/router';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    ProfileCardComponent,
    FeedbackCardComponent,
    TripCardComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbRatingModule,
    RouterModule
  ],
  exports: [
    ProfileCardComponent,
    FeedbackCardComponent,
    TripCardComponent
  ]
})
export class ComponentsModule { }
