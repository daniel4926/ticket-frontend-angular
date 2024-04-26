import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../security/authentication/auth.service';
import { ROUTES } from '../core/constants/routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;
  mostrarContenido: boolean = false;
  appName: string = 'ETICKET'; // Asigna el nombre de la aplicación aquí

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    // Lógica para mostrar contenido con retraso si es necesario
    // Simulación del retraso de 2 segundos
    setTimeout(() => {
      this.mostrarContenido = true;
    }, 2000);
  }

  navigateWithDelay(route: string): void {
    this.mostrarContenido = false;

    setTimeout(() => {
      this.router.navigate([route]);
      this.mostrarContenido = true;
    }, 2000);
  }


  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
