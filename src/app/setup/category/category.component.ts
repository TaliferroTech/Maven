import { Component, OnInit } from '@angular/core';
import { DataHandlerComponent } from 'src/app/shared/data-handler/data-handler.component';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/core/data-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends DataHandlerComponent implements OnInit {


  onNew(): void {
    this.data = {
      name: '',
      createdAt: '',
      lastUpdated: ''
    };
  }

  override onSubmit() : void {
    super.onSubmit('project-doc-categories');

  }

  onEdit(value: any) : void {
    this.data = value;
  }


}
