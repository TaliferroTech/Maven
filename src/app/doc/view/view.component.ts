import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  @Input() data: any;
  @Input() isDiagnostic: boolean = false;
  @Output() editItem = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDocument(): void {
    this.editItem.emit('document');
  }

  onAttacthemnt(): void {
    this.editItem.emit('attachment');

  }


  setDiagnostic(): void {
    this.editItem.emit('diagnostic');
  }



}
