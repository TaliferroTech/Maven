import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/data-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  @Output() id = new EventEmitter();
  loading: any;
  private _dataSubscription?: Subscription;
  filteredData = '';

  constructor(public dataService: DataService) {
    this.dataService.getAll('project-doc-categories');
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
  }


  public onEdit(value: any): void {
    this.id.emit(value);
  }

  public onNew(): void {
    let data = {
      name: ''
    };
    this.id.emit(data)
  }

  public onDelete(item: any): void {
    this.dataService.delete('project-doc-categories',item._id);
    this.onNew();
  }
}
