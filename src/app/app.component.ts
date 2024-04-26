import { Component } from '@angular/core';
import { MenuItem } from '../app/core/layout/sider-menu/sider-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketero-frontend';
  menuItems: MenuItem[];

  constructor() {
    this.menuItems = [

    ];
  }
}
