import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_shared/auth-guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
      { path: '', component: HomeComponent }, // Level 1 child
      { path: 'test', component: TestComponent }, // Level 1 child
      { path: 'about', component: AboutComponent },
      { path: "login", component: LoginComponent},
      { path: "signup", component: SignupComponent},
      { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'member', canActivate: [AuthGuard], loadChildren: () => import('./member/member.module').then(m => m.MemberModule) },
      { path: 'trips', loadChildren: () => import('./trip/trip.module').then(m => m.TripModule) },
      { path: 'profile/:userId', component: ProfileComponent },
      { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
