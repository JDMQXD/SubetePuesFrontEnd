import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ReservasComponent } from './reservas-component/reservas-component';
import { LoginComponent } from './login-component/login-component';
import { PropietarioComponent } from './propietario-component/propietario-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VehiculoComponent } from './vehiculo-component/vehiculo-component';
import { RouterLink } from '@angular/router';
import { DetalleVehiculoComponent } from './detalle-vehiculo-component/detalle-vehiculo-component';
import { AuthInterceptor } from './auth.interceptor';
import { AdministradorComponent } from './administrador-component/administrador-component';
import { NavbarComponent } from './navbar-component/navbar-component';



@NgModule({
  declarations: [
    App,
    ReservasComponent,
    LoginComponent,
    PropietarioComponent,
    VehiculoComponent,
    DetalleVehiculoComponent,
    AdministradorComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [App]
})
export class AppModule { }