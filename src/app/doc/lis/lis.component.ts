import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DocuService } from 'src/app/core/docu.service';

@Component({
  selector: 'app-lis',
  templateUrl: './lis.component.html',
  styleUrls: ['./lis.component.css']
})
export class LisComponent implements OnInit {

  @Output() id = new EventEmitter();
  public data: any;
  public filteredData = '';

  constructor(public dataService: DocuService) { 
    // this.dataService.getAll();
  }

  ngOnInit(): void {
  }

  public onView(value: any): void {
    this.id.emit(value);
  }

}
