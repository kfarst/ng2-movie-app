import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MailingListComponent } from './index';

export interface User {
  name: string;
  address?: {
    address1?: string;
    postcode?: string;
  };
}

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [MailingListComponent],
  exports: [MailingListComponent]
})
export class MailingListModule {
  public user: User = {
    name: '',
    address: {
      address1: '',
      postcode: ''
    }
  };

  public save(form: User, isValid: boolean) {
    console.log(form, isValid);
  }
}
