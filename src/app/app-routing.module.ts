import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { GestDashboardComponent } from './gest-dashboard/gest-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShowInventoryComponent } from './show-inventory/show-inventory.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'GestionnaireDashboard', component: GestDashboardComponent},
  {path: 'AdminDashboard', component: AdminDashboardComponent},
  {path: 'ShowInventory', component: ShowInventoryComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
