import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetUpRoutingModule } from './setup-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryListComponent } from './category-list/category-list.component';



@NgModule({
  declarations: [
    CategoryComponent,
    CategoryCreateComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SetUpRoutingModule
  ]
})
export class SetupModule { }
