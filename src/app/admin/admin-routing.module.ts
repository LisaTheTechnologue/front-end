import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: DasboardComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
