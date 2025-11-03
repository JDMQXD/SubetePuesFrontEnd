import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ReservasComponent } from './reservas-component/reservas-component';
import { LoginComponent } from './login-component/login-component';
import { PropietarioComponent } from './propietario-component/propietario-component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehiculoComponent } from './vehiculo-component/vehiculo-component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    App,
    ReservasComponent,
    LoginComponent,
    PropietarioComponent,
    VehiculoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterLink
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }