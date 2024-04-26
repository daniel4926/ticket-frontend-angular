import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/prime.module';
import { MegaMenuItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule, PrimeModule],
  standalone: true,
})
export class HeaderComponent {
  constructor(private router: Router) {}
  items: any;

    ngOnInit() {
        this.items = [
          {
            label: 'Gestion de Usuarios',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/usuarios'],
          },
          {
            label: 'Gestion de Tickets',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/'],
          },
        ];
    }

    redirectToLogin(): void {
      this.router.navigate(['/login']);
      localStorage.removeItem('token')

    }
}

