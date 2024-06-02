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
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormImgComponent } from './form-img/form-img.component';
import { FormImagesComponent } from './form-images/form-images.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ImageLightboxComponent } from './image-lightbox/image-lightbox.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ProfileCardComponent,
    FeedbackCardComponent,
    TripCardComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    TripDetailsComponent,
    FormImgComponent,
    FormImagesComponent,
    ImageSliderComponent,
    ImageLightboxComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbRatingModule,
    NgbCarousel,
    RouterModule,
    FontAwesomeModule,
    NgImageSliderModule,
    PipesModule
  ],
  exports: [
    ProfileCardComponent,
    FeedbackCardComponent,
    TripCardComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    TripDetailsComponent,
    FormImgComponent,
    FormImagesComponent,
    ImageSliderComponent,
    ImageLightboxComponent
  ]
})
export class ComponentsModule { }
