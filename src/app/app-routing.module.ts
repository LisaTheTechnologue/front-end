import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfilePublicComponent } from './profile-public/profile-public.component';
import { AuthGuard } from './_shared/auth-guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
      { path: '', component: HomeComponent }, // Level 1 child
      { path: 'about', component: AboutComponent },
      { path: "login", component: LoginComponent},
      { path: "signup", component: SignupComponent},
      { path: "profile/:userId", component: ProfilePublicComponent},
      { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'member', canActivate: [AuthGuard], loadChildren: () => import('./member/member.module').then(m => m.MemberModule) },
      { path: 'trips', loadChildren: () => import('./trip/trip.module').then(m => m.TripModule) },
      { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
