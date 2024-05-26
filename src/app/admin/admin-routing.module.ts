import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TripViewComponent } from './trip-view/trip-view.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/view/:tripId', component: TripViewComponent },
  { path: 'users', component: UserListComponent },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/:contactId', component: ContactViewComponent },
  { path: 'change-password', component: AdminProfileComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
