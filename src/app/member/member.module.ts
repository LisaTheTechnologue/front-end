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
import { TripFormComponent } from './trip-form/trip-form.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaymentHistoryListComponent } from './payment-history-list/payment-history-list.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { JoinRemoveComponent } from './join-remove/join-remove.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RejectDialogComponent } from './reject-dialog/reject-dialog.component';
import { PipesModule } from '../_shared/pipes/pipes.module';
import { ReportListComponent } from './report-list/report-list.component';

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
    TripFormComponent,
    PasswordEditComponent,
    PaymentHistoryListComponent,
    JoinRemoveComponent,
    RejectDialogComponent,
    ReportListComponent
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
    MatDialogModule,
    PipesModule
  ]
})
export class MemberModule { }
