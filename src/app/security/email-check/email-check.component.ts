import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.css']
})
export class EmailCheckComponent implements OnInit {

  public message = "Checking Sign In Credentials";
  public url: any;

  constructor(private _router: Router, public authService: AuthService) { }

  ngOnInit(): void {

    this.url = this._router.url;
    console.log("url", this.url);
    this.checkLoginState();

  }

  private async checkLoginState() {
    const email = window.localStorage.getItem('emailForSignIn');
    console.log("email", email)
    window.localStorage.removeItem('emailForSignIn');

    this.beginLoginWithEmail(email);
  }



  private async beginLoginWithEmail(email: any) {
    let loginOK = await this.authService.confirmSignIn(email, this.url);
    const isLoginOK: boolean = (loginOK == 'true');
    
    console.log("isLoginOK", isLoginOK, "url", this.url);
    
    if (isLoginOK) {

      this.sendUserToPage(email);
    } else {
      this._router.navigate(['error']);
    }
  }

  private async sendUserToPage(email: any) {
    if (this.authService.firebaseUser) {
      console.log("sendUserToPage", "home");
      this._router.navigate(['home']);
    } else {
      this._router.navigate(['error']);
    }
  }


}
