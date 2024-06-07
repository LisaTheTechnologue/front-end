import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/MaterialModule';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { NgbCarousel, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackCardComponent } from './feedback-card/feedback-card.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { RouterModule } from '@angular/router';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormImgComponent } from './form-img/form-img.component';
import { ImageLightboxComponent } from './image-lightbox/image-lightbox.component';
import { PipesModule } from '../pipes/pipes.module';
import { CommentComponent } from './comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberNavigationComponent } from './member-navigation/member-navigation.component';

@NgModule({
  declarations: [
    ProfileCardComponent,
    FeedbackCardComponent,
    TripCardComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    FormImgComponent,
    ImageLightboxComponent,
    CommentComponent,
    MemberNavigationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbRatingModule,
    NgbCarousel,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    ProfileCardComponent,
    FeedbackCardComponent,
    TripCardComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    FormImgComponent,
    ImageLightboxComponent,
    CommentComponent,
    MemberNavigationComponent
  ]
})
export class ComponentsModule { }
