import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { PostTripComponent } from './components/post-trip/post-trip.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JoinedTripsComponent } from './components/joined-trips/joined-trips.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { TripPaymentComponent } from './components/trip-payment/trip-payment.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentViewComponent } from './components/payment-view/payment-view.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    MemberComponent,
    PostTripComponent,
    MyTripsComponent,
    TripDetailsComponent,
    JoinedTripsComponent,
    MemberProfileComponent,
    TripEditComponent,
    TripPaymentComponent,
    PaymentListComponent,
    PaymentViewComponent,
    TripCardComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ]
})
export class MemberModule { }
