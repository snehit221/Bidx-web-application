import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../environment.stage';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api/register`;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {}

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log('Registration successful', result);

      const uid = result.user?.uid;
      if (uid) {
        const formData: FormData = new FormData();
        formData.append('userId', uid);
        formData.append('email', email);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('role', role);

        const response = await this.sendUserDetailsToBackend(
          formData
        ).toPromise();
        console.log('User details sent to backend', response);
      } else {
        console.error('Failed to get user UID after registration');
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  }

  private sendUserDetailsToBackend(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData);
  }

  async login(email: string, password: string) {
    try {
      const userToken = localStorage.getItem('userToken');

      if (!userToken) {
        const result = await this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
        console.log('Login successful', result);

        const newUserToken = await result.user?.getIdToken();
        if (newUserToken) {
          localStorage.setItem('userToken', newUserToken);
        }
      }
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Login error', error);
    }
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Logout error', error);
      });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('userToken');
    return !!token;
  }

  isSeller(): boolean {
    if (localStorage.getItem('role') === 'seller') {
      return true;
    }
    return false;
  }

  getUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          return user.uid;
        } else {
          return null;
        }
      })
    );
  }
}