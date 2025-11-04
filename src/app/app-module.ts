import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing-module';
import { RouterModule } from '@angular/router';

// ✅ Componente raíz
import { AppComponent } from './app.component';

// ✅ Componentes principales
import { LoginComponent } from './login-component/login.component';
import { PropietarioComponent } from './propietario-component/propietario.component';
import { ReservasComponent } from './reservas-component/reservas.component';
import { VehiculoComponent } from './vehiculo-component/vehiculo.component';
import { AdminComponent } from './admin-component/admin.component';

// ✅ Subcomponentes del administrador
import { AdminDashboardComponent } from './admin-component/admin-dashboard/admin-dashboard.component';
import { AdminUsuariosComponent } from './admin-component/admin-usuarios/admin-usuarios.component';
import { AdminReservasComponent } from './admin-component/admin-reservas/admin-reservas.component';
import { AdminVehiculosComponent } from './admin-component/admin-vehiculos/admin-vehiculos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PropietarioComponent,
    ReservasComponent,
    VehiculoComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminUsuariosComponent,
    AdminReservasComponent,
    AdminVehiculosComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
