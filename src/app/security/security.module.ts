import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { EmailCheckComponent } from './email-check/email-check.component';
import { CheckInboxComponent } from './check-inbox/check-inbox.component';


@NgModule({
  declarations: [
    SignInComponent,
    EmailCheckComponent,
    CheckInboxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
