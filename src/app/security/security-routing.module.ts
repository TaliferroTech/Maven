import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { CheckInboxComponent } from './check-inbox/check-inbox.component';
import { EmailCheckComponent } from './email-check/email-check.component';

const routes: Routes = [
    { path: '', component: SignInComponent, data: { title: 'Sign In' } },
    { path: 'check-inbox', component: CheckInboxComponent, data: { title: 'Check Inbox' } },
    { path: 'email-check', component: EmailCheckComponent, data: { title: 'Validating Sign In' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
  })
  export class SecurityRoutingModule { }