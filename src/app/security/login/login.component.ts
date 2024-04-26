import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/core/environments/environment';

interface TokenResponse {
  access_token: string;
  // Otras propiedades del Json
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;
  showPassword: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(username: string, password: string): void {
    // Definir los datos que se enviarán al servidor

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('ticketero-app:12345'), // Reemplaza 'username:password' con tus credenciales
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    let body = new HttpParams();
    body = body.set('username', username); // Reemplaza 'your_username' con tu nombre de usuario
    body = body.set('password', password); // Reemplaza 'your_password' con tu contraseña
    body = body.set('grant_type', 'password');

    // Realizar la solicitud POST al servidor
    console.log('Body ********* ', username);
    this.http
      .post<TokenResponse>(environment.url_api_auth, body, { headers: headers })
      .subscribe(
        (response: TokenResponse) => {
          localStorage.setItem(environment.token_name, response.access_token);
          this.router.navigate(['/principal']);
          console.log('Respuesta del servidor:', response.access_token);
        },
        (error) => {
          this.loginForm.reset();
          console.error('Error al realizar la solicitud:', error);
        }
      );
  }

  onSubmit(): void {
    if (this.loginForm && this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');

      if (usernameControl && passwordControl) {
        const username = usernameControl.value || '';
        const password = passwordControl.value || '';
        this.loading = true;
        this.login(username, password);
      }
    }
  }

  getToken(): string {
    let token = sessionStorage.getItem(environment.token_name);
    let tk = token ? JSON.parse(token) : '';
    return tk.access_token;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('passwordField') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.showPassword ? 'text' : 'password';
    }
  }

  redirectToForm() {
    this.router.navigate(['/solicitud-de-salida']);
  }



}
