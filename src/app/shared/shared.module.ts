import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DashboardSearchBarComponent } from './dashboard-search-bar/dashboard-search-bar.component';
import { CatagorySelectionComponent } from './catagory-selection/catagory-selection.component';
import { RecommendedTopicsComponent } from './recommended-topics/recommended-topics.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DataHandlerComponent } from './data-handler/data-handler.component';
import { ImageUploadTaskComponent } from './image-upload-task/image-upload-task.component';



@NgModule({
  declarations: [
    DashboardSearchBarComponent,
    CatagorySelectionComponent,
    RecommendedTopicsComponent,
    HowItWorksComponent,
    FooterComponent,
    HeaderComponent,
    DataHandlerComponent,
    ImageUploadTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule

  ],
  exports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    DashboardSearchBarComponent,
    CatagorySelectionComponent,
    RecommendedTopicsComponent,
    HowItWorksComponent,
    FooterComponent,
    HeaderComponent,
    DataHandlerComponent,
    ImageUploadTaskComponent

  ]
})
export class SharedModule { }
