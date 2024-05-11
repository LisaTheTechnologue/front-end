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
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ProfileCardComponent,
    FeedbackCardComponent,
    TripCardComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    TripDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbRatingModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    ProfileCardComponent,
    FeedbackCardComponent,
    TripCardComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    TripDetailsComponent
  ]
})
export class ComponentsModule { }
