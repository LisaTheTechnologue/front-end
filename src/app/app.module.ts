import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule, NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TripModule } from './trip/trip.module';
import { MaterialModule } from './MaterialModule';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TripComponent } from './trip/trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FilterPipe } from './_shared/pipes/filter.pipe';
import { TokenInterceptor } from './_shared/services/token.interceptor';
import { ComponentsModule } from './_shared/components/components.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TripComponent,
    SignupComponent,
    LoginComponent,
    PageNotFoundComponent,
    FilterPipe,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    TripModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    NgbDatepickerModule,
    FlexLayoutModule,
    NgxPaginationModule,
    ComponentsModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
