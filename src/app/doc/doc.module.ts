import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocRoutingModule } from './doc-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DocFilterPipe } from './doc-filter.pipe';
import { HomeComponent } from './home/home.component';
import { LisComponent } from './lis/lis.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { AttachmentsComponent } from './attachments/attachments.component';



@NgModule({
  declarations: [
    HomeComponent,
    LisComponent,
    CreateComponent,
    DocFilterPipe,
    ViewComponent,
    AttachmentsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DocRoutingModule
  ]
})
export class DocModule { }
