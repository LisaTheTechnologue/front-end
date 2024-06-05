import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule, NgbModule, NgbRatingModule, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
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
import { TokenInterceptor } from './_shared/services/token.interceptor';
import { ComponentsModule } from './_shared/components/components.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { DatePipe } from '@angular/common';
import { GlobalErrorHandlerService } from './_shared/exceptions/global-error-handler.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LightboxModule } from 'ngx-lightbox';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatDialogRef } from '@angular/material/dialog';
import { PipesModule } from './_shared/pipes/pipes.module';
import { ChangeStatusDialogComponent } from './profile/change-status-dialog/change-status-dialog.component';
import { TopUserBoardComponent } from './top-user-board/top-user-board.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    AboutComponent,
    TripComponent,
    SignupComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProfileComponent,
    TestComponent,
    ForgotPasswordComponent,
    ChangeStatusDialogComponent,
      TopUserBoardComponent
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
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    LightboxModule,
    PipesModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    DatePipe,
    provideNgxMask(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
