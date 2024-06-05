import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { TripPaymentComponent } from './trip-payment/trip-payment.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { TripJoinedListComponent } from './trip-joined-list/trip-joined-list.component';
import { TripCreatedListComponent } from './trip-created-list/trip-created-list.component';
import { ChatComponent } from './chat/chat.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { JoinRequestListComponent } from './join-request-list/join-request-list.component';
import { PaymentHistoryListComponent } from './payment-history-list/payment-history-list.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { JoinRemoveComponent } from './join-remove/join-remove.component';
import { ReportListComponent } from './report-list/report-list.component';


const routes: Routes = [
  { path: '', component: TripJoinedListComponent },
  // { path: 'dashboard', component: MemberComponent },
{ path: 'created-trips', component: TripCreatedListComponent },
{ path: 'trips/edit/:tripId', component: TripFormComponent },
{ path: 'trips/create', component: TripFormComponent },
{ path: 'joined-trips', component: TripJoinedListComponent },
{ path: 'reported-trips', component: ReportListComponent },
{ path: 'joined-requests', component: JoinRequestListComponent },
{ path: 'joiner/remove/:tripId', component: JoinRemoveComponent },
{ path: 'payment/list', component: PaymentHistoryListComponent },
{ path: 'payment/create/:tripId', component: TripPaymentComponent },
{ path: 'payment/view/:paymentId', component: PaymentViewComponent },
{ path: 'profile', component: ProfileEditComponent },
{ path: 'password-edit', component: PasswordEditComponent },
{ path: 'feedback/:tripId', component: FeedbackFormComponent },
{ path: 'chat/:tripId', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
