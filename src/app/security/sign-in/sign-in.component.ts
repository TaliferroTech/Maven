import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public isLoggedIn = false;
  public emailAddress = '';

  constructor(private _router:Router, public authService: AuthService) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.authService.signInWithEmail(this.emailAddress);
    this._router.navigate(['check-inbox']);

  }

  onGmail(): void {
    this.authService.signInWithGoogle();
  }

  onEnter(): void {
    this._router.navigate(['home']);
  }

  onProjectSummary(): void {
    this._router.navigate(['home', 'project-summary']);
  }
}
