import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-dashboard-search-bar',
  templateUrl: './dashboard-search-bar.component.html',
  styleUrls: ['./dashboard-search-bar.component.css'],
})
export class DashboardSearchBarComponent implements OnInit, OnDestroy {
  searchValue: string = "";

  constructor(public database: DatabaseService, private _router: Router) {
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onSubmit(): void {
    this.database.sendNLP(this.searchValue);
    this._router.navigate(['home', 'list']);
    
  }
}

