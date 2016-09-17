"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('./index');
var NewsletterComponent = (function () {
    function NewsletterComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    NewsletterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registerForm = this.formBuilder.group({
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
            lastName: ['', forms_1.Validators.required],
            emailAddress: ['', index_1.EmailValidator],
            address: this.formBuilder.group({
                street: ['', forms_1.Validators.required],
                zip: ['', forms_1.Validators.required],
                city: ['', forms_1.Validators.required]
            })
        });
        var formValues = sessionStorage.getItem('form');
        if (formValues) {
            this.applyFormValues(this.registerForm, JSON.parse(formValues));
        }
        this.
            registerForm.
            valueChanges.
            subscribe(function (form) {
            if (_this.registerForm.valid) {
                sessionStorage.setItem('form', JSON.stringify(form));
                console.log('Saved: ', form);
            }
        });
    };
    NewsletterComponent.prototype.destroyFormValues = function () {
        sessionStorage.removeItem('form');
        alert('Saved form data deleted');
    };
    NewsletterComponent.prototype.applyFormValues = function (group, formValues) {
        var _this = this;
        Object.keys(formValues).forEach(function (key) {
            var formControl = group.controls[key];
            if (formControl.hasOwnProperty('controls')) {
                _this.applyFormValues(formControl, formValues[key]);
            }
            else {
                formControl.setValue(formValues[key]);
            }
        });
    };
    NewsletterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'newsletter',
            templateUrl: 'newsletter.component.html',
            styleUrls: ['newsletter.component.css', '../shared/styles.css']
        })
    ], NewsletterComponent);
    return NewsletterComponent;
}());
exports.NewsletterComponent = NewsletterComponent;
