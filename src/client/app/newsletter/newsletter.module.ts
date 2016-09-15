import { NgModule,forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewsletterComponent } from './index';
import { NG_VALIDATORS, ReactiveFormsModule } from '@angular/forms';
import { EmailValidator } from './index';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [NewsletterComponent, EmailValidator],
  exports: [NewsletterComponent]
})
export class NewsletterModule { }
