import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
  { path: 'home', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule) },
  { path: 'setup', loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule) },
  { path: 'document', loadChildren: () => import('./doc/doc.module').then(m => m.DocModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }