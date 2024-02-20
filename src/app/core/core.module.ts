import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocuService } from './docu.service';
import { DataService } from './data-service.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [DocuService, DataService, AuthService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core already loaded');
    }
  }
  static forRoot() {
    return {
      ngModule: CoreModule
    }
  }

}
