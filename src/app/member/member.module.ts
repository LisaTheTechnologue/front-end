import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { NgbDatepickerModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripPaymentComponent } from './trip-payment/trip-payment.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { ChatComponent } from './chat/chat.component';
import { ComponentsModule } from '../_shared/components/components.module';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { JoinRequestListComponent } from './join-request-list/join-request-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TripJoinedListComponent } from './trip-joined-list/trip-joined-list.component';
import { TripCreatedListComponent } from './trip-created-list/trip-created-list.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { TripViewComponent } from './trip-view/trip-view.component';

@NgModule({
  declarations: [
    MemberComponent,
    MemberProfileComponent,
    TripEditComponent,
    TripPaymentComponent,
    PaymentViewComponent,
    ChatComponent,
    FeedbackCreateComponent,
    JoinRequestListComponent,
    TripJoinedListComponent,
    TripCreatedListComponent,
    ProfileEditComponent,
    TripCreateComponent,
    TripViewComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbRatingModule,
    ComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MemberModule { }
