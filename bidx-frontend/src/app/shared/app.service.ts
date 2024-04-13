import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Registration successful', result);
      this.router.navigate(['/login']); 
    } catch (error) {
      console.error('Registration error', error);
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Login successful', result);
      this.router.navigate(['/dashboard']); 
    } catch (error) {
      console.error('Login error', error);
    }
  }
}