// @author - Parth Gajera
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderBarComponent } from "../header-bar/header-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { AppComponent } from "../app.component";
import { AuthService } from '../auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, CommonModule, HeaderBarComponent, FooterComponent, AppComponent,AngularFireAuthModule],
    providers: [AuthService]

})
export class LoginComponent {
  message = '';

  constructor(private authService: AuthService) {}
  
  async onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const email = loginForm.value.email;
      const password = loginForm.value.password;
      const role= loginForm.value.role;
      try {
        localStorage.setItem('role', role);
        await this.authService.login(email, password);
      } catch (error) {
        console.error(error);
        this.message = 'Incorrect email or password. Please try again.';
      }
    } else {
      this.message = 'Please fill in all required fields.';
      this.validateAllFormFields(loginForm);
    }
  }

  validateAllFormFields(form: NgForm) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched();
    });
  }

}
