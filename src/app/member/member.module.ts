import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { NgbDatepickerModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TripPaymentComponent } from './trip-payment/trip-payment.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { ChatComponent } from './chat/chat.component';
import { ComponentsModule } from '../_shared/components/components.module';
import { JoinRequestListComponent } from './join-request-list/join-request-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TripJoinedListComponent } from './trip-joined-list/trip-joined-list.component';
import { TripCreatedListComponent } from './trip-created-list/trip-created-list.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { TripViewComponent } from './trip-view/trip-view.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaymentHistoryListComponent } from './payment-history-list/payment-history-list.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { JoinRemoveComponent } from './join-remove/join-remove.component';

@NgModule({
  declarations: [
    MemberComponent,
    TripPaymentComponent,
    PaymentViewComponent,
    ChatComponent,
    FeedbackFormComponent,
    JoinRequestListComponent,
    TripJoinedListComponent,
    TripCreatedListComponent,
    ProfileEditComponent,
    TripViewComponent,
    TripFormComponent,
    PasswordEditComponent,
    PaymentHistoryListComponent,
    JoinRemoveComponent
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
    MatPaginatorModule,
    NgxPaginationModule,
  ]
})
export class MemberModule { }
