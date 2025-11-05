import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing-module';
import { RouterModule } from '@angular/router';

// ✅ Componentes principales (no standalone)
import { AppComponent } from './app.component';
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

// ✅ Subcomponentes de reservas
import { ReservasListComponent } from './reservas-component/reservas-list/reservas-list.component';

@NgModule({
  declarations: [
    // 👇 Aquí van todos tus componentes, nada de imports standalone
    AppComponent,
    LoginComponent,
    PropietarioComponent,
    ReservasComponent,
    VehiculoComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminUsuariosComponent,
    AdminReservasComponent,
    AdminVehiculosComponent,
    ReservasListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
