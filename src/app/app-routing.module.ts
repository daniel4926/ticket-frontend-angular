import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './security/login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component'; // Importa el nuevo componente
import AgenciasComponent from './modules/agencias/agencias.component';
import { PrincipalComponent } from './modules/principal/principal.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'principal',
    component: MainLayoutComponent, // Usa MainLayoutComponent para la página de inicio de sesión
    children: [
      { path: '', component: PrincipalComponent }
    ]
  },
  {
    path: 'agencias',
    component: MainLayoutComponent, // Usa MainLayoutComponent para la página de inicio de sesión
    children: [
      { path: '', component: AgenciasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
