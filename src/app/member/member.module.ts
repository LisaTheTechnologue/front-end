import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { PostTripComponent } from './components/post-trip/post-trip.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { PostReportComponent } from './components/post-report/post-report.component';
import { JoinedTripsComponent } from './components/joined-trips/joined-trips.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { MemberReportComponent } from './components/member-report/member-report.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';

@NgModule({
  declarations: [
    MemberComponent,
    PostTripComponent,
    MyTripsComponent,
    TripDetailsComponent,
    JoinedTripsComponent,
    MemberProfileComponent,
    PostReportComponent,
    MemberReportComponent,
    TripEditComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule,
    // MatFormFieldModule,
    // MatInputModule,
    NgbDatepickerModule
  ]
})
export class MemberModule { }
