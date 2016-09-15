import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewsletterComponent } from './index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [NewsletterComponent],
  exports: [NewsletterComponent]
})
export class NewsletterModule { }
