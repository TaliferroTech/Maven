import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public isLoggedIn = false;
  public emailAddress = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.signInWithEmail(this.emailAddress);
  }

  onGmail(): void {
    this.authService.signInWithGoogle();
  }
}
