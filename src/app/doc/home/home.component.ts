import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/core/data-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public data: any;
  public isEditMode: boolean = false;

  public isDiagnostic: boolean = false;
  public isDocument: boolean = false;
  public isAttachment: boolean = false;
  // public categories: any;


  constructor(private _location: Location, private _dataService: DataService) {
  }

  ngOnInit(): void {
    // this._dataService.items?.subscribe((categories) => {
    //   if (!environment.production)
    //     console.log("CATEGORIES", categories);
    //   this.categories = categories;
    // })
  }

  back(): void {
    this._location.back();
  }

  list(): void {
    this.isEditMode = false;
  }

  onView(data: any) {
    this.isEditMode = true;

    this.data = data;

    this.scrollTop();
  }

  onNew(): void {
    this.isEditMode = true;

    this.data = <any>{
      title: '',
      category: '',
      text: ''
    };
    this.onEdit('document');

  }

  private scrollTop(): void {
    // For Safari
    document.body.scrollTop = 0;

    // For Chrome, Firefox, IE aan Opera
    document.documentElement.scrollTop = 0;

  }

  onEdit(event: any): void {

    this.scrollTop();

    switch (event) {
      case 'document':
        this.editReset();
        this.onDocument();
        break;
      case 'attachment':
        this.editReset();
        this.onAttachment();
        break;
      case 'diagnostic':
        this.setDiagnostic();
        break;


      default:
        break;

    }

  }

  editReset(): void {
    this.isDocument = false;
    this.isAttachment = false;
    this.isDiagnostic = false;

  }

  setDiagnostic(): void {
    this.isDiagnostic = !this.isDiagnostic;
  }

  onAttachment(): void {
    this.isAttachment = true;
  }

  onDocument(): void {
    this.isDocument = true;
  }



}
