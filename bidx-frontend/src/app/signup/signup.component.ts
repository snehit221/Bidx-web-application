// @author - KaushikChanabhaiDhola
// @author - Parth Gajera
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderBarComponent } from "../header-bar/header-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';
@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
    imports: [FormsModule, CommonModule, HeaderBarComponent, FooterComponent, AngularFireAuthModule],
    providers: [AuthService]
})
export class SignupComponent {
  successMessage = '';
  passwordMismatch = false;

  constructor(private auth : AuthService, private afAuth: AngularFireAuth) {}

  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      if (this.isPasswordMismatch(signupForm)) {
        this.passwordMismatch = true;
        this.successMessage = '';
        return;
      }
      const email = signupForm.value.email;
      const password = signupForm.value.password;
      const firstName= signupForm.value.firstName;
      const lastName= signupForm.value.lastName; 
      const role= signupForm.value.role;

      this.auth.register(email,password,firstName,lastName,role)
        .then(() => {
          this.successMessage = 'You have successfully registered!';
          this.passwordMismatch = false;
          signupForm.reset(); 
        })
        .catch(error => {
          console.error(error);
          this.successMessage = '';
        });
    } else {
      this.validateAllFormFields(signupForm);
      this.successMessage = '';
      this.passwordMismatch = false;
    }
  }

  isPasswordMismatch(form: NgForm): boolean {
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    return password !== confirmPassword;
  }

  validateAllFormFields(form: NgForm) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched();
    });
  }
  
}
