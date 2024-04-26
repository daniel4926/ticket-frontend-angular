import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sider-menu',
  templateUrl: './sider-menu.component.html',
  styleUrls: ['./sider-menu.component.scss']
})
export class SiderMenuComponent {
  @Input() menuItems: MenuItem[] | undefined;

  constructor() { }
}

export interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
}
