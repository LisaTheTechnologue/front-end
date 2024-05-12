import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { PostTripComponent } from './components/post-trip/post-trip.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { NgbDatepickerModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { JoinedTripsComponent } from './components/joined-trips/joined-trips.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { TripPaymentComponent } from './components/trip-payment/trip-payment.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentViewComponent } from './components/payment-view/payment-view.component';
import { ChatComponent } from './components/chat/chat.component';
import { ComponentsModule } from '../_shared/components/components.module';
import { TripViewComponent } from './components/trip-view/trip-view.component';
import { FeedbackCreateComponent } from './components/feedback-create/feedback-create.component';

@NgModule({
  declarations: [
    MemberComponent,
    PostTripComponent,
    MyTripsComponent,
    JoinedTripsComponent,
    MemberProfileComponent,
    TripEditComponent,
    TripPaymentComponent,
    PaymentListComponent,
    PaymentViewComponent,
    ChatComponent,
    TripViewComponent,
    FeedbackCreateComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbRatingModule,
    ComponentsModule
  ]
})
export class MemberModule { }
