import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripPaymentComponent } from './trip-payment/trip-payment.component';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { TripJoinedListComponent } from './trip-joined-list/trip-joined-list.component';
import { TripCreatedListComponent } from './trip-created-list/trip-created-list.component';

const routes: Routes = [
  { path: '', component: MemberComponent },
  { path: 'dashboard', component: MemberComponent },
{ path: 'created-trips', component: TripCreatedListComponent },
{ path: 'trips/edit/:tripId', component: TripEditComponent },
{ path: 'trips/create', component: TripCreateComponent },
{ path: 'joined-trips', component: TripJoinedListComponent },
{ path: 'payment/create/:tripId', component: TripPaymentComponent },
{ path: 'payment/view/:paymentId', component: PaymentViewComponent },
{ path: 'profile', component: MemberProfileComponent },
{ path: 'feedback/:tripId', component: FeedbackCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
