import { Component } from '@angular/core';

export interface User {
  name: string;
  address?: {
    address1?: string;
    postcode?: string;
  };
}

@Component({
  moduleId: module.id,
  selector: 'mailing-list',
  templateUrl: 'mailing-list.component.html',
  styleUrls: ['mailing-list.component.css', '../shared/styles.css']
})

export class MailingListComponent {
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
