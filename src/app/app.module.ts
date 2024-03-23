import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TripModule } from './trip/trip.module';
import { MaterialModule } from './MaterialModule';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { TripComponent } from './trip/trip.component';
import { YourTripsComponent } from './board-user/your-trips/your-trips.component';
import { TripHistoryComponent } from './board-user/trip-history/trip-history.component';
import { UserIndexComponent } from './board-admin/users/user-index/user-index.component';
import { UserCreateComponent } from './board-admin/users/user-create/user-create.component';
import { UserViewComponent } from './board-admin/users/user-view/user-view.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    BoardUserComponent,
    BoardAdminComponent,
    AuthComponent,
    LayoutComponent,
    TripComponent,
    YourTripsComponent,
    TripHistoryComponent,
    UserIndexComponent,
    UserCreateComponent,
    UserViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    TripModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
