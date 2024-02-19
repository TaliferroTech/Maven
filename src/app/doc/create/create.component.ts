import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/core/data-service.service';
import { DocuService } from 'src/app/core/docu.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Input() data: any;
  @Output() done = new EventEmitter();

  public transaction_complete: boolean = false;


  constructor(private _docuService: DocuService, public dataService: DataService) { 
    this.dataService.getAll('project-doc-categories');

  }

  ngOnInit(): void {
  }


  onSubmit(): void {
    if (this.data._id)
      this.onUpdate();
    else
      this.onAdd();
  }

  onUpdate(): void {
    try {
      this._docuService.update(this.data._id, this.data);
      this.complete();
    } catch (error) {
      console.error(error);
    }
  }

  onAdd(): void {
    try {
      this._docuService.add(this.data).then((result) => {
        this.data._id = result.id;
        this.complete();
      })
      this.complete();
    } catch (error) {
      console.error(error);
    }
  }

  complete(): void {
    this.transaction_complete = true;
    this.done.emit();
  }

  onCancel(): void {
    this.complete();
  }


}
