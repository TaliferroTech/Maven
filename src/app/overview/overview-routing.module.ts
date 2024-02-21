import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectPageComponent } from './project-page/project-page.component';

const routes: Routes = [
    { path: '', component: HomeComponent, data: { title: 'Natural Language Processor' } },
    { path: 'project-summary', component: ProjectPageComponent, data: { title: 'Project Summary' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
  })
  export class OverviewRoutingModule { }