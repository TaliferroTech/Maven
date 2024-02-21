import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
  { path: 'home', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule), canLoad: [AuthGuard] },
  { path: 'setup', loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule), canLoad: [AuthGuard] },
  { path: 'document', loadChildren: () => import('./doc/doc.module').then(m => m.DocModule), canLoad: [AuthGuard] },
  { path: 'error', component: NotFoundComponent, data: { title: 'Error' } },
  { path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }