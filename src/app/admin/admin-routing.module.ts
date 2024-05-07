import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TripViewComponent } from './components/trip-view/trip-view.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'trip/:tripId', component: TripViewComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
