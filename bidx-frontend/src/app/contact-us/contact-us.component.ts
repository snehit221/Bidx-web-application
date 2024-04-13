// @author - Parth Gajera
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryBarComponent } from "../category-bar/category-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderBarComponent } from "../header-bar/header-bar.component";

@Component({
    selector: 'app-contact-us',
    standalone: true,
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css'],
    imports: [CategoryBarComponent, FooterComponent, HeaderBarComponent, ReactiveFormsModule,NgIf]
})
export class ContactUsComponent {
    contactForm = new FormGroup({
        fullName: new FormControl('', Validators.required),
        emailAddress: new FormControl('', [Validators.required, Validators.email]),
        subject: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required),
    });

    onSubmit() {
        if (this.contactForm.valid) {
            console.log('Form Submitted!', this.contactForm.value);
        } else {
            console.log('Form is not valid');
            this.markAllAsTouched(this.contactForm);
        }
    }
    markAllAsTouched(group: FormGroup) {
      Object.values(group.controls).forEach(control => {
          if (control instanceof FormControl) {
              control.markAsTouched();
          } else if (control instanceof FormGroup) {
              this.markAllAsTouched(control);
          }
      });
  }
}
