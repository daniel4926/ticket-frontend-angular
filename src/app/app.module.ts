import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from './prime.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './security/login/login.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { PuntoAtencionComponent } from './modules/punto-atencion/punto-atencion.component';
import { PrincipalComponent } from './modules/principal/principal.component';
import { LoginModule } from './security/login/login.module';
import AgenciasComponent from './modules/agencias/agencias.component';
import { AgenciasModule } from './modules/agencias/agencias.module';
import { TableModule } from 'primeng/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SiderMenuComponent } from './core/layout/sider-menu/sider-menu.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuariosComponent,
    PuntoAtencionComponent,
    PrincipalComponent,
    SiderMenuComponent,
    MainLayoutComponent,

  ],
  imports: [
    AccordionModule,
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    HttpClientModule,
    LoginModule,
    BrowserAnimationsModule,
    FormsModule,
    PrimeModule,
    FooterComponent,
    TableModule,
    ToastModule,
    MatFormFieldModule,
    MatButtonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
