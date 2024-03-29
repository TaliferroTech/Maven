import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewRoutingModule } from './overview-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ListComponent } from './data/list/list.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProjectPageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule

  ]
})
export class OverviewModule { }
