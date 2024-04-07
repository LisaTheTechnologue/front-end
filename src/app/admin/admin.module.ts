import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { TripViewComponent } from './components/trip-view/trip-view.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { UserListComponent } from './components/user-list/user-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    DasboardComponent,
    TripViewComponent,
    TripListComponent,
    CityListComponent,
    AdminProfileComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }