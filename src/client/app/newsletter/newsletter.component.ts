import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailValidator } from './index';

@Component({
  moduleId: module.id,
  selector: 'newsletter',
  templateUrl: 'newsletter.component.html',
  styleUrls: ['newsletter.component.css', '../shared/styles.css']
})

export class NewsletterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(8)]],
      lastName: ['', Validators.required],
      emailAddress: ['', EmailValidator],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        zip: ['', Validators.required],
        city: ['', Validators.required]
      })
    });
    var formValues = sessionStorage.getItem('form');

    if (formValues) {
      this.applyFormValues(this.registerForm, JSON.parse(formValues));
    }

    this.
      registerForm.
      valueChanges.
      subscribe(form => {
        if (this.registerForm.valid) {
          sessionStorage.setItem('form', JSON.stringify(form));
          console.log('Saved: ', form);
        }
      });
  }

  destroyFormValues () {
    sessionStorage.removeItem('form');
    alert('Saved form data deleted');
  }

  private applyFormValues (group, formValues) {
    Object.keys(formValues).forEach(key => {
      let formControl = <FormControl>group.controls[key];

      if (formControl.hasOwnProperty('controls')) {
        this.applyFormValues(formControl, formValues[key]);
      } else {
        formControl.setValue(formValues[key]);
      }
    });
  }
}
