import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { TripIndexComponent } from './trip/trip-index/trip-index.component';
import { TripComponent } from './trip/trip.component';
import { TripViewComponent } from './trip/trip-view/trip-view.component';
import { TripCreateComponent } from './trip/trip-create/trip-create.component';
import { TripEditComponent } from './trip/trip-edit/trip-edit.component';
import { TripImageComponent } from './trip/trip-image/trip-image.component';
import { TripParticipantsComponent } from './trip/trip-participants/trip-participants.component';
import { TripHistoryComponent } from './board-user/trip-history/trip-history.component';
import { YourTripsComponent } from './board-user/your-trips/your-trips.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: 'home', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'dashboard', component: BoardUserComponent },
  // { path: 'admin', component: BoardAdminComponent },
  // { path: 'auth', component: AuthComponent },

  // {
  //   path: '',
  //   component: LayoutComponent, // Use LayoutComponent as parent
  //   children: [
  //     { path: '', component: HomeComponent },
  //     { path: 'about', component: AboutComponent },
  //     { path: 'dashboard', component: BoardUserComponent },
  //     { path: 'admin', component: BoardAdminComponent },
  //     { path: 'auth', component: AuthComponent },
  //     { path: 'trips',
  //         // component:TripIndexComponent,
  //         loadChildren: () => import('./trip/trip-routing.module').then(m => m.TRIPS_ROUTES)  }],

  // }

  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard], // Optional guard
    children: [
      { path: '', component: HomeComponent }, // Level 1 child
      { path: 'about', component: AboutComponent },
      { path: 'dashboard',
        component: BoardUserComponent,
        children: [ // Level 2 child
          { path: 'history-trips', redirectTo: '', pathMatch: 'full'},
          { path: '', component: TripHistoryComponent },
          { path: 'created-list', component: YourTripsComponent },
        ]
      },
      { path: 'admin', component: BoardAdminComponent },
      { path: 'auth', component: LoginComponent },
      {
        path: 'trips',
        component: TripComponent,
        children: [ // Level 2 child
          { path: '', component: TripIndexComponent },
          { path: 'view/:tripId', component: TripViewComponent },
          { path: 'create', component: TripCreateComponent },
          { path: 'edit/:tripId', component: TripEditComponent },
          { path: 'edit/:tripId/images', component: TripImageComponent },
          { path: 'edit/:tripId/participants', component: TripParticipantsComponent },
        ]
      }
      // Add more child routes as needed
    ]
  }
  // Add more top-level routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
