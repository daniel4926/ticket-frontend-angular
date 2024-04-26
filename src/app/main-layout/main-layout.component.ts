import { Component } from '@angular/core';
import { MenuItem } from '../../app/core/layout/sider-menu/sider-menu.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  menuItems: MenuItem[];

  constructor() {
    this.menuItems = [
      { label: 'Principal', icon: 'home', routerLink: '/principal' },
      { label: 'Agencias', icon: 'home_work', routerLink: '/agencias' },
      { label: 'Usuarios', icon: 'people', routerLink: '/usuarios' }
    ];
  }

}
