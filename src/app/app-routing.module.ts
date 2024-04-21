import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfilePublicComponent } from './profile-public/profile-public.component';

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

  // {
    // path: '',
    // component: LayoutComponent,
    // canActivate: [AuthGuard], // Optional guard
    // children: [
      { path: '', component: HomeComponent }, // Level 1 child
      { path: 'about', component: AboutComponent },
      { path: "login", component: LoginComponent},
      { path: "signup", component: SignupComponent},
      { path: "profile/:userId", component: ProfilePublicComponent},
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'member', loadChildren: () => import('./member/member.module').then(m => m.MemberModule) },
      { path: 'trips', loadChildren: () => import('./trip/trip.module').then(m => m.TripModule) }
      // { path: 'dashboard',
      //   component: BoardUserComponent,
      //   children: [ // Level 2 child
      //     { path: 'history-trips', redirectTo: '', pathMatch: 'full'},
      //     { path: '', component: TripHistoryComponent },
      //     { path: 'created-list', component: YourTripsComponent },
      //   ]
      // },
      // // { path: 'admin', component: BoardAdminComponent },
      // { path: 'auth', component: LoginComponent },
      // { path: 'profile', component: ProfileComponent },
      // { path: 'register', component: RegisterComponent },
      // {
      //   path: 'trips',
      //   component: TripComponent,
      //   children: [ // Level 2 child
      //     { path: '', component: TripIndexComponent },
      //     { path: 'view/:tripId', component: TripViewComponent },
      //     { path: 'create', component: TripCreateComponent },
      //     { path: 'edit/:tripId', component: TripEditComponent },
      //     { path: 'edit/:tripId/images', component: TripImageComponent },
      //     { path: 'edit/:tripId/participants', component: TripParticipantsComponent },
      //   ]
      // }
      // Add more child routes as needed
    // ]
  // },
  // Add more top-level routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
